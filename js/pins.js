'use strict';

(function () {
  // Модуль создает метки на карте

  var ADS_QUANTILY = 5;
  var MARKWIDTH = 50;
  var MARKHEIGHT = 70;

  window.similarListElement = document.querySelector('.map__pins');

  var similarAddTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

// функция создает клон метки из шаблона template. Задает стиль новой метки (даные берутся из массива)
  var renderMark = function (parameterMark) {
    var markElement = similarAddTemplate.cloneNode(true);
    markElement.style = 'left: ' + (parameterMark.location.x + (MARKWIDTH / 2)) + 'px; top: ' + (parameterMark.location.y + MARKHEIGHT) + 'px;';
    markElement.querySelector('img').src = parameterMark.author.avatar;
    markElement.querySelector('img').alt = parameterMark.offer.description;

    return markElement;
  };

// функция добавляет созданые выше метки в DOM дерево
  var drawingElements = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderMark(data[i]));
    }
    window.similarListElement.appendChild(fragment); // вставка "fragment"  в часть кода "window.similarListElement"
  };

//// добавление карточки объявления
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var mapFiltersContainer = document.querySelector('.map__filters-container');

  // функция отрисовует карту объявления
  var renderCard = function (parameter) {
    var cardkElement = cardTemplate.cloneNode(true);
    // внести изменения данных
    cardkElement.querySelector('.popup__title').textContent = parameter.offer.title;
    cardkElement.querySelector('.popup__text--price').textContent = parameter.offer.price + '₽/ночь';
    if (parameter.offer.type === 'bungalo') {
      cardkElement.querySelector('.popup__type').textContent = 'Бунгало';
    } else if (parameter.offer.type === 'flat') {
      cardkElement.querySelector('.popup__type').textContent = 'Квартира';
    } else if (parameter.offer.type === 'house') {
      cardkElement.querySelector('.popup__type').textContent = 'Дом';
    } else if (parameter.offer.type === 'palace') {
      cardkElement.querySelector('.popup__type').textContent = 'Дворец';
    };
    cardkElement.querySelector('.popup__text--capacity').textContent = parameter.offer.rooms + ' комнаты для ' + parameter.offer.guests + ' гостей';
    cardkElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + parameter.offer.checkin + ', выезд до ' + parameter.offer.checkout;
    cardkElement.querySelector('.popup__description').textContent = parameter.offer.description;

    // вывод удобств. есл удобства нету у карточки - он удаляется с шаблона
    for (var i = 0; i < FEATURES.length; i++) {
      if (parameter.offer.features.includes(FEATURES[i])) {
      } else {
        cardkElement.querySelector('.popup__feature--' + FEATURES[i]).remove();
      };
    }

    // на основе шаблона добавляем данные (фото) а потом удоляем шаблон, он стоит первым
    for (var i = 0; i < parameter.offer.photos.length; i++) {
      var photoElement = cardkElement.querySelector('.popup__photos img').cloneNode(true);
      photoElement.src = parameter.offer.photos[i];
      cardkElement.querySelector('.popup__photos img').after(photoElement);
    }
    cardkElement.querySelector('.popup__photos img').remove();

    cardkElement.querySelector('.popup__avatar').src = parameter.author.avatar;
    return cardkElement;
  };

  //  функция рендеринга необходимого количества карточек и добавления их на страницу
  var drawingElementCard = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 1; i++) {      // for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderCard(data[i]));
    }
    mapFiltersContainer.before(fragment); // вставка "fragment"  в часть кода
  };

  setTimeout(() => drawingElementCard(window.adsFromServer), 1000);
////..

  // функция удаляет все метки на карте, кроме первого
  var deletePin = function () {
    var mapPin = document.querySelectorAll('.map__pins .map__pin');  // выбор всех меток
    for (var i = 1; i < mapPin.length; i++) {
      mapPin[i].remove();         // удаление всех меток, кроме первой
    }
  };

  // выполнение функции рендеринга меток через 10с
  var adsFromServerCopy = [];
  setTimeout(
    () => {
    drawingElements(window.adsFromServer); //  рендеринга меток
    adsFromServerCopy = window.adsFromServer.slice(); // клонирование данных с сервера
    changePrice(adsFromServerCopy);
    },
    1000
  );

// модуль сортировки меток
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('#housing-features > input');
  var fieldsetHousingFeatures = document.querySelector('#housing-features');
  var mapFeatures = document.querySelector('#map__features');

  // функция измняющая цену в данных на middle, low или high. Для того чтобы при фильтрации можно было сравнить со значением housingPrice.value
  var changePrice = function (ads) {
    for (var i = 0; i < ads.length; i++) {
      if (ads[i].offer.price < 10000) {
        ads[i].offer.price = 'middle';
      } else if (ads[i].offer.price <= 50000) {
        ads[i].offer.price = 'low';
      } else if (ads[i].offer.price > 50000) {
        ads[i].offer.price = 'high';
      };
    }
  };

  // функция сортировки
  var sortingDate = function () {
    adsFromServerCopy = adsFromServerCopy.
      filter(function (adFromServer) {
        return adFromServer.offer.type === housingType.value || housingType.value == "any";
    }).
      filter(function (adFromServer) {
        return adFromServer.offer.rooms == housingRooms.value || housingRooms.value == "any";
    }).
      filter(function (adFromServer) {
        return adFromServer.offer.guests == housingGuests.value || housingGuests.value == "any";
    }).
      filter(function (adFromServer) {
        return adFromServer.offer.price === housingPrice.value || housingPrice.value == "any";
    });
     // сортировки по функциям
    for (var i = 0; i < housingFeatures.length; i++) {       // идем по всему объекту
      if (housingFeatures[i].checked === true) {             // проверяем, есть ли среди них объекты с нажатой кнопкой
        adsFromServerCopy = adsFromServerCopy.  // сортируем основной массив с условием
          filter(function (adFromServer) {
            return adFromServer.offer.features.includes(housingFeatures[i].value);
        });
      };
    }
  };

  var sorting = function () {
    adsFromServerCopy = window.adsFromServer.slice(); // клонирование данных с сервера
    deletePin(); // удаление всех меток кроме первой
    sortingDate(); // сортировка
    drawingElements(adsFromServerCopy); // отрисовка новый меток
  };

  housingType.addEventListener('change', function () {
    sorting();
  });
  housingPrice.addEventListener('change', function () {
    sorting();
  });
  housingRooms.addEventListener('change', function () {
    sorting();
  });
  housingGuests.addEventListener('change', function () {
    sorting();
  });
  fieldsetHousingFeatures.addEventListener('change', function () {
    sorting();
  });
})();
