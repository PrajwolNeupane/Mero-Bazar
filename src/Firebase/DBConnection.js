import { getFirestore } from "firebase/firestore";
import {app} from './firebase-connection';

export const db =   getFirestore(app);