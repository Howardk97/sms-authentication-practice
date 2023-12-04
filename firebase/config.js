// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnIUE2qV485ZaGyR-E9NffnwgQUY2Gff4",
  authDomain: "fir-sms-auth-db8fc.firebaseapp.com",
  projectId: "fir-sms-auth-db8fc",
  storageBucket: "fir-sms-auth-db8fc.appspot.com",
  messagingSenderId: "620067751245",
  appId: "1:620067751245:web:530c89659d14931b0e2304"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
auth.tenantId = "myTenantId1";