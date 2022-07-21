import React, { useState } from 'react'
import { addDoc } from 'firebase/firestore';
import { productCollectionRef } from '../../lib/firestore.collections';

const AddComponent = () => {

    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '') {
            return
        }
        addDoc(productCollectionRef, {
            name
        }).then(res => { console.log(res) }).catch(error => { console.log(error.message) });

    }


    return (
        <div>
            <h4>Add Product </h4>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Product Name</label>
                <input id='name' type="text" value={name} onChange={e => setName(e.target.value)} />

                <button type='submit'>Add Product</button>
            </form>
        </div>
    )
}

export default AddComponent