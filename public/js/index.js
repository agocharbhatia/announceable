function showAnnouncements(data) {
    // Get the first two characters in the date string to get the day
    // Ex, date string = 12 December, 2021
    // day = 12
    let day = data.date.substring(0, 2);

    // Get the unlisted list element
    let ul = document.getElementById('upcoming');

    // Create a new li element
    let li = document.createElement('li');

    // Set the JSON data attribute for the filteration system
    li.setAttribute('data-json', JSON.stringify(data));
    
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

    //Column 3 Start
    let divCol3 = document.createElement('div');
    divCol3.classList.add('col-lg-4', 'my-3', 'col-sm-6', 'offset-md-2');

    let divBtn = document.createElement('div');
    divBtn.classList.add('d-flex', 'project-status', 'align-items-center', 'float-right');

    let btn = document.createElement('a');
    btn.classList.add('btn', 'btn-primary');
    btn.setAttribute('href', 'javascript:void(0);');
    btn.innerHTML = 'Read More';
    //Column 3 End

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
    divBtn.appendChild(btn);
    divCol3.appendChild(divBtn);
    divProject.appendChild(divCol3);

    //Base
    divCard.appendChild(divProject);
    li.appendChild(divCard);
    ul.appendChild(li);
}

$(document).ready(function() {
    // On an authentication state change
    firebase.auth().onAuthStateChanged((user) => {
        // IF the user is logged in with Firebase
        if (user) {
            // Create variables which are set to elements on the HTML page
            const nameElement = document.getElementById("userName");
            const roleElement = document.getElementById("userRole");
            const imgSrc = document.getElementById("profilePicture");

            // Set user data from Google OAuth Login to the elements on the HTML page
            let displayName = user.displayName;
            const photoURL = user.photoURL;
            const email = user.email;

            // IF the email address includes @pdsb,net
            if (email.includes('@pdsb.net') && email.startsWith('p')) {
                // Set the role element to Teacher
                roleElement.innerHTML = 'Teacher';
                displayName = displayName.substring(0, displayName.indexOf('-'))[0];
            } else if (email.includes('@pdsb.net')) {
                // Hide the page to the teacher dashboard, as they are not a teacher
                document.getElementById('teacherLink').style.display = "none";    
                // Set the role element to Student
                roleElement.innerHTML = 'Student';
                displayName = displayName.substring(0, 2);
            } else if (email.includes('@peelsb.net')) {
                // IF the email address includes @peelsb.net
                // Set the role element to Teacher
                roleElement.innerHTML = 'Teacher';
            } else {
                // IF the user does not have a PDSB account
                // Sign the user out, and redirect them back to the login page
                firebase.auth().signOut().then(() => {
                    alert('You need a PDSB Account');
                    window.location.replace('/login.html');
                }).catch((error) => {
                    console.error(error);
                })
            }
            
            // Display some profile data of the user on the page
            nameElement.innerHTML = displayName;
            imgSrc.src = photoURL;
            
            // Hide the no results card
            document.getElementById('noResultsCard').style.display = 'none';
        } else {
            // IF the user is not logged in
            // Send them to the login page
            window.location.replace("/login.html");
        }
    });

    // Get the database reference from Firebase
    var dbRef = firebase.database().ref();

    // Take a snapshot of the announcements branch in the database
    dbRef.child('announcements').get().then((snapshot) => {
        // If it exists
        if (snapshot.exists()) {
            // Convert the announcements to a JSON object
            var announcements = snapshot.toJSON();
            // List Announcements with Database Data
            // FOR each announcement in the JSON object
            for (let i = Object.keys(announcements).length - 1; i >= 0; i--) {
                // Get the key of the announcement
                let keys = Object.keys(announcements)[i];
                // And display the result using the showAnnouncements() function
                showAnnouncements(announcements[keys]);
            }
        }
    }).catch((error) => {
        console.error(error);
    });

    // Add a click event listener to the logout button
    // On click, it will run the function logout()
    document.getElementById('logout-btn').addEventListener('click', logout);

    function logout() {
        // Sends the sign out signal to firebase 
        firebase.auth().signOut().then(() => {
            // After logged out, redirect to login page
            window.location.replace("/login.html");
        }).catch((error) => {
            console.log(error);
        })
    }
});

