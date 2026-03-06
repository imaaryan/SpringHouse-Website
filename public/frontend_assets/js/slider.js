$('.testimonial-slider').slick({
    dots: true,
    infinite: true,
    loop:true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: "<i class='fa fa-chevron-left'></i>",
    nextArrow: "<i class='fa fa-chevron-right'></i>",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
            adaptiveHeight: true,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
            adaptiveHeight: true,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
});

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200)
    {
      $('header').addClass('sticky');
    }
    else
    {
      $('header').removeClass('sticky');
    }
  })
})