import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCNjt8J8N16FAkaG4YrDeQRtwbV2B6beqg',
  authDomain: 'todos-7cf7b.firebaseapp.com',
  projectId: 'todos-7cf7b',
  storageBucket: 'todos-7cf7b.appspot.com',
  messagingSenderId: '306585213328',
  appId: '1:306585213328:web:06804b47e2d59f3deffb15',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
// const admin = require('firebase-admin');
