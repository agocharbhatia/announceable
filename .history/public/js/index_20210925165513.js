$(document).ready(function() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('logged in')
        } else {
            console.log('not signed in')
        }
    })
});

