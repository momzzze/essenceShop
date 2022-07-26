import { deleteDoc, doc, getDocs } from "firebase/firestore";
import { productCollectionRef } from "./firestore.collections";
import { db } from "./init-firebase";



export const getProducts = async () => {
    return await getDocs(productCollectionRef);        
}

export const deleteProduct =async (id) => {
        const docRef = doc(db, 'products', id);
        deleteDoc(docRef).then(() => console.log('Product deleted')).catch(error => console.log(error.message))
    
}
