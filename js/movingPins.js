'use strict';

(function () {
  //// модуль перемещает pin--main по карте
  window.mapPinMain = document.querySelector('.map__pin--main');

  window.pins = {
    PIN_MAIN_RADIUS: 65,
    PIN_MAIN_HEIGHT_ACTIVE: 87,
    PIN_MAIN_HEIGHT_INACTIVE: 65
  };

  var COORDINATES_LIMITS = {
    minX: 0,
    maxX: window.similarListElement.offsetWidth - window.pins.PIN_MAIN_RADIUS,
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
