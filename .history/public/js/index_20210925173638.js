$(document).ready(function() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('logged in')
            const displayName = user.displayName;
            const photoURL = user.photoURL;
            
            const imgSrc = document.getElementById("profile-picture")

        } else {
            console.log('not signed in')
        }
    })
});

