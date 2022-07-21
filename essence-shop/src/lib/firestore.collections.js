import {collection} from 'firebase/firestore';
import { db } from './init-firebase';

export const productCollectionRef=collection(db,'products');