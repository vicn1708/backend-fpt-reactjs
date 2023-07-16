import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import appSetting from './appSetting';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: appSetting.firebase.apiKey,
  authDomain: appSetting.firebase.authDomain,
  projectId: appSetting.firebase.projectId,
  storageBucket: appSetting.firebase.storageBucket,
  messagingSenderId: appSetting.firebase.messagingSenderId,
  appId: appSetting.firebase.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
