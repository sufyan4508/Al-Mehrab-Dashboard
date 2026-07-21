import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyJRGde-C-8A52-xOVrUDY9egG2hLSoiM", // ⚠️ Agar settings wali key alag hai to dhyan se yahan replace karein
  authDomain: "://firebaseapp.com",
  projectId: "al-mehrab-dashboard",
  storageBucket: "al-mehrab-dashboard.firebasestorage.app",
  messagingSenderId: "125363315335",
  appId: "1:125363315335:web:cb9470126fb4dd9dcbce22"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
