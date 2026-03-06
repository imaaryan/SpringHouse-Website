$('.testimonial-slider').slick({
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: "<i class='a-left control-c prev slick-prev fa-solid fa-chevron-left'></i>",
    nextArrow: "<i class='a-right control-c next slick-next fa-solid fa-chevron-right'></i>",
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
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
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