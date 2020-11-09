import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const config = {
	apiKey            : 'AIzaSyBytofpRUkdWtfvi1RaYURwfGyeNYA1kNQ',
	authDomain        : 'mancity-78335.firebaseapp.com',
	databaseURL       : 'https://mancity-78335.firebaseio.com',
	projectId         : 'mancity-78335',
	storageBucket     : 'mancity-78335.appspot.com',
	messagingSenderId : '620436554382'
}

firebase.initializeApp(config)

const database = firebase.database()
const databaseMatches = database.ref('matches')
const databasePromotions = database.ref('promotions')
const databaseTeams = database.ref('teams')
export { firebase, database, databaseMatches, databasePromotions, databaseTeams }
