'use strict';

// переход страници в активное состояние
(function () {
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var ENTER_KEYCODE = 13;

// функция выбирает все селектры из указаного блока, (данные хранятся в виде массива), и удаляет у них атребут
  var deleteAttributes = function (block, selector, atribute) {
    var elementsOfBlock = block.querySelectorAll(selector);

    for (var i = 0; i < elementsOfBlock.length; i++) {
      elementsOfBlock[i].removeAttribute(atribute);
    }
  };

// функция удаляет клас у селектора
  var removeClass = function (selector, classSelector) {
    document.querySelector(selector).classList.remove(classSelector);
  };

  var pageActivation = function () {
    removeClass('.map', 'map--faded');
    removeClass('.ad-form', 'ad-form--disabled');
    deleteAttributes(adForm, 'fieldset', 'disabled');
    deleteAttributes(mapFilters, 'select', 'disabled');
    deleteAttributes(mapFilters, 'fieldset', 'disabled');
  };

  window.mapPinMain.addEventListener('mouseup', function () {
    pageActivation();
  });

  window.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      pageActivation();
    }
  });
})();
