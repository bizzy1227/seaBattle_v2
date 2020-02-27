/* global
$
*/

$(function () {
   const xhr = new XMLHttpRequest();
   const validator = /^[0-9]{1}$/;

   $('.shot').on('click', function () {
      // проверка на пустые поля
      if ($('.X').val() === '' || $('.Y').val() === '') {
         alert('Заполните пустые поля');
         return false;
      }
      // приводим к числу координаты для дальнейшего сопоставления с регуляркой
      const X = +($('.X').val());
      const Y = +($('.Y').val());
      if (!validator.test(X) || !validator.test(Y)) {
         alert('Вы ввели некоррекные значения');
         return false;
      }
      xhr.open('PUT', '/');
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      const data = {};
      data.x = X;
      data.y = Y;
      const json = JSON.stringify(data);
      xhr.responseType = 'json';
      xhr.send(json);
      xhr.onload = function () {
         const shotList = xhr.response;
         console.log(shotList);
         $('.showHistory').append($('<p>' + shotList[shotList.length - 1].text + '</p>'));
      };
   });

   $('.newGame').on('click', function () {
      xhr.open('DELETE', '/');
      xhr.responseType = 'json';
      xhr.send();
      xhr.onload = function () {
         const shotList = xhr.response;
         console.log(shotList);
         $('.showHistory').empty();
         $('.showHistory').append($('<p>' + shotList[shotList.length - 1].text + '</p>'));
      };
   });

   // xhr.open('GET', '/');
   // xhr.responseType = 'json';
   // xhr.send();
   // xhr.onload = function () {
   //    const shotList = xhr.response;
   //    console.log(shotList);
   // };
});
