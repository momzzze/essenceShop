import { addDoc, collection, deleteDoc, deleteField, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { cartCollectionRef, productCollectionRef } from "./firestore.collections";
import { db, fbApp } from "./init-firebase";

//--------------------Products ----------------------
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
// ---------------------Users---------------------------
export const getUser = async (id) => {
    let result;
    const docRef = doc(db, 'users', id);
    await getDoc(docRef).then((doc) => {
        result = {
            data: doc.data(),
            id: doc.id
        }
    })
    return result
}
export const editUser = async (id, data) => {
    const userDoc = doc(db, 'users', id);
    await updateDoc(userDoc, data)
}
export const deleteUserCart = async (id) => {
    const userDoc = doc(db, `users/${id}`);
    await updateDoc(userDoc, {
        "cart": deleteField()
    });
}
//-------------------------Cart--------------------------
//function to create or set/modify existing cart
export const createCart = async (uid, data) => {
    const snapshot = collection(db, `cart ${uid}`);
    try {
        await addDoc(snapshot, data, { merge: true });
        console.log('Cart was updated');
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}
export const editCart = async (uid, docId, data, add, remove) => {
    const snapshot = doc(db, `cart ${uid}/${docId}`);
    await setDoc(snapshot, data, { merge: true });
    console.log('Document get updated');
}
export const getCartByUserId = async (uid) => {
    let result = [];
    const cart = collection(db, `cart ${uid}`);
    const snapshot = await getDocs(cart).then((doc) => {
        doc.forEach((el) => (
            result.push({ ...el.data(), productId: el.id })
        ))
    })
    return result;
}
export const deleteCart = async (id) => {
    const docRef = doc(db, 'cart', id);
    deleteDoc(docRef).then(() => console.log('Cart deleted')).catch(error => console.log(error.message))
}
