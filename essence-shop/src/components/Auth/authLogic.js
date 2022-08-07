import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../lib/init-firebase';

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
    registerPassword
}) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        console.log(user);
    } catch (error) {
        const err = error.message.split('Firebase: Error ')[1];
        return err.slice(1, err.length - 2);
    }

};
export const logout = async () => {
    await signOut(auth);
}