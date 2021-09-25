$(document).ready(function() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('logged in')
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;

            console.log(displayName)
            console.log(email)
            console.log(photoURL)
            console.log(emailVerified)
        } else {
            console.log('not signed in')
        }
    })
});

