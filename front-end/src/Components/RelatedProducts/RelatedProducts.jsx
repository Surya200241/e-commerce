import React from 'react';
import './RelatedProduct.css';
import data_product from '../Assets/all_product'; // Assuming this is your full product JSON
import Items from '../Item/Item';

const RelatedProducts = ({ currentProductCategory, currentProductId }) => {
  // Filter products to show only those from the same category, excluding the current product itself
  const relatedProducts = data_product.filter(
    (item) => item.category === currentProductCategory && item.id !== currentProductId
  );

  // Optional: Limit the number of related products shown (e.g., to 4)
  const displayedRelatedProducts = relatedProducts.slice(0, 4);

  return (
    <div className='relatedProducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {displayedRelatedProducts.map((item, i) => {
          return (
            <Items
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;