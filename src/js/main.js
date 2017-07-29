$(document).ready(function(){

	/*==========================================
	=            Owl slider скрипты            =
	==========================================*/
	

  	/**
  	 *
  	 * Инициализация Owl Карусели
  	 *
  	 */
  	
  	// Слайдер главной страницы - 1
  	var owl = $('.index-carousel-1').owlCarousel({
		nav : true,
		navText: ['<button class="prev-button"></button>','<button class="next-button"></button>'],
		dots : true,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		autoplaySpeed : 1000,
		navSpeed : 1000,
		smartSpeed: 1000,
		dragEndSpeed: 1000,
		items : 1, 
		itemsDesktop : 1,
		itemsDesktopSmall : 1,
		itemsTablet: 1,
		itemsMobile : 1,
		URLhashListener : true,
		rewind : true

	});

  	/**
  	 *
  	 * Подставляем данные Страны города и Маленького изображения в блок .index-carousel-thumbnail
  	 *
  	 */
  	
	owl.on('changed.owl.carousel', function(event) {
		var current = event.item.index;
		var item = event.target;
		var activeOwlItem = $(item).find('.owl-item').eq(current);

		var activeItem = $(activeOwlItem).find('.item');

		var title = $(activeItem).data('title');
        var titleArr = title.split(".");

        var img = $(activeItem).data('thumb');
        $('.index-carousel-thumbnail img').attr('src', img);
        $('.index-carousel-thumbnail p').html(titleArr[0] + '.</br>' + titleArr[1]);
		
		

    /**
     *
     * Меняем в произвольном меню активный элемент
     *
     */
        

        // Находим элемент с хешем 
        var hash = $(activeItem).data('hash');
        // console.log(hash);
        // Убираем активный класс со всех li
        $('.carousel-block__nav').find('li').removeClass('active');
        // Ставим активный класс нашему
        $('.carousel-block__nav').find('a[href="#'+hash+'"]').parent().addClass('active');

    /**
     *
     * Меняем изображение справа вверху и слева внизу в верхнем слайдере
     *
     */
    	
    	// Замена thumb

    	function changingImagesAround() {
			$('.unslider-image--right, .unslider-image--left').removeClass('active');

	        function substituteImage() {
	        	var rightImage = $(activeItem).data('right-image');
	        	var leftImage = $(activeItem).data('left-image');

	        	$('.unslider-image--right img').attr('src', rightImage);
	        	$('.unslider-image--left img').attr('src', leftImage);

	        	$('.unslider-image--right, .unslider-image--left').addClass('active');
	        }

	        setTimeout(substituteImage, 500);
		}


		var $window = $(window);

		$(function() {
			var resizeEnd;
		    $(window).on('resize', function() {
		        clearTimeout(resizeEnd);
		        resizeEnd = setTimeout(function() {
		            $(window).trigger('resize-end');
		        }, 300);
		    });
		});

		$(window).on('resize-end', function() {
			if($window.width() > 992) {
		    	changingImagesAround();
		    	console.log('resized');
		    }
		});

		if($window.width() > 992) {
			changingImagesAround();
		}


	});


	/**
	 *
	 * Произвольная навигация над слайдером
	 *
	 */
	

	var itemsCount = $('.owl-carousel').find('.owl-item').length;

	for(var i = 0; i < itemsCount; i++) {
	  var currentOwlItem = $('.owl-carousel').find('.owl-item')[i];
	  var item = $(currentOwlItem).find('.item');
	  var title = $(item).data('title');
	  var hash = $(item).data('hash');

	  if(i == 0) {
	  	$('.carousel-block__nav').append('<li class="active"><a href="#'+ hash +'">'+ title +'</a></li>');
	  } else {
	  	$('.carousel-block__nav').append('<li><a href="#'+ hash +'">'+ title +'</a></li>');
	  }
	}


	// Слайдер главной страницы - 2

	var owl2 = $('.index-carousel-2').owlCarousel({
		nav : true,
		navText: ['<button class="prev-button"></button>','<button class="next-button"></button>'],
		dots : true,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		autoplaySpeed : 1000,
		navSpeed : 1000,
		smartSpeed: 1000,
		dragEndSpeed: 1000,
		items : 3, 
		itemsDesktop : 3,
		itemsDesktopSmall : 2,
		itemsTablet: 2,
		itemsMobile : 1,
		loop: true,
		responsiveClass:true,
		responsive : {
		    // // breakpoint from 0 up
		    // 0 : {
		    //     option1 : value,
		    //     option2 : value,
		    //     ...
		    // },
		    // // breakpoint from 480 up
		    // 480 : {
		    //     option1 : value,
		    //     option2 : value,
		    //     ...
		    // },
		    // // breakpoint from 768 up
		    // 768 : {
		    //     option1 : value,
		    //     option2 : value,
		    //     ...
		    // }
		    320: {
				items: 1
			},
			480: {
				items: 1
			},
			992: {
				items: 2
			},
			1280: {
				items: 3
			},
			1441: {
				items: 3
			}
		}
	});


	// Слайдер главной страницы - 3

	var owl3 = $('.index-carousel-3').owlCarousel({
		nav : true,
		navText: ['<button class="prev-button"></button>','<button class="next-button"></button>'],
		dots : false,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		autoplaySpeed : 1000,
		navSpeed : 1000,
		smartSpeed: 1000,
		dragEndSpeed: 1000,
		items : 3, 
		itemsDesktop : 3,
		itemsDesktopSmall : 2,
		itemsTablet: 2,
		itemsMobile : 1,
		loop: true,
		responsiveClass:true,
		responsive : {
			320: {
				items: 1
			},
			480: {
				items: 1
			},
			992: {
				items: 2
			},
			1280: {
				items: 3
			},
			1441: {
				items: 4
			}
		}
	});


	// Меняем в навигации слайдера главной страницы текст

	function changeCarouselBlockNavAText() {
		$('.carousel-block__nav').find('a').each(function() {
			var text = $(this).text();
			var arr = text.split('.');

			$(this).html(arr[0] + '</br>' + arr[1]);
		});
	}
	
	var $window = $(window);

	if($window.width() < 992) {
		changeCarouselBlockNavAText();
	}

	


	/*=====  End of Owl slider скрипты  ======*/

	
	
	/*=====  End of Google maps  ======*/
	

});


