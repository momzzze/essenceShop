import React, { useState, useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { productCollectionRef } from '../../lib/firestore.collections';

const Realtime = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const unSubscribe = onSnapshot(productCollectionRef, snapshot => {
            setProducts(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
        })

        return () => {
            
            unSubscribe();
        }
    }, [])


    return (
        <div>
            <h4>Real time products.</h4>

            <ul>
                {products.map(p => (
                    <li key={p.id}>
                        {p.id} {p.data.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}



export default Realtime;