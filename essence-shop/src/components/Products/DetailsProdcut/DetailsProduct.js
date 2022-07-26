import React from 'react'
import { useParams } from 'react-router-dom';


const DetailsProduct = ({ products }) => {
  const { productId } = useParams()
  const product = products.find(x => x.id == productId);

  const clicked = () => {
    console.log(product);
  }

  
  return (
    <>
      <button onClick={clicked}>Props</button>
    </>
  )
}

export default DetailsProduct