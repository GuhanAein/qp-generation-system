import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "xxxxxxxx",
  authDomain: "xxxxxxxx",
  projectId: "qp-generation-authentication",
  storageBucket: "xxxxxx.firebasestorage.app",
  messagingSenderId: "699xxxxxxx",
  appId: "1:699xxxx:web:447b6xxxx",
  measurementId: "G-TX5xxxxx"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
