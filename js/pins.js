'use strict';

(function () {
  // Модуль создает метки на карте

  var TITLES = [
    'Квартира 1',
    'Квартира 2',
    'Квартира 3',
    'Квартира 4',
    'Квартира 5',
    'Квартира 6',
    'Квартира 7',
    'Квартира 8'
  ];
  var ADSRESS = '600, 350';
  var TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = CHECKINS;
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var DESCRIPTION = ['описание дома', 'описание второго дома'];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var ADS_QUANTILY = 8;
  var MARKWIDTH = 50;
  var MARKHEIGHT = 70;

  var randomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var randomArrayElement = function (items) {
    return items[Math.floor(Math.random() * items.length)];
  };

  var similarListElement = document.querySelector('.map__pins');

  var creatingRandomLengthArray = function (arr) {
    var array = [];
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    for (var g = 0; g <= Math.floor(Math.random() * arr.length); g++) {
      array.push(arr[g]);
    }
    return array;
  };

  var creationArrays = function (amountElements) {
    var object = [];
    for (var i = 0; i < amountElements; i++) {
      object.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },

        offer: {
          title: randomArrayElement(TITLES),
          address: ADSRESS,
          price: randomNumber(400, 2000),
          type: randomArrayElement(TYPES),
          rooms: randomNumber(1, 4),
          guests: randomNumber(1, 10),
          checkin: randomArrayElement(CHECKINS),
          checkout: randomArrayElement(CHECKOUTS),
          features: creatingRandomLengthArray(FEATURES),
          description: randomArrayElement(DESCRIPTION),
          photos: creatingRandomLengthArray(PHOTOS)
        },

        location: {
          x: randomNumber(similarListElement.offsetLeft, similarListElement.offsetWidth),
          y: randomNumber(130, 630)
        }
      });
    }

    return object;
  };

  var ads = creationArrays(ADS_QUANTILY);

  var similarAddTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderMark = function (parameterMark) {
    var markElement = similarAddTemplate.cloneNode(true);
    markElement.style = 'left: ' + (parameterMark.location.x + (MARKWIDTH / 2)) + 'px; top: ' + (parameterMark.location.y + MARKHEIGHT) + 'px;';
    markElement.querySelector('img').src = parameterMark.author.avatar;
    markElement.querySelector('img').alt = parameterMark.offer.description;

    return markElement;
  };

  var drawingElements = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderMark(data[i]));
    }
    similarListElement.appendChild(fragment);
  };

  drawingElements(ads);

  // модуль перемещает pin--main по карте

  window.mapPinMain = document.querySelector('.map__pin--main');

  window.pins = {
    PIN_MAIN_RADIUS: 65,
    PIN_MAIN_HEIGHT_ACTIVE: 87,
    PIN_MAIN_HEIGHT_INACTIVE: 65
  };

  var COORDINATES_LIMITS = {
    minX: 0,
    maxX: similarListElement.offsetWidth - window.pins.PIN_MAIN_RADIUS,
    minY: 130 - window.pins.PIN_MAIN_HEIGHT_ACTIVE,
    maxY: 630 - window.pins.PIN_MAIN_HEIGHT_ACTIVE
  };

  window.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.mapPinMain.style.top = (window.mapPinMain.offsetTop - shift.y) + 'px';
      window.mapPinMain.style.left = (window.mapPinMain.offsetLeft - shift.x) + 'px';

      if ((window.mapPinMain.offsetTop - shift.y) > COORDINATES_LIMITS.maxY) {
        window.mapPinMain.style.top = COORDINATES_LIMITS.maxY + 'px';
      }

      if ((window.mapPinMain.offsetTop - shift.y) < COORDINATES_LIMITS.minY) {
        window.mapPinMain.style.top = COORDINATES_LIMITS.minY + 'px';
      }

      if ((window.mapPinMain.offsetLeft - shift.x) > COORDINATES_LIMITS.maxX) {
        window.mapPinMain.style.left = COORDINATES_LIMITS.maxX + 'px';
      }

      if ((window.mapPinMain.offsetLeft - shift.x) < COORDINATES_LIMITS.minX) {
        window.mapPinMain.style.left = COORDINATES_LIMITS.minX + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();