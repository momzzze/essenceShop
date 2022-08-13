import { collection } from 'firebase/firestore';
import { db } from './init-firebase';

export const productCollectionRef = collection(db, 'products');
export const userCollectionRef = collection(db, 'users');
export const cartCollectionRef = collection(db, 'cart');