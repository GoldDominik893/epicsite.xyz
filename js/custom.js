
  $(function () {

    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });

    // AOS ANIMATION
    AOS.init({
      disable: 'mobile',
      duration: 800,
      anchorPlacement: 'center-bottom'
    });


    // SMOOTHSCROLL NAVBAR
    $(function() {
      $('.navbar a, .hero-text a').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
        }, 1000);
        event.preventDefault();
      });
    });    
  });


    

// Wait for the page to fully load
window.addEventListener('load', function() {
  var navbar = document.querySelector('.navbar');
  var scrollColor = navbar.getAttribute('data-scroll-color');
  
  // Set the initial background color after the page has loaded
  navbar.style.backgroundColor = scrollColor;

  window.addEventListener('scroll', function() {
      var scrollTop = window.scrollY;
      
      if (scrollTop === 0) {
          navbar.style.backgroundColor = scrollColor;
      } else {
          navbar.style.backgroundColor = 'rgb(29,29,29)';
      }
  });
});

