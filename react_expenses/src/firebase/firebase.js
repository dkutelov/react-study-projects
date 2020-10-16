import * as firebase from 'firebase'

// Initialize Firebase
const config = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}

firebase.initializeApp(config)

const database = firebase.database()

// Social login
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
	firebase,
	googleAuthProvider,
	facebookAuthProvider,
	database as default
}

// database.ref('expenses')
//      .on('child_changed', (snapshot) => {
//          console.log(snapshot.key, snapshot.val());
//      });
// database.ref('expenses')
//     .on('value', (snapshot) => {
//         const expenses = [];
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//     });
//     console.log(expenses);
// });

// set expenses - description, note, amount, created at
// push 3 expenses

// const expense = {
//         description: 'Expense Six',
//         note: 'Note 6',
//         amount: 350,
//         createdAt: 3500
//     }

// const expenseiId = database.ref('expenses').push(expense);

// const productId = `expenses/${expenseiId.key}`;
// console.log(productId);

// database.ref(productId).once('value').then((product) => console.log(product.val()));

// database.ref().set({
//     name: 'Dariy Kutelov',
//     age: 48,
//     stressLevel: 6,
//     job: {
//         title: 'Master of disaster',
//         company: 'Sleeping Beauty'
//     },
//     location: {
//         city: 'Sofia',
//         country: 'Bulgaria'
//     },
//     books: ['Book1','Book2']
// }).then(() => {
//     console.log('Data saved!!!');
// }, (error) => {
//     console.log('Error:', error);
// });

// const onValueEdit = database.ref()
//     .on('value', (data)=> {
//         const person = data.val();
//         console.log(`${person.name} is a ${person.job.title} at ${person.job.company}!`);
//     },
//         (error) => {
//         console.log('Error:', error);
//     });

// database.ref().update({
//     name: 'Darij',
//     job: {
//         title: 'Tzar',
//         company: 'Persia'
//     }
// }).then(() => console.log('Update completed!!!'), (error) => { console.log('Error!!!')});

// const onValueChange = database.ref()
//     .on('value', (snapshot) => {
//         const data = snapshot.val();
//         console.log(data);
//      },
//      (error) => {
//         console.log('Error:', error);
//     });

// setTimeout(() => {
//     database.ref('age').set(49);
// }, 3000);

// setTimeout(() => {
//     database.ref().off('value', onValueChange);
// }, 5000);
// //

// setTimeout(() => {
//     database.ref('age').set(46);
// }, 7000);

// database.ref('attributes/height').set(1.74);
// database.ref('attributes/wigth').set(72);
// database.ref('skills').set({
//     frontend:'JS, React',
//     backend:'NodeJS, Express'
// }).then(() => {
//     console.log('Attributes added. Great!');
// }, (error) => {
//     console.log('Error by adding attributes:', error);
// });

// database.ref('products').set([
//     {productId:'dejdlejdw', productName:'NodeJS'},
//     {productId:'kiuklejdw', productName:'Express'}
// ]);

// database.ref('isSingle').remove().then(function() {
//   console.log("Remove succeeded.")
// })
// .catch(function(error) {
//   console.log("Remove failed: " + error.message)
// });

// database.ref('age').push(49).then((data) => {console.log(data.key)});

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Ameizan dot kom',
//     'location/city': 'Ribaritsa'
// }).then(() => console.log('Update completed!!!'), (error) => { console.log('Error!!!')});
