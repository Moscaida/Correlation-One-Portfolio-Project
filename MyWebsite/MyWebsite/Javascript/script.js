$(document).ready(function () {
  //DARK MODE
  const $body = $('body');
  const $modeToggle = $('#mode-toggle');
  const $modeStatus = $('.mode-status');

  $modeToggle.on('click', function () {
      $body.toggleClass('dark-mode');
      const modeMessage = $body.hasClass('dark-mode') ? 'Dark Mode' : 'Light Mode';
      $modeStatus.text("Currently in " + modeMessage);
  });

  if (localStorage.getItem('dark-mode') === 'enabled') {
      $body.addClass('dark-mode');
      $modeToggle.prop('checked', true);
  }

  $modeToggle.on('change', function () {
      if ($(this).is(':checked')) {
          $body.addClass('dark-mode');
          localStorage.setItem('dark-mode', 'enabled');
      } else {
          $body.removeClass('dark-mode');
          localStorage.setItem('dark-mode', 'disabled');
      }
  });

  //FADE AND SLIDE
  const $items = $('.item');
  const options = {
      threshold: 0.5
  };

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          const $target = $(entry.target);
          if (entry.isIntersecting) {
              $target.addClass('slide-in');
          } else {
              $target.removeClass('slide-in');
          }
      });
  }, options);

  $items.each(function () {
      observer.observe(this);
  });

  // CONTACT FORM
  // ... [Keeping the Firebase config and initialization as it is]

  $("#contactForm").submit(function (e) {
      e.preventDefault();

      const name = $("#name").val();
      const emailid = $("#emailid").val();
      const phone = $("#phone").val();
      const msgContent = $("#msgContent").val();

      saveMessages(name, emailid, phone, msgContent);

      $(".alert").show().delay(3000).fadeOut();
      $("#contactForm")[0].reset();
  });

  // SORTABLE TABLE
  const $search = $('.input-group input');
  const $tableRows = $('tbody tr');
  const $tableHeadings = $('thead th');

  $search.on('input', function () {
      const search_data = $(this).val().toLowerCase();
      $tableRows.each(function (i, row) {
          const $row = $(row);
          const table_data = $row.text().toLowerCase();
          $row.toggleClass('hide', table_data.indexOf(search_data) < 0);
          $row.css('--delay', i / 25 + 's');
      });
      $('tbody tr:not(.hide)').each(function (i, visible_row) {
          $(visible_row).css('background-color', (i % 2 === 0) ? 'transparent' : '#0000000b');
      });
  });

  $tableHeadings.each(function (i, head) {
      let sort_asc = true;
      $(head).on('click', function () {
          $tableHeadings.removeClass('active');
          $(this).addClass('active');
          $('td').removeClass('active');
          $tableRows.each(function (_, row) {
              $(row).find('td').eq(i).addClass('active');
          });
          $(this).toggleClass('asc', sort_asc);
          sort_asc = !$(this).hasClass('asc');
          sortTable(i, sort_asc);
      });
  });

  function sortTable(column, sort_asc) {
      [...$tableRows].sort((a, b) => {
          let first_row = $(a).find('td').eq(column).text().toLowerCase(),
              second_row = $(b).find('td').eq(column).text().toLowerCase();

          return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
      }).forEach(sorted_row => $('tbody').append(sorted_row));
  }
});