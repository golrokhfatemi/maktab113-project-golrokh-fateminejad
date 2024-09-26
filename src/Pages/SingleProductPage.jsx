import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import httpRequest from '../Services/Http-request';

export default function SingleProductPage() {
  const { id } = useParams();  
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log('Product ID:', id); 
    
    httpRequest.get(`/api/products/${id}`)
    
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
      });
  }, [id]);
  
console.log(product);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='border border-teal-800 p-3 m-5'>
      <h1>{product.data.product.name}</h1>
      <img src={`http://localhost:8000/images/products/${product.data.product.images}`} alt={product.data.product.name} />
      {product.data.product.description}
      <p>Price: ${product.data.product.price}</p>
      <p>{product.data.product.brand}</p>
      {/* سایر مشخصات محصول */}
    </div>
  );
}

