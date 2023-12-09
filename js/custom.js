
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














let audioContext;
    let analyser;
    let audioSource;

    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = 125;

    const bufferLength = 1024; // Adjust this value for better resolution if needed
    const dataArray = new Uint8Array(bufferLength);

    function setupAudio(audioFile) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();

      audioSource = new Audio();
      audioSource.src = audioFile;
      audioSource.crossOrigin = 'anonymous'; // Enable cross-origin for audio
      audioSource.load();
      audioSource.play();

      const source = audioContext.createMediaElementSource(audioSource);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      function draw() {
        requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i];

          ctx.fillStyle = `rgb(80, 70, 250)`;
          ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

          x += barWidth + 1;
        }
      }

      audioSource.addEventListener('play', function() {
        draw();
      });
    }

    function playAudio(audioFile) {
      if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume().then(function() {
          setupAudio(audioFile);
        });
      } else {
        setupAudio(audioFile);
      }
    }