// Object.prototype.getByIndex = function(index) {
//     return this[Object.keys(this)[index]];
// };


function logout() {
    firebase.auth().signOut().then(() => {
        window.location.replace("/login.html")
    }).catch((error) => {
        console.error(error)
    })
}

function showAnnouncements(data, uuid) {
    // <li>
    //  <div class="card">
    //      <div class="project-info">
    //          <div class="col-lg-2 my-3 col-sm-4">
    //              <div class="mx-auto plus-icon">
    //                  <h1 id="checkLoad" style="font-family: Montserrat, sans-serif; font-style: italic;" class="pt-2 text-center date-text">26</h1>
    //              </div>
    //          </div>
    //             <div class="col-lg-4 my-3 col-sm-6">
    //                 <h4 class="title font-w600 mb-3"><a href="post-details.html" class="text-black">DECA Meeting</a></h4>
    //                 <div class="text-dark" style="font-weight: bold;"><i class="fa fa-calendar-o mr-3" style="font-weight: bold;" aria-hidden="true"></i>Sept 8th, 2021</div>
    //             </div>
    //             <div class="col-lg-4 my-3 col-sm-6 offset-md-2">
    //                 <div class="d-flex project-status align-items-center float-right"> <a href="javascript:void(0);" class="btn btn-primary">Read More</a>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </li>

    // let title = data.title;
    // let date = data.date;

    let day = data.date;
    day = day.substring(0, 2);

    let ul = document.getElementById('upcoming');
    let li = document.createElement('li');

    let divCard = document.createElement('div');
    divCard.classList.add('card');

    let divProject = document.createElement('div');
    divProject.classList.add('project-info');

    //Column 1 Start
    let divCol1 = document.createElement('div');
    divCol1.classList.add('col-lg-2', 'my-3', 'col-sm-4');

    let divDate = document.createElement('div');
    divDate.classList.add('mx-auto', 'plus-icon');

    let date = document.createElement('h1');
    date.classList.add('pt-2', 'text-center', 'date-text');
    $(date).css({ 'font-family': 'Montserrat, sans-serif', 'font-style': 'italic' });
    date.innerHTML = day;
    //Column 1 End

    //Column 2 Start
    let divCol2 = document.createElement('div');
    divCol2.classList.add('col-lg-4', 'my-3', 'col-sm-6');

    let title = document.createElement('h4');
    title.classList.add('title', 'font-w600', 'mb-3', 'text-nowrap');
    title.innerHTML = data.title;

    let divFullDate = document.createElement('div');
    divFullDate.classList.add('text-dark');
    $(divFullDate).css('font-weight', 'bold');

    let fullDate = document.createElement('a');
    fullDate.innerHTML = data.date;

    let calendarIcon = document.createElement('i');
    calendarIcon.classList.add('fa', 'fa-calendar-o', 'mr-3');
    calendarIcon.setAttribute('aria-hidden', 'true');
    $(calendarIcon).css('font-weight', 'bold');

    //Column 2 End
    {
        /* <div class="dropdown pl-3">
             <a href="javascript:void(0);" data-toggle="dropdown" aria-expanded="false">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        			<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        			<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        			<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        		</svg>
            </a>
            <div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(24px, 21px, 0px);">
                <a class="dropdown-item" href="javascript:void(0);">Edit</a>
                <a class="dropdown-item" href="javascript:void(0);">Delete</a>
            </div>
        </div> */
    }

    //Column 3 Start
    let divCol3 = document.createElement('div');
    divCol3.classList.add('col-lg-4', 'my-3', 'col-sm-6', 'offset-md-2');

    let divBtn = document.createElement('div');
    divBtn.classList.add('d-flex', 'project-status', 'align-items-center', 'float-right');

    let btn = document.createElement('a');
    btn.classList.add('btn', 'btn-primary');
    btn.setAttribute('href', 'javascript:void(0);');
    btn.innerHTML = 'Read More';

    let divDropdown = document.createElement('div');
    divDropdown.classList.add('dropdown', 'pl-3');

    let aIcon = document.createElement('a');
    aIcon.setAttribute('href', 'javascript:void(0)');
    aIcon.setAttribute('data-toggle', 'dropdown');
    aIcon.setAttribute('aria-expanded', 'false');

    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('xlmns', 'http://www.w3.org/2000/svg');

    let path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z');
    path1.setAttribute('stroke', '#575757');
    path1.setAttribute('stroke-width', '2');
    path1.setAttribute('stroke-linecap', 'round');
    path1.setAttribute('stroke-linejoin', 'round');

    let path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z');
    path2.setAttribute('stroke', '#575757');
    path2.setAttribute('stroke-width', '2');
    path2.setAttribute('stroke-linecap', 'round');
    path2.setAttribute('stroke-linejoin', 'round');

    let path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z');
    path3.setAttribute('stroke', '#575757');
    path3.setAttribute('stroke-width', '2');
    path3.setAttribute('stroke-linecap', 'round');
    path3.setAttribute('stroke-linejoin', 'round');

    let divDropdownMenu = document.createElement('div');
    divDropdownMenu.classList.add('dropdown-menu', 'dropdown-menu-right');
    divDropdownMenu.setAttribute('x-placement', 'bottom-end');
    $(divDropdownMenu).css({ 'position': 'absolute', 'will-change': 'transform', 'top': '0px', 'left': '0px', 'transform': 'translate3d(24px, 21px, 0px)' });

    // var newAnnouncement = {
    //     "title": title,
    //     "message": message,
    //     "club": club,
    //     "date": date,
    //     "grade": { "9": gr9, "10": gr10, "11": gr11, "12": gr12 },
    //     "gender": { "male": male, "female": female }
    // }

    let aEdit = document.createElement('a');
    aEdit.classList.add('dropdown-item');
    aEdit.setAttribute('href', 'javascript:void(0)');
    aEdit.setAttribute('data-toggle', 'modal');
    aEdit.setAttribute('data-target', '#editAnnouncement');
    aEdit.innerHTML = 'Edit';

    aEdit.setAttribute('data-title', data.title);
    aEdit.setAttribute('data-message', data.message);
    aEdit.setAttribute('data-club', data.club);
    aEdit.setAttribute('data-date', data.date);
    aEdit.setAttribute('data-grade9', data.grade['9']);
    aEdit.setAttribute('data-grade10', data.grade['10']);
    aEdit.setAttribute('data-grade11', data.grade['11']);
    aEdit.setAttribute('data-grade12', data.grade['12']);
    aEdit.setAttribute('data-allGrade', data.grade.all)
    aEdit.setAttribute('data-male', data.gender.male);
    aEdit.setAttribute('data-female', data.gender.female);
    aEdit.setAttribute('data-allGender', data.gender.all)
    aEdit.setAttribute('data-uuid', uuid);

    let aDelete = document.createElement('a');
    aDelete.classList.add('dropdown-item', 'delete-btn');
    aDelete.setAttribute('href', 'javascript:void(0);');
    // aDelete.setAttribute('onclick', 'deleteAnnouncement(event);');
    aDelete.setAttribute('data-uuid', uuid);
    aDelete.innerHTML = 'Delete';
    //Column 3 End

    /* <div class="dropdown pl-3">
             <a href="javascript:void(0);" data-toggle="dropdown" aria-expanded="false">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        			<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        			<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        			<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        		</svg>
            </a>
            <div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(24px, 21px, 0px);">
                <a class="dropdown-item" href="javascript:void(0);">Edit</a>
                <a class="dropdown-item" href="javascript:void(0);">Delete</a>
            </div>
        </div> */

    //Column 1
    divDate.appendChild(date);
    divCol1.appendChild(divDate);
    divProject.appendChild(divCol1);

    //Column 2
    divFullDate.appendChild(calendarIcon);
    divFullDate.appendChild(fullDate);
    divCol2.appendChild(title);
    divCol2.appendChild(divFullDate);
    divProject.appendChild(divCol2);

    //Column 3
    svg.appendChild(path1);
    svg.appendChild(path2);
    svg.appendChild(path3);
    aIcon.appendChild(svg);
    divDropdown.appendChild(aIcon);
    divDropdownMenu.appendChild(aEdit);
    divDropdownMenu.appendChild(aDelete);
    divDropdown.appendChild(divDropdownMenu);

    divBtn.appendChild(btn);
    divBtn.appendChild(divDropdown);
    divCol3.appendChild(divBtn);
    divProject.appendChild(divCol3);

    //Base
    divCard.appendChild(divProject);
    li.appendChild(divCard);
    ul.appendChild(li);

}

