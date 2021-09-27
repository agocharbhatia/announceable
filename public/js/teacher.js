$(document).ready(function() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('logged in')
            let displayName = user.displayName;
            const photoURL = user.photoURL;
            const email = user.email;
            
            if (email.includes('@pdsb.net')) {
                //Continue
            } else if (email.includes('@peelsb.net')) {
                window.location.replace('/teacher_index.html')
            } else {
                firebase.auth().signOut().then(() => {
                    alert('You need a PDSB Account')
                    window.location.replace('/login.html')
                }).catch((error) => {
                    console.log(error)
                })
                
            }

            const nameElement = document.getElementById("user-name");
            const imgSrc = document.getElementById("profile-picture");          

            displayName = displayName.substring(0, 2)

            nameElement.innerHTML = displayName
            imgSrc.src = photoURL
        } else {
            window.location.replace("/login.html")
        }
    });

    document.getElementById('logout-btn').addEventListener('click', logout);

    function logout() {
        firebase.auth().signOut().then(() => {
            window.location.replace("/login.html")
        }).catch((error) => {
            console.log(error)
        })
    }
});

