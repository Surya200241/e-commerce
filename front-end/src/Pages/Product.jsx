import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  // Ensure 'product' is found before attempting to access its properties
  const product = all_product.find((e) => e.id === Number(productId));

  // Handle case where product is not found (e.g., loading state or invalid ID)
  if (!product) {
    return <div>Loading product... or Product not found!</div>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      {/*
        Pass the category and id of the current product to RelatedProducts.
        Assuming your 'product' object has a 'category' property.
      */}
      <RelatedProducts
        currentProductCategory={product.category}
        currentProductId={product.id}
      />
    </div>
  );
};

export default Product;