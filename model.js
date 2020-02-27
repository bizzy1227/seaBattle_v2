const { Schema, model } = require('mongoose');
// шаблон которому должны соответсвовать все документы созданные через new List
const shotSchema = new Schema({
   x: {
      type: Number,
      required: false
   },
   y: {
      type: Number,
      required: false
   },
   result: Number,
   text: {
      type: String,
      // указываем что поле title является обязательным
      required: true
   }
});
// предоставляем схему для создания документов по ключу List
module.exports = model('Shot', shotSchema);
