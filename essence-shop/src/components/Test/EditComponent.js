import React, { useState } from 'react'
import { productCollectionRef } from '../../lib/firestore.collections';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/init-firebase';


const EditComponent = () => {


    const [name, setName] = useState('');
    const [productId, setProductId] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '' || productId == '') {
            return
        }
        const docRef = doc(db, 'products', productId);
        updateDoc(docRef, { name }).then(res => {
            console.log(res);
        }).catch(error => console.log(error.message));
        // setDoc(docRef, { age: 26 })
        // .then(res => {
        //     console.log(res);
        // }).catch(error => console.log(error.message));
    }


    return (
        <div>
            <h4>Edit Product </h4>

            <form onSubmit={handleSubmit}>

                <label htmlFor="id">Product ID</label>
                <input id='id' type="text" value={productId} onChange={e => setProductId(e.target.value)} />


                <label htmlFor="name">Product Name</label>
                <input id='name' type="text" value={name} onChange={e => setName(e.target.value)} />

                <button type='submit'>Update Product</button>
            </form>
        </div>
    )
}

export default EditComponent