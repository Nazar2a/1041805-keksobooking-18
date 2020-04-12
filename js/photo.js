'use strict';

(function () {
// модуль загрузки аватарки и фотографий жилья
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('#avatar');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  var fileChooserImages = document.querySelector('#images');
  var emptyImgWrap = document.querySelector('.ad-form__photo');

  var uploadPhoto = function (fileChooser, preview) {
    var file = fileChooser.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };

  fileChooserAvatar.addEventListener('change', function () {
    uploadPhoto(fileChooserAvatar, previewAvatar);
  });

  var IMAGE_PARAMS = {
    width: '20px',
    height: '20px',
    borderRadius: '5px',
    marginRight: '3px',
    numbersPhotos: 9
  };

  // создать тег img
  var addImage = function () {
    var newImage = document.createElement('img');
    newImage.style.width = IMAGE_PARAMS.width;
    newImage.style.height = IMAGE_PARAMS.height;
    newImage.style.borderRadius = IMAGE_PARAMS.borderRadius;
    newImage.style.marginRight = IMAGE_PARAMS.marginRight;
    emptyImgWrap.prepend(newImage);
  };


  fileChooserImages.addEventListener('change', function () {
    var previewImages = document.querySelectorAll('.ad-form__photo img');
    if (previewImages.length < IMAGE_PARAMS.numbersPhotos) {
      addImage();
      var previewImage = document.querySelector('.ad-form__photo img');
      uploadPhoto(fileChooserImages, previewImage);
    }
  });

  // удаляем ненужные фото, по их кликам
  emptyImgWrap.addEventListener('click', function (evt) {
    if (evt.target.localName === 'img') {
      evt.target.remove();
    }
  });
})();
