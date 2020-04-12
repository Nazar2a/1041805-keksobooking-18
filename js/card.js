'use strict';

(function () {
  ////  Модуль добавление карточки объявления
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var Features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var mapFiltersContainer = document.querySelector('.map__filters-container');

  // функция отрисовует карту объявления
  var creationCard = function (parameter) {
    var cardkElement = cardTemplate.cloneNode(true);
    // внести изменения данных
    cardkElement.querySelector('.popup__title').textContent = parameter.offer.title;
    cardkElement.querySelector('.popup__text--price').textContent = parameter.offer.price + '₽/ночь';
    if (parameter.offer.type === 'bungalo') {
      cardkElement.querySelector('.popup__type').textContent = 'Бунгало';
    } else if (parameter.offer.type === 'flat') {
      cardkElement.querySelector('.popup__type').textContent = 'Квартира';
    } else if (parameter.offer.type === 'house') {
      cardkElement.querySelector('.popup__type').textContent = 'Дом';
    } else if (parameter.offer.type === 'palace') {
      cardkElement.querySelector('.popup__type').textContent = 'Дворец';
    };
    cardkElement.querySelector('.popup__text--capacity').textContent = parameter.offer.rooms + ' комнаты для ' + parameter.offer.guests + ' гостей';
    cardkElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + parameter.offer.checkin + ', выезд до ' + parameter.offer.checkout;
    cardkElement.querySelector('.popup__description').textContent = parameter.offer.description;

    // вывод удобств. есл удобства нету у карточки - он удаляется с шаблона
    for (var i = 0; i < Features.length; i++) {
      if (parameter.offer.features.includes(Features[i])) {
      } else {
        cardkElement.querySelector('.popup__feature--' + Features[i]).remove();
      };
    }

    // на основе шаблона добавляем данные (фото) а потом удоляем шаблон, он стоит первым
    for (var i = 0; i < parameter.offer.photos.length; i++) {
      var photoElement = cardkElement.querySelector('.popup__photos img').cloneNode(true);
      photoElement.src = parameter.offer.photos[i];
      cardkElement.querySelector('.popup__photos img').after(photoElement);
    }
    cardkElement.querySelector('.popup__photos img').remove();

    cardkElement.querySelector('.popup__avatar').src = parameter.author.avatar;
    return cardkElement;
  };

  //  функция рендеринга карточки и добавления ее на страницу
  var drawingElementCard = function (data) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(creationCard(data[0]));
    mapFiltersContainer.before(fragment); // вставка "fragment"  в часть кода
  };

  setTimeout(function() {
      drawingElementCard(window.adsFromServer);

      var cardButton = document.querySelector('.popup__close');
      cardButton.addEventListener('click', function () {
        document.querySelector('.map__card').remove();
      });
  }, 1000);

  // отрисовка карточек по их клику
  var drawingCard = function (evt) {
    // условие ослеживание. Узнаем по какому элементу мы нажали, через класс дочерного элемента. Если по картинке или кнопке - true
    if (evt.path[0].className === 'map__pin' || evt.path[1].className === 'map__pin') {

      // если есть карточка на странице - удаляем
      if (document.querySelector('.map__card')) {
        document.querySelector('.map__card').remove();
      };

      // нам нужно достать описание карточки (descriptionPin), в зависимости от того, куда мы мышкой нажали, на картинку или кнопку. Если есть элемент с тегом 'img' - значит мы нажали на кнопку. Если нет - на картинку
      var descriptionPin = evt.srcElement.querySelector('img') ? evt.srcElement.querySelector('img').alt : evt.srcElement.alt;

      // ищем в масиве похожую метку
      var pinClick = window.adsFromServer.filter(function (adFromServer) {
        return adFromServer.offer.description === descriptionPin;
      });

      // отрисовка карточки
      drawingElementCard(pinClick);

      // закрытие карточки по нажатию кнопки popup__close
      var cardButton = document.querySelector('.popup__close');
      cardButton.addEventListener('click', function () {
        document.querySelector('.map__card').remove();
      });
    };
  };

  var onDrawingCardKeydown = function(evt) {
      if (evt.keyCode === window.ENTER_KEYCODE) {
        drawingCard(evt);
      }
    };

  var onDrawingCardClick = function(evt) {
    drawingCard(evt);
  };

  window.similarListElement.addEventListener('click', onDrawingCardClick);
  window.similarListElement.addEventListener('keydown', onDrawingCardKeydown);
})();
