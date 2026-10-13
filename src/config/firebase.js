// Firebase web config public identifier (secret noy). Asol security = Firestore Rules (README dekho).
// Ager project-i default; notun project hole .env e NEXT_PUBLIC_FIREBASE_* dao.
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDipDTV4voncwdQZkbJxuoui5NZdpYH0oQ",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "react-portfolio-app-16c1b.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "react-portfolio-app-16c1b",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "react-portfolio-app-16c1b.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "981574076948",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:981574076948:web:2773ca953f82d21bc0b501",
};
