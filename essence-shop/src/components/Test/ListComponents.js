import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/init-firebase';


const ListComponents = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getMovies();
    }, []);

    useEffect(() => {
        console.log(products);
    }, [products]);



    const getMovies = () => {
        const productCollectionRef = collection(db, 'products');
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

    return (
        <div>
            <h4>List Components</h4>
            <ul>

            </ul>
        </div>
    )
}

export default ListComponents