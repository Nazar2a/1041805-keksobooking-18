'use strict';

(function () {
  //// Модуль создает метки на карте
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

  // функция удаляет все метки на карте, кроме первого
  window.deletePin = function () {
    var mapPin = document.querySelectorAll('.map__pins .map__pin');  // выбор всех меток
    for (var i = 1; i < mapPin.length; i++) {
      mapPin[i].remove();         // удаление всех меток, кроме первой
    }
  };

  // выполнение функции рендеринга меток через 10с
  setTimeout(function() {
    window.adsFromServerCopy = window.adsFromServer.slice(); // клонирование данных с сервера
    drawingElements(adsFromServerCopy); //  рендеринга меток
    changePrice(adsFromServerCopy);
  }, 1000);

// модуль сортировки меток
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('#housing-features > input');
  var fieldsetHousingFeatures = document.querySelector('#housing-features');
  var mapFeatures = document.querySelector('#map__features');

  // функция добавляет цену (middle, low или high) в свойство priceType . Для того чтобы при фильтрации можно было сравнить со значением housingPrice.value
  var changePrice = function (ads) {
    for (var i = 0; i < ads.length; i++) {
      if (ads[i].offer.price <= 10000) {
        ads[i].offer.priceType = 'low';
      } else if (ads[i].offer.price <= 50000) {
        ads[i].offer.priceType = 'middle';
      } else if (ads[i].offer.price > 50000) {
        ads[i].offer.priceType = 'high';
      };
    }
  };

  // функция сортировки
  var sortingDate = function () {
    adsFromServerCopy = adsFromServerCopy.
      filter(function (adFromServer) {
        return adFromServer.offer.type === housingType.value || housingType.value === "any";
    }).
      filter(function (adFromServer) {
        return adFromServer.offer.rooms === housingRooms.value || housingRooms.value === "any";
    }).
      filter(function (adFromServer) {
        return adFromServer.offer.guests === housingGuests.value || housingGuests.value === "any";
    }).
      filter(function (adFromServer) {
        return adFromServer.offer.priceType === housingPrice.value || housingPrice.value === "any";
    });
     // сортировки по функциям
    for (var i = 0; i < housingFeatures.length; i++) {       // идем по всему объекту
      if (housingFeatures[i].checked) {             // проверяем, есть ли среди них объекты с нажатой кнопкой
        adsFromServerCopy = adsFromServerCopy.  // сортируем основной массив с условием
          filter(function (adFromServer) {
            return adFromServer.offer.features.includes(housingFeatures[i].value);
        });
      };
    }
  };

  var onSortingPinChange = function () {
    window.adsFromServerCopy = window.adsFromServer.slice(); // клонирование данных с сервера
    deletePin(); // удаление всех меток кроме первой
    sortingDate(); // сортировка
    drawingElements(adsFromServerCopy); // отрисовка новый меток
  };

  housingType.addEventListener('change', onSortingPinChange);
  housingPrice.addEventListener('change', onSortingPinChange);
  housingRooms.addEventListener('change', onSortingPinChange);
  housingGuests.addEventListener('change', onSortingPinChange);
  fieldsetHousingFeatures.addEventListener('change', onSortingPinChange);
})();
