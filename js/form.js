'use strict';

// Модуль, который работает с формой объявления
(function () {

  // Реализация заполнение поля адреса при клике по пину
  var tagCoords = function (tag, tagStatus) {
    var box = tag.getBoundingClientRect();

    return {
      top: (box.top + window.pageYOffset) + tagStatus,
      left: (box.left + window.pageXOffset) + (Math.floor(window.pins.PIN_MAIN_RADIUS / 2))
    };
  };

  var recordCoordsInInput = function (tag, tagStatus, input) {
    var mapPinMainCoords = tagCoords(tag, tagStatus);
    document.getElementById(input).value = mapPinMainCoords.top + ', ' + mapPinMainCoords.left;
  };

  recordCoordsInInput(window.mapPinMain, window.pins.PIN_MAIN_HEIGHT_INACTIVE, 'address');

  window.mapPinMain.addEventListener('mousemove', function () {
    recordCoordsInInput(window.mapPinMain, window.pins.PIN_MAIN_HEIGHT_ACTIVE, 'address');
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
})();