/*===================================
=            Google maps            =
===================================*/

var params;
// dom ready
jQuery(function () {
    
    //if (typeof google !== "undefined"){
    if (window.google && google.maps) {
        // Map script is already loaded
        // alert("Map script is already loaded. Initialising");
        initializeMap();
    } else {
        // alert("Lazy loading Google map...");
        lazyLoadGoogleMap();            
    }     

});

function initialize(params) { // 55.7095962,37.6204635   55.727436,37.5654832
    var marker1position = {lat: 55.7095962, lng: 37.6204635};
    var marker2position = {lat: 55.727436, lng: 37.5654832};
    var centerMap = {lat: 55.716753, lng: 37.578229};

    var map = new google.maps.Map(document.getElementById('map'), {
      center: centerMap,
      scrollwheel: false,
      zoom: 13
    });

    var image = {
      url: '../../images/svg/map-marker.svg',
      anchor: new google.maps.Point(40, 198)
    };

    var marker = new google.maps.Marker({
      position: marker1position,
      map: map,
      icon: image,
      title: 'United Kitchen - Метро Тульская, ул. Мытная, 74'
    });

    var marker2 = new google.maps.Marker({
    	position: marker2position,
    	map: map,
    	icon: image,
    	title: 'United Kitchen - Метро СПОРТИВНАЯ, ул. Усачева, 26'
    });


    var styles = {
        default: 'grey',
        
        grey: [
      {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#d3d3d3"
              }
          ]
      },
      {
          "featureType": "transit",
          "stylers": [
              {
                  "color": "#808080"
              },
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#b3b3b3"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#ffffff"
              },
              {
                  "weight": 1.8
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#d7d7d7"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#ebebeb"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#a7a7a7"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#efefef"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#696969"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#737373"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#d6d6d6"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {},
      {
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#dadada"
              }
          ]
      }
    ]};
  map.setOptions({styles: styles['grey']});
}

function lazyLoadGoogleMap() {
    jQuery.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAydK_YpqgniEP50UOXEYG87mMzYLWmd04&callback=initializeMap")
    .done(function (script, textStatus) {            
        //alert("Google map script loaded successfully");
    })
    .fail(function (jqxhr, settings, ex) {
        //alert("Could not load Google Map script: " + jqxhr);
    });
}
function initializeMap() {
    initialize(params);
}