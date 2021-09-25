var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/userinfo.email');
provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

$(document).ready(function(){
    $('#login-btn').click(function() {
        // firebase.auth().signInWithRedirect(provider);
        console.log('btn clicked')
    })
})