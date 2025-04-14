// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQl363jCqlxozZXmm68Kj72X7MFEgcO_o",
  authDomain: "krushnampriya-9dc3d.firebaseapp.com",
  projectId: "krushnampriya-9dc3d",
  storageBucket: "krushnampriya-9dc3d.firebasestorage.app",
  messagingSenderId: "947151703239",
  appId: "1:947151703239:web:f0a1555e8d6fe8474a82e2",
  measurementId: "G-YHFWN2HN75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 

// Export what you need
export { app, auth, analytics };
