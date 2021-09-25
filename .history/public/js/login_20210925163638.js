$(document).ready(function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

    document.getElementById('login-btn').addEventListener('click', login);

    function login() {
        console.log('btn clicked')
        firebase.auth().signInWithPopup(provider).then(res=>{
            console.log(res)
        }).catch(e=>{
            console.log(e)
        })
    }
});

