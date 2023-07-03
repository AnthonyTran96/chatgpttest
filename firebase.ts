// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDQEVxLJD3Ug8HYB_zWtY482VFoqVK5Tkg',
    authDomain: 'chatgpt-advanced-7ea97.firebaseapp.com',
    projectId: 'chatgpt-advanced-7ea97',
    storageBucket: 'chatgpt-advanced-7ea97.appspot.com',
    messagingSenderId: '993148772111',
    appId: '1:993148772111:web:ee7e858064a9357c57e87a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
