$(document).ready(function () { // начало document.ready

    function dynScrollmnu() {
        var scrollPos = $(document).scrollTop();
        $('.menu-link').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos &&
                refElement.position().top + refElement.height() > scrollPos) {
                $('.menu-link').removeClass("menu-link--active");
                currLink.addClass("menu-link--active");
            }
            else {
                currLink.removeClass("menu-link--active");

            }
        });
    }
    dynScrollmnu();

    $(window).scroll(function () {
        event.preventDefault();
        dynScrollmnu();
    });

    function checkScroll() {
        if ($(this).scrollTop() > 100) {
            $('.header__top-line').addClass("fixed-mnu");
        } else {
            $('.header__top-line').removeClass("fixed-mnu");
        }
    }
    checkScroll();
    $(window).scroll(function () {
        checkScroll();
    });

    $('.mnu-item a[href*="#"], .header__logo a').click(function (e) {
        e.preventDefault();
        var id = $(this).attr('href'),
            position = $(id).offset().top + 1;
        $('body,html').stop(true).animate({ scrollTop: position }, 1000);
    });

    $('.hidden-list-ul a[href*="#"]').click(function (e) {
        e.preventDefault();
        var id = $(this).attr('href'),
            position = $(id).offset().top + 1;
        $('body,html').stop(true).animate({ scrollTop: position }, 1000);
    });

    // var all = $('.mnu-item a') // клас стиля ссылки
    // all.click(function () {
    //     all.removeClass('menu-link--active')   // клас активной ссылки
    //     $(this).addClass('menu-link--active')
    // })

    $('.mnu-item-trigger').click(function (e) {
        e.preventDefault();
        $('.mnu-list-dd').stop(true).slideToggle();
    });


    $('.j_burger').click(function (e) {
        e.preventDefault();
        $(this).toggleClass("is-active");
        $('.header__mnu-hidden').stop(true).toggleClass('trx');

    })

    $('.ply-img').click(function (e) {
        e.preventDefault();
        var videoId = $(this).attr("data-video")
        var videoSrcCode = 'https://www.youtube.com/embed/';
        var video = $('#video'),
            src = video.attr('src');
        video.attr('src', videoSrcCode + videoId + '?autoplay=1');
        $('.bPopup-tube-wrapper')
            .bPopup({
                closeClass: 'close-popup',
                onClose: function () {
                    video.attr('src', videoSrcCode + videoId);
                }
            });
    });

    $('.scroll-down').click(function (e) {
        e.preventDefault();
        var secIndx = $(this).attr("data-scrl");
        $('html, body').animate({
            scrollTop: $(secIndx).offset().top + 1
        }, 1000);
    });


    var s = $('.prod-dscr p'), heightOfPs = 0, arr = [];
    s.each(function (indx, element) {
        arr[indx] = $(this).height()
        heightOfPs += arr[indx];
    });

    var sh = $('.prod-dscr').height();

    $('.read-more').click(function (e) {
        e.preventDefault();
        $(this).parent().parent().addClass('read-more-wrap--open');
        $(this).addClass('dn');
        $('.hide-more').removeClass('dn');
        $('.prod-dscr').css('height', heightOfPs);
    });

    $('.hide-more').click(function (e) {
        e.preventDefault();
        $(this).parent().parent().removeClass('read-more-wrap--open');
        $(this).addClass('dn');
        $('.read-more').removeClass('dn');
        $('.prod-dscr').css('height', sh);
    });



    $('.j_input, .j_inputt').focus(function () {
        $(this).parents('.form-group').addClass('focused');
    });

    $('.j_input, .j_inputt').blur(function () {
        var inputValue = $(this).val();
        if (inputValue == "") {
            $(this).removeClass('filled');
            $(this).parents('.form-group').removeClass('focused');
        } else {
            $(this).addClass('filled');
        }
    });


    $('.slider-container').bxSlider();
});
// google map
function initialize() {
    //получаем наш div куда будем карту добавлять
    var mapCanvas = document.getElementById('map_canvas');
    // задаем параметры карты
    var mapOptions = {
        //Это центр куда спозиционируется наша карта при загрузке
        center: new google.maps.LatLng(50.4501, 30.5234),
        //увеличение под которым будет карта, от 0 до 18
        // 0 - минимальное увеличение - карта мира
        // 18 - максимально детальный масштаб
        zoom: 18,
        scrollwheel: false,
        disableDefaultUI: true,
        // styles: [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}]
        //Тип карты - обычная дорожная карта
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    //Инициализируем карту
    var map = new google.maps.Map(mapCanvas, mapOptions);

    //Объявляем массив с нашими местами и маркерами
    var markers = [],
        myPlaces = [];
    //Добавляем места в массив
    myPlaces.push(new Place('ул. Зыряновская, 53, офис 107', 50.4501, 30.5234, 'Новосибирск'));
    //Теперь добавим маркеры для каждого места
    for (var i = 0, n = myPlaces.length; i < n; i++) {

        var companyImage = new google.maps.MarkerImage('img/map.png',
            new google.maps.Size(145, 93),
            new google.maps.Point(0, 0),
            new google.maps.Point(0, 45)
        );

        var marker = new google.maps.Marker({
            //расположение на карте
            position: new google.maps.LatLng(myPlaces[i].latitude, myPlaces[i].longitude),
            map: map,
            icon: companyImage,
            //То что мы увидим при наведении мышкой на маркер
            title: myPlaces[i].name
        });
        //Добавим попап, который будет появляться при клике на маркер
        var infowindow = new google.maps.InfoWindow({
            content: '<h5>' + myPlaces[i].name + '</h5><br/>' + myPlaces[i].description
        });
        //привязываем попап к маркеру на карте
        makeInfoWindowEvent(map, infowindow, marker);
        markers.push(marker);
    }
}

function makeInfoWindowEvent(map, infowindow, marker) {
    //Привязываем событие КЛИК к маркеру
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
}
//Это класс для удобного манипулирования местами
function Place(name, latitude, longitude, description) {
    this.name = name; // название
    this.latitude = latitude; // широта
    this.longitude = longitude; // долгота
    this.description = description; // описание места
}
//Когда документ загружен полностью - запускаем инициализацию карты.
google.maps.event.addDomListener(window, 'load', initialize);