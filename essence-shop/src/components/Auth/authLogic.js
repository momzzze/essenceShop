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
    
    try {
        const docRef = doc(db, 'users', user.user.uid)
        console.log(user.uid);
        await setDoc(docRef, {
            name: name,
            email: registerEmail
        })
    } catch (error) {
        const err = error.message.split('Firebase: Error ')[1];
        return err.slice(1, err.length - 2);
    }
}





// userCollectionRef.doc(user.uid).set({
//     name: name,
//     email: registerEmail,
// })
// }).catch((error) => {
//     return error.message
// })



// };
export const logout = async () => {
    await signOut(auth);
}