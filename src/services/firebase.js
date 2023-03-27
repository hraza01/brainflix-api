import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyA0H7-SckOzemcEkbTfPrPiMIbLIm8wPMQ',
    authDomain: 'dice-game-c5749.firebaseapp.com',
    projectId: 'dice-game-c5749',
    storageBucket: 'dice-game-c5749.appspot.com',
    messagingSenderId: '808026599024',
    appId: '1:808026599024:web:b7611bec5319a13bab0eb5',
    measurementId: 'G-786KL73HSV',
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { storage }