$(document).ready(function() {
    //Check Auth
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let displayName = user.displayName;
            const photoURL = user.photoURL;
            const email = user.email;

            if (email.includes('@pdsb.net')) {
                // window.location.replace('/index.html')
            } else if (email.includes('@peelsb.net')) {
                // window.location.replace('/teacher_index.html')
            } else {
                firebase.auth().signOut().then(() => {
                    alert('You need a PDSB Account')
                    window.location.replace('/login.html')
                }).catch((error) => {
                    console.error(error)
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
            for (let i = Object.keys(announcements).length - 1; i >= 0; i--) {
                let key = Object.keys(announcements)[i];
                showAnnouncements(announcements[key], key);
            }
        }
    }).catch((error) => {
        console.error(error)
    });
});

//Logout Function
document.getElementById('logout-btn').addEventListener('click', logout);

//Send Announement to Database
$('#newAnnouncementForm').submit(function(event) {
    // Stop the page from reloading
    event.preventDefault();

    // Get all the form values, and checkbox states
    var title = $('#titleInput').val();

    var message = $('#messageTextarea').val();

    var club = $('#formClub').val();

    var gr9 = $('#9Checkbox').prop('checked');
    var gr10 = $('#10Checkbox').prop('checked');
    var gr11 = $('#11Checkbox').prop('checked');
    var gr12 = $('#12Checkbox').prop('checked');
    var allGr = $('#allGradesCheckbox').prop('checked');

    var male = $('#maleFormCheckbox').prop('checked');
    var female = $('#femaleFormCheckbox').prop('checked');
    var allGe = $('#allGendersCheckbox').prop('checked');

    var date = $('#datepicker').val();

    // Generate a Unique ID for saving the announcement to the database
    let uuid = Date.now();

    // JSON object format for the announcement
    var newAnnouncement = {
        "title": title,
        "message": message,
        "club": club,
        "date": date,
        "grade": { "9": gr9, "10": gr10, "11": gr11, "12": gr12, "all": allGr },
        "gender": { "male": male, "female": female, "all": allGe }
    }

    // Use the UUID to generate a unique path in the database for each announcement
    var announcementsRef = firebase.database().ref('announcements/' + uuid);
    announcementsRef.set(newAnnouncement)
        .then(function() {
            // After sending the announcement to firebase
            // Display the updated announcements
            var dbRef = firebase.database().ref();
            dbRef.child('announcements').get().then((snapshot) => {
                if (snapshot.exists()) {
                    var announcements = snapshot.toJSON();
                    //List Announcements with Database Data
                    $('#upcoming').empty();
                    for (let i = Object.keys(announcements).length - 1; i >= 0; i--) {
                        let keys = Object.keys(announcements)[i];
                        showAnnouncements(announcements[keys], keys);
                    }
                }
            }).catch((error) => {
                console.error(error)
            })
        })
        .catch(function(err) {
            console.error('Fail' + err.message)
        })
});

