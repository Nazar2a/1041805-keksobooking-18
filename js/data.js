'use strict';

(function () {
//  модуль отправки и загрузки данных с сервера
  var DATA_SERVER = 'https://js.dump.academy/keksobooking/data';
  var FORM_SERVER = 'https://js.dump.academy/keksobooking';

  var mainElement = document.querySelector('main');

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var form = document.querySelector('.ad-form');

  // функция - действие при успешной загрузки данных
  var onSuccessload = function (data) {
    window.adsFromServer = data;
    console.log(window.adsFromServer);
  };

  // функция - действие при успешной отправки данных
  var onSuccessUpload = function (data) {
    console.log(data);
  };

  // функция - действие при успешной ошибке с откритием попапа
  var onError = function (message) {
    console.error(message);

    //  вставляем div class="error" (errorTemplate) в тело mainElement
    mainElement.appendChild(errorTemplate);

    var errorButton = document.querySelector('.error__button');

    // функция - обработчик. Закрывает попап после нажатия на кнопку ESC
    var onPopupEscPress = function(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closePopup();
      }
    };

    //  добавляем событие onPopupEscPress
    document.addEventListener('keydown', onPopupEscPress);

    // функция закрытия попапа
    var closePopup = function() {
      errorTemplate.remove();
      document.removeEventListener('keydown', onPopupEscPress);
    };

    // после клика на кнопку "Попробовать снова" и по клику на произвольную область экрана  - удаляем созданный нами div и обработчик события onPopupEscPress
    document.addEventListener('click', function () {
      closePopup();
    });
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

  form.addEventListener('submit', function (evt) {
    upload(new FormData(form), onSuccessUpload, onError);
    evt.preventDefault();
  });

})();
