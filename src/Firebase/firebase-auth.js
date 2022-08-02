import {app} from './firebase-connection.js';
import {getAuth} from 'firebase/auth';

export const auth = getAuth(app);