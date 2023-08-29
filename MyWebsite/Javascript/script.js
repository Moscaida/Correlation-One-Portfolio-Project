// DARK MODE
const body = document.querySelector('body');
const modeToggle = document.getElementById('mode-toggle');
const modeStatus = document.querySelector('.mode-status');

function toggleMode() {
    body.classList.toggle('dark-mode');

    const modeMessage = body.classList.contains('dark-mode') ?
        'Dark Mode'
        : 'Light Mode';

    modeStatus.innerText = "Currently in " + modeMessage;
}

modeToggle.addEventListener('click', toggleMode);

document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const toggle = document.getElementById('mode-toggle');

    // Check for dark mode preference in local storage
    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
        toggle.checked = true;
    }

    // Add event listener to the toggle
    toggle.addEventListener('change', function () {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
});


// FADE AND SLIDE
const items = document.querySelectorAll('.item');

const options = {
    threshold: 0.5
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
        } else {
            entry.target.classList.remove('slide-in');
        }
    });
}, options);

items.forEach(item => {
    observer.observe(item);
});

// CONTACT FORM
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SEND_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MESSAGE_ID"
};

firebase.initializeApp(firebaseConfig);
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var name = getElementVal("name");
    var emailid = getElementVal("emailid");
    var phone = getElementVal("phone");
    var msgContent = getElementVal("msgContent");

    saveMessages(name, emailid, phone, msgContent);

    // Enable alert
    document.querySelector(".alert").style.display = "block";

    // Remove the alert after 3 seconds
    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
    }, 3000);

    // Reset the form
    document.getElementById("contactForm").reset();
}

function saveMessages(name, emailid, phone, msgContent) {
    var newContactForm = contactFormDB.push();
    newContactForm.set({
        name: name,
        emailid: emailid,
        phone: phone,
        msgContent: msgContent,
    });
}

function getElementVal(id) {
    return document.getElementById(id).value;
}

//SORTABLE TABLE
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.querySelector("table");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (isNaN(x.innerHTML) && isNaN(y.innerHTML)) {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (Number(x.innerHTML.replace(/[^0-9.-]+/g, "")) > Number(y.innerHTML.replace(/[^0-9.-]+/g, ""))) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else if (dir == "desc") {
                if (isNaN(x.innerHTML) && isNaN(y.innerHTML)) {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (Number(x.innerHTML.replace(/[^0-9.-]+/g, "")) < Number(y.innerHTML.replace(/[^0-9.-]+/g, ""))) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}


//GOOGLE MAPS API

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 16.846319220714, lng: -99.88194392776832 },
        zoom: 14,
        mapId: 'd47b98cc640e69dc'
    });
    new google.maps.Marker({
        position: { lat: 16.850305116799007, lng: -99.90258905396894 },
        map,
        title: "Historic Museum Fort Sand Diego",
        animation: google.maps.Animation.DROP
    });
    new google.maps.Marker({
        position: { lat: 16.846007262448502, lng: -99.91509522257486 },
        map,
        title: "La Quebrada, Cliff Divers",
        animation: google.maps.Animation.DROP
    });

    new google.maps.Marker({
        position: { lat: 16.822989238427482, lng: -99.907562118657 },
        map,
        title: "Playa La Roqueta, The Rocket Beach",
        animation: google.maps.Animation.DROP
    });
}

//16.850305116799007, -99.90258905396894
//16.846007262448502, -99.91509522257486
//16.822989238427482, -99.907562118657