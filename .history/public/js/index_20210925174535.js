$(document).ready(function() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('logged in')
            let displayName = user.displayName;
            const photoURL = user.photoURL;
            
            const nameElement = document.getElementById("user-name")
            const imgSrc = document.getElementById("profile-picture")

            nameElement.innerHTML = displayName
            imgSrc.src = photoURL
        } else {
            console.log('not signed in')
        }
    })
});

