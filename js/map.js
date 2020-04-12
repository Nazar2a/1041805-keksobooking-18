'use strict';

(function () {
  //// Модуль переход страници в активное состояние
  window.adForm = document.querySelector('.ad-form');
  window.mapFilters = document.querySelector('.map__filters');
  window.ENTER_KEYCODE = 32;

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

  var onDrawingCardKeydown = function(evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      pageActivation();
      }
  };

  var onPageActivationMouseup = function(evt) {
    pageActivation();
  };

  window.mapPinMain.addEventListener('mouseup', onPageActivationMouseup);
  window.mapPinMain.addEventListener('keydown', onDrawingCardKeydown);
})();
