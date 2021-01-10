/**
* Template Name: Company - v2.2.0
* Template URL: https://bootstrapmade.com/company-free-html-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 2;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Intro carousel
  var heroCarousel = $("#heroCarousel");
  var heroCarouselIndicators = $("#hero-carousel-indicators");
  heroCarousel.find(".carousel-inner").children(".carousel-item").each(function(index) {
    (index === 0) ?
    heroCarouselIndicators.append("<li data-target='#heroCarousel' data-slide-to='" + index + "' class='active'></li>"):
      heroCarouselIndicators.append("<li data-target='#heroCarousel' data-slide-to='" + index + "'></li>");
  });

  heroCarousel.on('slid.bs.carousel', function(e) {
    $(this).find('.carousel-content ').addClass('animate__animated animate__fadeInDown');
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);

document.getElementById("newsletter").addEventListener("click", function(event){
  event.preventDefault()
});

$.getJSON("csvjson.json", function(data){

   
  
  $('#search').keyup(function(){
    let searchField = $(this).val();
    if(searchField === '')  {
     $('#filter-records').html('');
     return;
    }
  });

  $("#search").keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });

  let regex = new RegExp(searchField, "i");
  let output = '<div class="row">';
  
  $.each(data, function(key, val){


  
    if ((val.address.search(regex) != -1) || (val.address.search(regex) != -1)) {
      output += "<h5 class = 'click' id=" + val.address.split(' ').join('+') + "," + val.car_park_no + ">" + val.address + '</h5>';
      output += '</div><div class="row">';
      
      
    }
  });

  

  output += '</div>';
  $('#filter-records').html(output);

  let carlink = document.getElementsByClassName("click");

  

  for(let i in carlink){

    carlink[i].addEventListener("click", function hello(){
      let map = document.getElementById("map");
      let chosencar = this.id;
      let addressorcarnumber = chosencar.split(',');
      let address = addressorcarnumber[0];
      let carnumber = addressorcarnumber[1];
      map.setAttribute("src", "https://www.google.com/maps/embed/v1/place?&q=" + address + "&key=AIzaSyDoLt5klGDsa7vVSthlwpMnAcp9D5nTKXU");
      
      let myHeaders = new Headers();
      myHeaders.append("Cookie", "__cfduid=d7632121edc0f177016ed0c3b58ed031c1609581596");

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        
      };
      
      
      
      fetch("https://api.data.gov.sg/v1/transport/carpark-availability" , requestOptions)
        .then(response => response.json())
        .then(result => {
          let count = 0;
          for (let i = 0; i < result.items[0].carpark_data.length; i++) {
           if(result.items[0].carpark_data[i].carpark_number == carnumber ){
             document.getElementById("carparkNo").innerHTML = "Carpark Number: " + result.items[0].carpark_data[i].carpark_number;
             document.getElementById("name").innerHTML = "Carpark Address: " + address.split('+').join(' ');
             
             
             if(result.items[0].carpark_data[i].carpark_info[0].total_lots == "0" && result.items[0].carpark_data[i].carpark_info[0].lots_available == "0"){
              document.getElementById("lots").innerHTML = "Total Lots: Parking Lot infomation not availble";
              document.getElementById("alots").innerHTML = "Lots Avalible: Parking Lot infomation not availble";

             }

             else
             {
              document.getElementById("lots").innerHTML = "Total Lots: " + result.items[0].carpark_data[i].carpark_info[0].total_lots;
              document.getElementById("alots").innerHTML = "Lots Available: " + result.items[0].carpark_data[i].carpark_info[0].lots_available;
             }
             count = 0;
             
              
              
             
             
            
            }
            else{
              count = count + 1;
              
              
              
              if(count == result.items[0].carpark_data.length){

                document.getElementById("carparkNo").innerHTML = "Carpark Number: Parking Lot infomation not availble";
                document.getElementById("name").innerHTML = "Carpark Address: Parking Lot infomation not availble";
                document.getElementById("lots").innerHTML = "Total Lots: Parking Lot infomation not availble";
                document.getElementById("alots").innerHTML = "Total Lots: Parking Lot infomation not availble";
                count = 0
                
              }
            }
          }
        })
      
    });
  }
});
