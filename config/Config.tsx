import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth,} from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage} from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDI64USsa-mSgKXO9y4fC7oyr7qxXxvH64",
    authDomain: "app-login-8eeeb.firebaseapp.com",
    databaseURL: "https://app-login-8eeeb-default-rtdb.firebaseio.com",
    projectId: "app-login-8eeeb",
    storageBucket: "app-login-8eeeb.appspot.com",
    messagingSenderId: "694646123526",
    appId: "1:694646123526:web:a7d8f50b718d4573ab6787"
  };




// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
//export const auth = getAuth(app);
export const storage = getStorage(app);


export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});