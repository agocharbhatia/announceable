// $.getScript('https://cdn.firebase.com/v0/firebase.js', function() {
//     var provider = new firebase.auth.GoogleAuthProvider();
//     provider.addScope('https://www.googleapis.com/auth/userinfo.email');
//     provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

//     document.getElementById('login-btn').addEventListener('click', login);

//     function login() {
//         console.log('btn clicked')
//     }
// });

$(document).ready('https://cdn.firebase.com/v0/firebase.js', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

    document.getElementById('login-btn').addEventListener('click', login);

    function login() {
        console.log('btn clicked')
    }
});

