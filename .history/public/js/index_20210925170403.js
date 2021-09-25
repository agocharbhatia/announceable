$(document).ready(function() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('logged in')
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;
        } else {
            console.log('not signed in')
        }
    })
});

