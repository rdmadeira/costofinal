import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import { initializeApp } from 'firebase/app';

import { firebaseConfig } from './firebaseConfig.js';
const firebaseApp = initializeApp(firebaseConfig);

const storages1 = getStorage(firebaseApp, 'gs://costofinal-b391b.appspot.com');

export const getImageStorage = async (path) => {
  const url = await getDownloadURL(ref(storages1, 'assets/' + path));
  return url;
};
