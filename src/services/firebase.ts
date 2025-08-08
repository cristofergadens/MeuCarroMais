import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';

export const firebase = {
  auth,
  firestore,
  messaging,
};

export const initializeFirebase = () => {
  try {
    const app = getApp();
    console.log('Firebase já inicializado:', app.name);
  } catch (error) {
    console.log('Firebase será inicializado automaticamente');
  }
}; 