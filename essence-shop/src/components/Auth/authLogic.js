import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, doc, collection, setDoc } from 'firebase/firestore';
import { userCollectionRef } from '../../lib/firestore.collections';
import { auth, db, } from '../../lib/init-firebase';

export const login = async ({
    loginEmail, loginPassword
}) => {
    try {
        const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(user);
    } catch (error) {
        const err = error.message.split('Firebase: Error ')[1];
        return err.slice(1, err.length - 2);
    }
};
export const register = async ({
    registerEmail,
    registerPassword,
    name
}) => {
    let user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    const userImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3UNzW-04v3tAQAc7FXLjc4xtNfKSXi3A0DQ&usqp=CAU';
    const coverPic = 'https://cdn-images-1.medium.com/max/800/0*qZS6sL0kKw5DVXPn.jpg';
    try {
        const docRef = doc(db, 'users', user.user.uid)
        console.log(user.uid);
        await setDoc(docRef, {
            name: name,
            email: registerEmail,
            userImg: userImg,
            cover: coverPic,
            completedOrders: {
                count: 0,
                orderData: {}
            }
        })
    } catch (error) {
        const err = error.message.split('Firebase: Error ')[1];
        return err.slice(1, err.length - 2);
    }
}
export const logout = async () => {
    await signOut(auth);

}