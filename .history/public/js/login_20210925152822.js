$.getScript('https://cdn.firebase.com/v0/firebase.js', function() {

    // now I can use Firebase

});

document.getElementById('login-btn').addEventListener('click', login);

function login() {
    console.log('btn clicked')
}