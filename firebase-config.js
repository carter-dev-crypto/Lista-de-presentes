import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import{getFirestore} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCImHVXbvpXrQoZhlnmlwQBD-AejWbM34I",
  authDomain: "lista-de-presentes-4da1c.firebaseapp.com",
  projectId: "lista-de-presentes-4da1c",
  storageBucket: "lista-de-presentes-4da1c.firebasestorage.app",
  messagingSenderId: "1063285870574",
  appId: "1:1063285870574:web:229c79d905e9aa654788ff"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
