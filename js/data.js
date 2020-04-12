'use strict';

(function () {
  ////  модуль отправки и загрузки данных с сервера
  var DATA_SERVER = 'https://js.dump.academy/keksobooking/data';
  var FORM_SERVER = 'https://js.dump.academy/keksobooking';
  var ESC_KEYCODE = 27;

  var mainElement = document.querySelector('main');

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var errorSuccess = document.querySelector('#success')
    .content
    .querySelector('.success');

  var adForm = document.querySelector('.ad-form');

  // функция создает попап с возможостю закрытия его по клику на произвольную обдасть и ESC
  var creatingPopup = function (template) {
    mainElement.appendChild(template);

    var onPopupCloseKeydown = function(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        template.remove();
      }
    };

    var onPopupCloseClick = function(evt) {
      template.remove();
    };

    // после нажатия на кнопку ESC  - удаляем созданный нами div
    document.addEventListener('keydown', onPopupCloseKeydown, {once: true});

    // после клика на область div - удаляем созданный нами div
    template.addEventListener('click', onPopupCloseClick);
  };

  // функция - действие при успешной загрузки данных
  var onSuccessload = function (data) {
    window.adsFromServer = data;
  };

  // функция - действие при успешной отправки данных
  var onSuccessUpload = function () {
    creatingPopup(errorSuccess);
    adForm.reset();              // сбрасываем форму adForm
    window.mapFilters.reset();   // сбрасываем форму mapFilters
    window.deletePin();          // удаляем все метки
    document.querySelector('.map__card').remove();   // удаляем карточку объявления
    window.mapPinMain.style.top = 375 + 'px';   // главная метка возвращается в исходное положение
    window.mapPinMain.style.left = 570 + 'px';
    window.recordCoordsInInput(window.mapPinMain, window.pins.PIN_MAIN_HEIGHT_ACTIVE, 'address');  //  значение поля адреса корректируется соответственно положению метки;
  };

  // функция - действие при ошибке с откритием попапа
  var onError = function (message) {
    console.error(message);
    creatingPopup(errorTemplate);
  };

  // функция загрузки данных с сервера
  var load = function (onSuccessload, onError) {
    window.sendXhrRequest('GET', DATA_SERVER, onSuccessload, onError);
  };

  // функция отправки данных на сервер
  var upload = function (data, onSuccessUpload, onError) {
    window.sendXhrRequest('POST', FORM_SERVER, onSuccessUpload, onError, data);
  };

  load(onSuccessload, onError);

  adForm.addEventListener('submit', function (evt) {
    upload(new FormData(adForm), onSuccessUpload, onError);
    evt.preventDefault();
  });
})();
