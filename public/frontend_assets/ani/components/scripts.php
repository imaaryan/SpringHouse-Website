<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/jquery.waypoints.min.js"></script>
<script src="js/jquery.counterup.min.js"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script src="js/slider.js"></script>
<script src="js/main.js"></script>
<script>
  $('.counter').countUp();

  </script>
<script>
    jQuery(document).ready(function(){
    $('.image-slider').slick({
      dots: false,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1
    });
  });
    jQuery(document).ready(function(){
    $('.image-slider1').slick({
      dots: false,
      arrows: true,
      autoplay: false,
      autoplaySpeed: 3000,
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1
    });
  });
</script>
<script>
			AOS.init({
				duration: 1000
			});
    
		</script>
<script>
$(document).ready(function(){
  var $slider = $('.timeline-slider');

  $slider.slick({
    arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
     vertical: true,
    slidesToShow: 1,
    adaptiveHeight: true
  });

  $('.timeline-nav button').on('click', function(){
    var slideIndex = $(this).data('slide');
    $slider.slick('slickGoTo', slideIndex);

    $('.timeline-nav button').removeClass('active');
    $(this).addClass('active');
  });

  $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
    $('.timeline-nav button').removeClass('active');
    $('.timeline-nav button[data-slide="' + nextSlide + '"]').addClass('active');
  });
});
</script>

     
