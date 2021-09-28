function logout() {
    firebase.auth().signOut().then(() => {
        window.location.replace("/login.html")
    }).catch((error) => {
        console.log(error)
    })
}

$(document).ready(function() {
    //Check Auth
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

    //Get Announcements Data From Database
    var dbRef = firebase.database().ref();
    dbRef.child('announcements').get().then((snapshot) => {
        if (snapshot.exists()) {
            var announcements = snapshot.toJSON();
            //List Announcements with Database Data
            for (let i = 0; i < announcements.length; i++) {
                console.log(announcements[i])
            }
            // console.log(announcements);
        } else {
            console.log('No Data Available')
        }
    }).catch((error) => {
        console.error(error)
    })



});

//Logout Function
document.getElementById('logout-btn').addEventListener('click', logout);

//Send Announement to Database
$('#newAnnouncementForm').submit(function(event) {
    console.log('Submit to Firebase')

    var title = $('#titleInput').val();

    var message = $('#messageTextarea').val();

    var club = $('#formClub').val();

    var gr9 = $('#9Checkbox').prop('checked');
    var gr10 = $('#10Checkbox').prop('checked');
    var gr11 = $('#11Checkbox').prop('checked');
    var gr12 = $('#12Checkbox').prop('checked');

    var male = $('#maleFormCheckbox').prop('checked');
    var female = $('#femaleFormCheckbox').prop('checked');

    let uuid = Date.now();

    var newAnnouncement = {
        "title": title,
        "message": message,
        "club": club,
        "grade": { "9": gr9, "10": gr10, "11": gr11, "12": gr12 },
        "gender": { "male": male, "female": female }
    }

    console.log(newAnnouncement)

    var announcementsRef = firebase.database().ref('announcements/' + uuid);
    announcementsRef.set(newAnnouncement)
        .then(function() {
            console.log('Success')
        })
        .catch(function(err) {
            console.log('Fail' + err.message)
        })

    event.preventDefault();
});