import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB2BGZfJKaVFJ2mBnn5AjawURYebgBbOmU",
  authDomain: "qp-generation-authentication.firebaseapp.com",
  projectId: "qp-generation-authentication",
  storageBucket: "qp-generation-authentication.firebasestorage.app",
  messagingSenderId: "699397300784",
  appId: "1:699397300784:web:447b68e0d38408f04983f5",
  measurementId: "G-TX599HG5J1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
