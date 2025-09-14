import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "webdevcourseproject-532b3.firebaseapp.com",
  projectId: "webdevcourseproject-532b3",
  storageBucket: "webdevcourseproject-532b3.firebasestorage.app",
  messagingSenderId: "973152016822",
  appId: "1:973152016822:web:36d18ced55d26cd3d58917",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
