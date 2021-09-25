$(document).ready(function() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('logged in')
            const displayName = user.displayName;
            const photoURL = user.photoURL;
            
            const nameElement = document.getElementById("user-name")
            const imgSrc = document.getElementById("profile-picture")

            imgSrc.src = photoURL
        } else {
            console.log('not signed in')
        }
    })
});

