'use strict';

(function () {
  //// Модуль, который работает с формой объявления

  // Реализация заполнение поля адреса при клике по пину 1.функция вычесляет координаты элемента
  var getTagCoords = function (tag, tagStatus) {
    var box = tag.getBoundingClientRect();

    return {
      top: Math.floor(box.top + window.pageYOffset) + tagStatus,
      left: Math.floor(box.left + window.pageXOffset) + Math.floor(window.pins.PIN_MAIN_RADIUS / 2)
    };
  };

  // 2.функция присваевает значениее вычесленых координат инпуту через значение value
  window.recordCoordsInInput = function (tag, tagStatus, input) {
    var mapPinMainCoords = getTagCoords(tag, tagStatus);
    document.getElementById(input).value = mapPinMainCoords.top + ', ' + mapPinMainCoords.left;
  };

  window.recordCoordsInInput(window.mapPinMain, window.pins.PIN_MAIN_HEIGHT_INACTIVE, 'address');

  window.mapPinMain.addEventListener('mousemove', function () {
    window.recordCoordsInInput(window.mapPinMain, window.pins.PIN_MAIN_HEIGHT_ACTIVE, 'address');
  });

  // Программируем сценарий установки соответствия количества гостей с количеством комнат.
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

  // Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
  var priceHome = document.querySelector('#price');
  var typeHome = document.querySelector('#type');

  priceHome.addEventListener('focus', function () {
    if (typeHome.value === "bungalo") {
      priceHome.setAttribute('min', '0');
    }
    if (typeHome.value === "flat") {
      priceHome.setAttribute('min', '1000');
    }
    if (typeHome.value === "house") {
      priceHome.setAttribute('min', '5000');
    }
    if (typeHome.value === "palace") {
      priceHome.setAttribute('min', '10000');
    }
  });

  // реализация синхронизации поля  «Время заезда» и «Время выезда»
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');

  // в зависимости от значения поля selectfocus - функция изменяняет значение в поле selectchanging
  var synchronizationTime = function (selectfocus, selectchanging) {
    if (selectfocus.value === "12:00") {
      selectchanging.options[0].selected = true;
    }
    if (selectfocus.value === "13:00") {
      selectchanging.options[1].selected = true;
    }
    if (selectfocus.value === "14:00") {
      selectchanging.options[2].selected = true;
    }
  };

  timein.addEventListener('change', function () {
    synchronizationTime(timein, timeout);
  });

  timeout.addEventListener('change', function () {
    synchronizationTime(timeout, timein);
  });
})();
