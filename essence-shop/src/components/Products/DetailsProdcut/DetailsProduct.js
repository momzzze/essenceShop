import React from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const DetailsProduct = ({ products }) => {
  const { productId } = useParams();
  const [error, setError] = useState("");

  const product = products.find(x => x.id == productId);

  const clicked = () => {
    console.log(product);
  }


  return (
    <>
      {error}
      <button onClick={clicked}>Props</button>
    </>
  )
}

export default DetailsProduct