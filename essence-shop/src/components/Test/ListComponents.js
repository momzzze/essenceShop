import { getDocs, doc, deleteDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { productCollectionRef } from '../../lib/firestore.collections';
import { db } from '../../lib/init-firebase';


const ListComponents = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log(products);
        getProducts();
    }, []);

    useEffect(() => {
    }, [products]);



    const getProducts = () => {
        getDocs(productCollectionRef)
            .then(res => {
                console.log(res.docs);
                const products = res.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id
                }));
                setProducts(products)
            }).catch(error => console.log(error.message));

    }

    const deleteProduct = (id) => {
        const docRef = doc(db, 'products', id);
        deleteDoc(docRef).then(() => console.log('Product deleted')).catch(error => console.log(error.message))
    }


    return (
        <div>
            <h4>List Components</h4>

            <button onClick={() => getProducts()}> Refresh </button>
            <ul>
                {products.map(p => (
                    <li key={p.id}>
                        {p.id} {p.data.name}
                        <button onClick={() => deleteProduct(p.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListComponents