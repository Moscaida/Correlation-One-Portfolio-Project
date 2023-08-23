//DARK MODE
$(document).ready(function () {
  const $body = $('body');
  const $modeToggle = $('#mode-toggle');
  const $modeStatus = $('.mode-status');

  function toggleMode() {
    $body.toggleClass('dark-mode');
    const modeMessage = $body.hasClass('dark-mode') ? 'Dark Mode' : 'Light Mode';
    $modeStatus.text("Currently in " + modeMessage);
  }

  $modeToggle.click(toggleMode);

  if (localStorage.getItem('dark-mode') === 'enabled') {
    $body.addClass('dark-mode');
    $modeToggle.prop('checked', true);
  }

  $modeToggle.change(function () {
    if ($(this).is(':checked')) {
      $body.addClass('dark-mode');
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      $body.removeClass('dark-mode');
      localStorage.setItem('dark-mode', 'disabled');
    }
  });
});

//FADE AND SLIDE
const $items = $('.item');
const options = {
  threshold: 0.5
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      $(entry.target).addClass('slide-in');
    } else {
      $(entry.target).removeClass('slide-in');
    }
  });
}, options);

$items.each(function () {
  observer.observe(this);
});


//CONTACT FORM
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

$("#contactForm").submit(function (e) {
  e.preventDefault();

  const name = $("#name").val();
  const emailid = $("#emailid").val();
  const phone = $("#phone").val();
  const msgContent = $("#msgContent").val();

  saveMessages(name, emailid, phone, msgContent);

  // Enable alert
  $(".alert").show();

  // Remove the alert after 3 seconds
  setTimeout(() => {
    $(".alert").hide();
  }, 3000);

  // Reset the form
  $("#contactForm")[0].reset();
});

function saveMessages(name, emailid, phone, msgContent) {
  const newContactForm = contactFormDB.push();
  newContactForm.set({
    name: name,
    emailid: emailid,
    phone: phone,
    msgContent: msgContent,
  });
}

