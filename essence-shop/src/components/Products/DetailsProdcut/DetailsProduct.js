import React from 'react'

const DetailsProduct = ({props}) => {
  const clicked=()=>{
      console.log(props);
  }
  return (
    <>
      <button onClick={clicked}>Props</button>
    </>
  )
}

export default DetailsProduct