// Search Function
// Uses the keyup listener to check for keystrokes on the search bar
$('#search-bar').keyup(function() {
    // Get the value of the search
    let search = $(this).val().toUpperCase();
    // Get the number of announcements
    let annsLen = $('#upcoming li').length;
    let matches = 0;

    // Loop through the announcements using annsLen
    for (let i = 0; i < annsLen; i++) {
        // Get the card element and the title element
        let card = $('#upcoming').children('li').eq(i);
        let title = $('#upcoming').children('li').eq(i).children('div').children('div').children('div')
            .first().next().children('h4').text();
        
        // Compare the announcements title to the search query
        if (title.toUpperCase().indexOf(search) != -1) {
            // IF it matches the search query, keep the item displayed
            // & increment the matches variable by one
            card.css('display', 'list-item');
            matches++;
        } else {
            // IF it does not match the search query, hide the announcement
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

// A function to clear the search bar
function clearSearch() {
    // Set search bar to null, clearing the text
    document.getElementById('search-bar').value = null;

    // Clear the filter, setting it back to default
    clearFilter();

    // Get the number of announcements
    let annsLen = $('#upcoming li').length;
    
    // Display each announcement as long as the announcement
    // is not the no results card
    for (let i = 0; i < annsLen; i++) {
        let card = $('#upcoming').children('li').eq(i);
        if (card.attr('id') != 'noResultsCard') {
            card.css('display', 'list-item');
        } else {
            card.css('display', 'none');
        }
    }
}

// FILTER FORM
// Get filter form elements and assign them to variables
let filterGr9 = document.getElementById('filterGrade9Checkbox');
let filterGr10 = document.getElementById('filterGrade10Checkbox');
let filterGr11 = document.getElementById('filterGrade11Checkbox');
let filterGr12 = document.getElementById('filterGrade12Checkbox');
let filterGrAll = document.getElementById('filterAllGradeCheckbox');
let filterClub = document.getElementById('filterClub');
let filterMale = document.getElementById('filterMaleCheckbox');
let filterFemale = document.getElementById('filterFemaleCheckbox');
let filterGenderAll = document.getElementById('filterAllGenderCheckbox');

// Listen for changes to filter form elements and run function updateFilter() on change
filterGr9.addEventListener('change', updateFilter);
filterGr10.addEventListener('change', updateFilter);
filterGr11.addEventListener('change', updateFilter);
filterGr12.addEventListener('change', updateFilter);
filterGrAll.addEventListener('change', updateFilter);
filterClub.addEventListener('change', updateFilter);
filterMale.addEventListener('change', updateFilter);
filterFemale.addEventListener('change', updateFilter);
filterGenderAll.addEventListener('change', updateFilter);

var date_$input = $('#filterDate').pickadate(),
    date_picker = date_$input.pickadate('picker'); 

// Listener for custom date picker element
date_picker.on('set', function() {
    filter['date'] = date_picker.get();
    filterAnnouncements();
});

// Initialize an empty/default filter to comapre with
let emptyFilter = {
    "gr9Checkbox": false,
    "gr10Checkbox": false,
    "gr11Checkbox": false,
    "gr12Checkbox": false,
    "allGradeCheckbox": false,
    "club": "All",
    "maleCheckbox": false,
    "femaleCheckbox": false,
    "allGenderCheckbox": false,
    "date": ''
}

// Initalize filter that will be updated
let filter = {
    "gr9Checkbox": false,
    "gr10Checkbox": false,
    "gr11Checkbox": false,
    "gr12Checkbox": false,
    "allGradeCheckbox": false,
    "club": "All",
    "maleCheckbox": false,
    "femaleCheckbox": false,
    "allGenderCheckbox": false,
    "date": ''
}

function updateFilter() {
    // Get data-name attribute from element
    let name = this.dataset.name;

    // If checkbox, get .checked value, instead of .value value
    // .checked returns true or false, while .value returns 'on' everytime
    if (this.value == 'on') {
        filter[name] = this.checked;
    } else {
        filter[name] = this.value;
    }

    // After updating the filter, run the filter function
    filterAnnouncements();
}

function filterAnnouncements() {
    // Get the amount of announcements, and initalize variable matches at 0
    let annsLen = $('#upcoming li').length;
    let matches = 0;

    // Loop through all the announcements, by getting the announcement length
    // Start at 1 instead of 0, as li[0] is the 'no results' li, which is hidden for now
    for (let i = 1; i < annsLen; i++) {
        // Get the announcement, and the JSON data, which is stored in attribute data-json
        let card = $('#upcoming').children('li').eq(i);
        let data = JSON.parse(card.attr('data-json'));
        // Check if the filter is different than the default filter
        // This is used as when unchecking checkboxes and selecting dropdowns to all, it will return to default filter value
        if (JSON.stringify(emptyFilter) != JSON.stringify(filter)) {
            // IF filter is NOT default, filter announcements
            // FILTER LOGIC
            if (
                // IF the announcment's club is EQUAL to the filter's club
                // OR the filter is set to all clubs
                (data.club == filter.club || filter.club == 'All' || data.club == 'All') &&
                (
                    // AND IF the annnouncement's gender is EQUAL to the filter's gender
                    (data.gender.male == filter.maleCheckbox) &&
                    (data.gender.female == filter.femaleCheckbox) || 
                    // OR the filter is set to all genders
                    filter.allGenderCheckbox == true ||
                    // OR the announcement is set to all genders
                    data.gender.all == true || 
                    // OR if nothing is checked (Default Value)
                    (filter.maleCheckbox == false && filter.femaleCheckbox == false && filter.allGenderCheckbox == false) ||
                    // OR if all genders are checked
                    (filter.maleCheckbox == true && filter.femaleCheckbox == true)
                ) &&
                ((
                    // AND IF the announcement's grade is EQUAL to the filter's grade 
                    ((data.grade[9] == filter.gr9Checkbox && filter.gr9Checkbox == true)) ||
                    ((data.grade[10] == filter.gr10Checkbox && filter.gr10Checkbox == true)) ||
                    ((data.grade[11] == filter.gr11Checkbox && filter.gr11Checkbox == true)) ||
                    ((data.grade[12] == filter.gr12Checkbox && filter.gr12Checkbox == true))) ||
                    // OR the filter is set to all grades
                    filter.allGradeCheckbox == true ||
                    // OR the announcement is set to all grades
                    data.grade.all == true || 
                    // OR if nothing is checked (Default Value)
                    (filter.gr9Checkbox == false && filter.gr10Checkbox == false && filter.gr11Checkbox == false && filter.gr12Checkbox == false) ||
                    // OR if all grades are checked
                    (filter.gr9Checkbox == true && filter.gr10Checkbox == true && filter.gr11Checkbox == true && filter.gr12Checkbox == true)
                ) && 
                // AND IF the announcement's date is EQUAL to the filter's date
                (data.date == filter.date || filter.date == '')
            ) {
                // IF Matches: Display the announcement and increment the variable matches by 1
                card.css('display', 'list-item');
                matches++;
            } else {
                // IF NOT MATCH: Hide the announcement
                card.css('display', 'none');
            }
        } else {
            // IF filter EQUALS default: hide the no results card, and display all the announcements
            // Since it is default filter, meaning nothing is being filtered, display all the announcements
            document.getElementById('noResultsCard').style.display = 'none';
            card.css('display', 'list-item');
        }
    }

    // IF there is more than one match OR the fiter EQUALS default
    if (matches > 0 || JSON.stringify(emptyFilter) == JSON.stringify(filter)) {
        // Hide the no results card as there are matches
        document.getElementById('noResultsCard').style.display = 'none';
    } else {
        // ELSE display the no results card as there is 0 matches. 
        document.getElementById('noResultsCard').style.display = 'list-item';
    }
}

// Reset Filter Button Event Listener
document.getElementById('resetFilterBtn').addEventListener('click', clearFilter);

function clearFilter() {
    // Set checkboxes checked state to false
    filterGr9.checked = false;
    filterGr10.checked = false;
    filterGr11.checked = false;
    filterGr12.checked = false;
    filterGrAll.checked = false;

    // Set selected option to index 0
    // Index 0 is the first option, which is Select Clubs (Default)
    filterClub.selectedIndex = 0;

    // Set checkboxes checked state to false
    filterMale.checked = false;
    filterFemale.checked = false;
    filterGenderAll.checked = false;
}