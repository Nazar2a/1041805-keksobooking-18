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


// Модуль выводит сообщение об ошибке загрузки данных
(function () {
  var mainElement = document.querySelector('main');

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var onError = function (message) {
    console.error(message);

    //  вставляем div class="error" (errorTemplate) в тело mainElement
    mainElement.appendChild(errorTemplate);


    var errorButton = document.querySelector('.error__button');

    // после клика на кнопку "Попробовать снова" - удаляем созданный нами div
    errorButton.addEventListener('click', function () {
      errorTemplate.remove();
    });
  };

  var onSuccess = function (data) {
    window.adsFromServer = data;
    console.log(window.adsFromServer);
  };

  window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
})();
