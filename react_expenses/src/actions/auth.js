import { firebase, googleAuthProvider, facebookAuthProvider } from '../firebase/firebase'

// Login and logout to add user uid to the redux store
export const login = (uid) => ({
    type: 'LOGIN',
    uid
})

export const logout = () => ({
    type: 'LOGOUT'
})


// Login wiht Google account
export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    }
}

// Login with Facebook account
export const startLoginFacebook = () => {
    return () => {
        facebookAuthProvider.addScope('user_birthday')
        return firebase.auth().signInWithPopup(facebookAuthProvider)
    }
}

// User Register with email and password
export const startRegister = (email, password) => {
    return () => {
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
            })
    }
}

// User Login with email and password
export const startUserLogin = (email, password) => {
    return () => {
        console.log(email)
        return firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
                } else {
                alert(errorMessage);
                }
                console.log(error);
          })
    }
}

// User log out
export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    }
}