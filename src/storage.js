import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyC1Vv23-L6aq7WkU1j82LrfWFqmf4A6cXc",
  authDomain: "sprout-sociaz.firebaseapp.com",
  projectId: "sprout-sociaz",
  storageBucket: "sprout-sociaz.appspot.com",
  messagingSenderId: "301313905020",
  appId: "1:301313905020:web:ca6c1559588fc0fbfad4f9",
  measurementId: "G-GWE787ES9G"
});
const storage = getStorage(app);
export default storage