// Add event listener for edit announcement buttons
// opens edit form modal
$('#editAnnouncement').on('show.bs.modal', function(event) {
    let button = $(event.relatedTarget);

    // Get announcement data set as attributes in the button
    let title = button.data('title');
    let message = button.data('message');
    let club = button.data('club');
    let date = button.data('date');
    let gr9 = button.data('grade9');
    let gr10 = button.data('grade10');
    let gr11 = button.data('grade11');
    let gr12 = button.data('grade12');
    let allGr = button.data('allgrade')
    let male = button.data('male');
    let female = button.data('female');
    let allGe = button.data('allgender')
    let uuid = button.data('uuid');

    // Update form with announcement data
    let modal = $(this);
    modal.find('#editTitle').val(title);
    modal.find('#editTextarea').val(message);
    modal.find('#editClub').val(club).change();
    modal.find('#editDatePicker').val(date).change();

    modal.find('#edit9Checkbox').prop('checked', gr9);
    modal.find('#edit10Checkbox').prop('checked', gr10);
    modal.find('#edit11Checkbox').prop('checked', gr11);
    modal.find('#edit12Checkbox').prop('checked', gr12);
    modal.find('#editAllGradeCheckbox').prop('checked', allGr);

    modal.find('#editMaleFormCheckbox').prop('checked', male);
    modal.find('#editMemaleFormCheckbox').prop('checked', female);
    modal.find('#editAllGenderCheckbox').prop('checked', allGe);

    modal.find('#uuid-label').val(uuid);
});

