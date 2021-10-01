function showAnnouncements(data) {
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
    //                 <div class="d-flex project-status align-items-center float-right"> <a href="javascript:void(0);" class="btn btn-primary">Read More</a>
    //                 </div>
    //             </div>

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

    var dbRef = firebase.database().ref();
    dbRef.child('announcements').get().then((snapshot) => {
        if (snapshot.exists()) {
            var announcements = snapshot.toJSON();
            //List Announcements with Database Data
            for (let i = Object.keys(announcements).length - 1; i >= 0; i--) {
                let keys = Object.keys(announcements)[i];
                console.log(i)
                console.log(announcements[keys]);
                console.log(keys)
                showAnnouncements(announcements[keys]);
            }
            // console.log(announcements);
        } else {
            console.log('No Data Available')
        }
    }).catch((error) => {
        console.error(error)
    })

    document.getElementById('logout-btn').addEventListener('click', logout);

    function logout() {
        firebase.auth().signOut().then(() => {
            window.location.replace("/login.html")
        }).catch((error) => {
            console.log(error)
        })
    }
});

//Search Function
$('#search-bar').keyup(function() {
    let search = $(this).val().toUpperCase();
    let annsLen = $('#upcoming li').length;

    for (let i = 0; i < annsLen; i++) {
        let card = $('#upcoming').children('li').eq(i);
        let title = $('#upcoming').children('li').eq(i).children('div').children('div').children('div')
            .first().next().children('h4').text();
        if (title.toUpperCase().indexOf(search) != -1) {
            console.log(title + ' matches')
            card.css('display', 'list-item');
        } else {
            console.log(title + ' dont match')
            card.css('display', 'none');
        }
    }
});