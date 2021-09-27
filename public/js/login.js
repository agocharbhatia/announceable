$(document).ready(function() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const email = user.email;
            if (email.includes('@pdsb.net')) {
                window.location.replace("/")
            } else if (email.includes('@peelsb.net')) {
                window.location.replace('/teacher_index.html')
            } else {
                firebase.auth().signOut().then(() => {
                    alert('You need a PDSB Account')
                }).catch((error) => {
                    console.log(error)
                })  
            }
            
        } else {
           //Not Logged In
        }
    });

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

    document.getElementById('login-btn').addEventListener('click', login);
    
    function login() {
        console.log('btn clicked')
        firebase.auth().signInWithRedirect(provider).then(res=>{
            console.log(res)
            const email = user.email;
            if (email.includes('@pdsb.net')) {
                window.location.replace("/")
            } else if (email.includes('@peelsb.net')) {
                window.location.replace('/teacher_index.html')
            } else {
                firebase.auth().signOut().then(() => {
                    alert('You need a PDSB Account')
                }).catch((error) => {
                    console.log(error)
                })  
            }
            
        }).catch(e=>{
            console.log(e)
        })
    }
});

