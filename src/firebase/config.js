import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBDp_qcqfiRsRqBCERwYDMvZF7Pv5kUIk0",
  authDomain: "real-time-chatroom-151ee.firebaseapp.com",
  projectId: "real-time-chatroom-151ee",
  storageBucket: "real-time-chatroom-151ee.appspot.com",
  messagingSenderId: "1081468461145",
  appId: "1:1081468461145:web:b72dae798ae4412de5d148"
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }