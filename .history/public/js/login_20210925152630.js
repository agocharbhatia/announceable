$(document).ready(function() {
    var provider = new firebase.auth().GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    console.log('loaded')
});

document.getElementById('login-btn').addEventListener('click', login);

function login() {
    console.log('btn clicked')
}