// Send Edited Announement to Database
// On submit listener for the announcement edit modal
$('#editAnnouncementForm').submit(function(event) {
    // Stop submit from reloading page
    event.preventDefault();

    // Retrieve values from edit form
    var title = $('#editTitle').val();

    var message = $('#editTextarea').val();

    var club = $('#editClub').val();

    var gr9 = $('#edit9Checkbox').prop('checked');
    var gr10 = $('#edit10Checkbox').prop('checked');
    var gr11 = $('#edit11Checkbox').prop('checked');
    var gr12 = $('#edit12Checkbox').prop('checked');

    var male = $('#editmaleFormCheckbox').prop('checked');
    var female = $('#editfemaleFormCheckbox').prop('checked');

    var date = $('#editDatePicker').val();

    let uuid = $('#uuid-label').val();

    // Create JSON object of edited form
    var editedAnnouncement = {
        "title": title,
        "message": message,
        "club": club,
        "date": date,
        "grade": { "9": gr9, "10": gr10, "11": gr11, "12": gr12, "all": allGr },
        "gender": { "male": male, "female": female, "all": allGe }
    }

    // Use UUID to select the announcement in the database
    var announcementsRef = firebase.database().ref('announcements/' + uuid);
    // Update announcement with new data
    announcementsRef.update(editedAnnouncement)
        .then(function() {
            // After updating announcement
            // Reload announcements
            var dbRef = firebase.database().ref();
            dbRef.child('announcements').get().then((snapshot) => {
                if (snapshot.exists()) {
                    var announcements = snapshot.toJSON();
                    //List Announcements with Database Data
                    $('#upcoming').empty();
                    for (let i = Object.keys(announcements).length - 1; i >= 0; i--) {
                        let keys = Object.keys(announcements)[i];
                        showAnnouncements(announcements[keys]);
                    }
                }
            }).catch((error) => {
                console.error(error)
            })
        })
        .catch(function(err) {
            console.error('Fail' + err.message)
        });
});

//Delete Announcement Function
// On Click Event listener for delete button
$('#upcoming').on('click', 'a.delete-btn', function() {
    // Get UUID
    // And use it to select the announcement in the database
    let uuid = $(this).data('uuid');
    let announcementRef = firebase.database().ref('announcements/' + uuid);
    
    // Remove selected announcement
    announcementRef.remove()
        .then(function() {
            // After removing the announcement,
            // Fetch and update the announcements
            var dbRef = firebase.database().ref();
            dbRef.child('announcements').get().then((snapshot) => {
                if (snapshot.exists()) {
                    var announcements = snapshot.toJSON();
                    //List Announcements with Database Data
                    $('#upcoming').empty();
                    for (let i = Object.keys(announcements).length - 1; i >= 0; i--) {
                        let keys = Object.keys(announcements)[i];
                        showAnnouncements(announcements[keys]);
                    }
                }
            }).catch((error) => {
                console.error(error)
            })
        })
        .catch(function(err) {
            console.error('Fail' + err.message)
        });
});

// Search Function
// Uses the keyup listener to check for keystrokes on the search bar
$('#search-bar').keyup(function() {
    // Get the value of the search
    let search = $(this).val().toUpperCase();
    // Get the number of announcements
    let annsLen = $('#upcoming li').length;
    let matches = 0;

    for (let i = 0; i < annsLen; i++) {
        let card = $('#upcoming').children('li').eq(i);
        let title = $('#upcoming').children('li').eq(i).children('div').children('div').children('div')
            .first().next().children('h4').text();
        if (title.toUpperCase().indexOf(search) != -1) {
            card.css('display', 'list-item');
            matches++;
        } else {
            card.css('display', 'none');
        }
    }

    // IF there are no matches
    if (matches == 0) {   
        // Display the no results card
        document.getElementById('noResultsCard').style.display = 'list-item';
    } else {
        // ELSE keep it hidden
        document.getElementById('noResultsCard').style.display = 'none';
    }
});