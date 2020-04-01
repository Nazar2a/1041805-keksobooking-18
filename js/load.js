'use strict';
// модуль загрузки данных с сервера и вывод статуса загрузки
(function () {
  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 1000; // 1s

    xhr.open('GET', url);
    xhr.send();
  }
})();


// Модуль выводит сообщение (попапа) об ошибке загрузки данных
(function () {
  var mainElement = document.querySelector('main');

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  // функция открития попапа
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

    // после клика на кнопку "Попробовать снова" - удаляем созданный нами div и обработчик события onPopupEscPress
    errorButton.addEventListener('click', function () {
      closePopup();
    });
  };

  var onSuccess = function (data) {
    window.adsFromServer = data;
    console.log(window.adsFromServer);
  };

  window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
})();
