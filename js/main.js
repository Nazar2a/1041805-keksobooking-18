var TITLES = ['Квартира 1', 'Квартира 2', 'Квартира 3', 'Квартира 4', 'Квартира 5', 'Квартира 6', 'Квартира 7', 'Квартира 8'];

var ADSRESS = '600, 350';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];

var CHECKINS = ['12:00', '13:00', '14:00'];

var CHECKOUTS = CHECKINS;

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var DESCRIPTION = ['описание дома', 'описание второго дома'];

var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var ADS_QUANTILY = 8;

var ads = [];

var random = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randomArrayElement = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var creationArrays = function (N) {
  for (var i = 0; i < N; i++) {
    ads.unshift({
    author: {
    avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },

    offer: {
      title: randomArrayElement(TITLES),
      address: ADSRESS,
      price: random(400, 2000),
      type: randomArrayElement(TYPES),
      rooms: random(1, 4),
      guests: random(1, 10),
      checkin: randomArrayElement(CHECKINS),
      checkout: randomArrayElement(CHECKOUTS),
      features: randomArrayElement(FEATURES),
      description: randomArrayElement(DESCRIPTION),
      photos: randomArrayElement(PHOTOS)
    },

    location: {
      x: random(130, 630),
      y: random(130, 630)
    }
      });
  }
}

creationArrays(ADS_QUANTILY);

document.querySelector('.map').classList.remove('map--faded');

var similarListElement = document.querySelector('.map__pins');

var similarAddTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');


var render = function (parameter) {
  var Element = similarAddTemplate.cloneNode(true);
  Element.style = 'left: ' + parameter.location.x + 'px; top: ' + parameter.location.y + 'px;';
  Element.querySelector('img').src = parameter.author.avatar;
  Element.querySelector('img').alt = parameter.offer.description;

  return Element;
};

var drawingElement = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(render(array[i]));
  }
  similarListElement.appendChild(fragment);
};

drawingElement(ads);
