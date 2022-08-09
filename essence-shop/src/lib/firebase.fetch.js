import { addDoc, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { productCollectionRef } from "./firestore.collections";
import { db, fbApp } from "./init-firebase";



export const getProducts = async () => {
    const data = await getDocs(productCollectionRef);
    return data;
}

export const getProductById = async (productId) => {
    let result;
    const docRef = doc(db, 'products', productId);
    await getDoc(docRef).then((doc) => {
        result = {
            data: doc.data(),
            id: doc.id
        }
    })
    return result
}


export const deleteProduct = async (id) => {
    const docRef = doc(db, 'products', id);
    deleteDoc(docRef).then(() => console.log('Product deleted')).catch(error => console.log(error.message))
}

export const createProduct = async (data) => {
    try {
        await addDoc(productCollectionRef, data).then(res => { console.log(res) })
    } catch (error) {
        const err = error.message.split('Firebase: Error ')[1];
        return err.slice(1, err.length - 2);

    }
}

export const editProduct = async (id, data) => {
    try {
        const prodDoc = doc(db, 'products', id);
        await updateDoc(prodDoc, data)

    } catch (error) {
        const err = error.message.split('Firebase: Error ')[1];
        return err.slice(1, err.length - 2);
    }
}



