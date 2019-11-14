'use strict';

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

var removeClass = function (selector, classSelector) {
  document.querySelector(selector).classList.remove(classSelector);
};

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

/*
  Задание 4. Обработка событий
*/

var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var PIN_MAIN_RADIUS = 65;
var PIN_MAIN_HEIGHT_INACTIVE = 65;
var PIN_MAIN_HEIGHT_ACTIVE = 87;
var ENTER_KEYCODE = 13;

/*
  Реализация заполнение поля адреса
*/

var tagCoords = function (tag, tagStatus) {
  var box = tag.getBoundingClientRect();

  return {
    top: (box.top + window.pageYOffset) + tagStatus,
    left: (box.left + window.pageXOffset) + (Math.floor(PIN_MAIN_RADIUS / 2))
  };
};

var recordCoordsInInput = function (tag, tagStatus, input) {
  var mapPinMainCoords = tagCoords(tag, tagStatus);
  document.getElementById(input).value = mapPinMainCoords.top + ', ' + mapPinMainCoords.left;
};

recordCoordsInInput(mapPinMain, PIN_MAIN_HEIGHT_INACTIVE, 'address');

/*
  Реализация активации страници при нажатие на метку с клавиатуры и мышкой
*/

var deleteAttributes = function (block, selector, atribute) {
  var elementsOfBlock = block.querySelectorAll(selector);

  for (var i = 0; i < elementsOfBlock.length; i++) {
    elementsOfBlock[i].removeAttribute(atribute);
  }
};

var pageActivation = function () {
  removeClass('.map', 'map--faded');
  removeClass('.ad-form', 'ad-form--disabled');
  deleteAttributes(adForm, 'fieldset', 'disabled');
  deleteAttributes(mapFilters, 'select', 'disabled');
  deleteAttributes(mapFilters, 'fieldset', 'disabled');
  recordCoordsInInput(mapPinMain, PIN_MAIN_HEIGHT_ACTIVE, 'address');
};

mapPinMain.addEventListener('mousedown', function () {
  pageActivation();
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    pageActivation();
  }
});

/*
  Программируем сценарий установки соответствия количества гостей с количеством комнат.
*/

var roomNumbers = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

capacity.addEventListener('focus', function () {
  for (var i = 0; i < capacity.options.length; i++) {
    capacity.options[i].removeAttribute('disabled', 'disabled');
  }

  var roomNumber = Number(roomNumbers.value);
  if (roomNumber === 1) {
    capacity.options[0].setAttribute('disabled', 'disabled');
    capacity.options[1].setAttribute('disabled', 'disabled');
    capacity.options[3].setAttribute('disabled', 'disabled');
  }
  if (roomNumber === 2) {
    capacity.options[0].setAttribute('disabled', 'disabled');
    capacity.options[3].setAttribute('disabled', 'disabled');
  }
  if (roomNumber === 3) {
    capacity.options[3].setAttribute('disabled', 'disabled');
  }
  if (roomNumber === 100) {
    capacity.options[0].setAttribute('disabled', 'disabled');
    capacity.options[1].setAttribute('disabled', 'disabled');
    capacity.options[2].setAttribute('disabled', 'disabled');
  }
});
