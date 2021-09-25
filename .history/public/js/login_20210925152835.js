$.getScript('https://cdn.firebase.com/v0/firebase.js', function() {
    document.getElementById('login-btn').addEventListener('click', login);

    function login() {
        console.log('btn clicked')
    }
});
