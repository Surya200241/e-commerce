const express = require('express');
const nodemon = require('nodemon');
const User = require('./db/User');
const Product = require('./db/Product.js');
require('./db/config');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const jwtKey = 'e-comm';
const app = express();
app.use(cors())
app.use(express.json());

app.post("/register",async (req, resp) => {
  let data = new User(req.body);
  let result = await data.save();
  result = result.toObject();
  delete result.password;
   jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (error, token) => {
        if (error) {
          resp.send({ result: "something went wrong !" })
        }
        resp.send({ result, auth: token });
      })
});

app.post("/login",async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (error, token) => {
        if (error) {
          resp.send({ result: "something went wrong !" })
        }
        resp.send({ user, auth: token });
      })

    } else {
      resp.send({ result: "user not found !" });
    }

  } else {
    resp.send({ result: "user not found !" })
  }
});




app.post("/add-product",verifyToken, async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products",verifyToken, async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);

  } else {
    resp.send({ result: "No product found" })
  }
})

app.delete("/product/:id",verifyToken, async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/product/:id",verifyToken, async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) resp.send(result);
  else resp.send({ result: "Record not found" })
})
app.put("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body
    }
  )
  resp.send(result);
}
);

// search API

app.get("/search/:key", verifyToken,async (req, resp) => {
  let result = await Product.find({
    "$or": [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { price: { $regex: req.params.key } }
    ]
  });
  resp.send(result);
})

function verifyToken(req,resp,next){
  let token=req.headers['authorization'];
  if(token){
      token=token.split(' ')[1];
      jwt.verify(token,jwtKey,(err,valid)=>{
        if(err)resp.status(401).send({result:"Please provide a valid token !"})
          else{
           next();
          }
      })
  }else{
    resp.status(403).send({result:"Please provide a token with headers !"})
  }
}

app.listen(5005);