const express = require('express');
const mongoose = require('mongoose');
let seaBattle = require('./seaBattle');
const { Router } = require('express');
const path = require('path');
const ShotItem = require('./model');
const router = Router();


const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

async function startWork () {
   try {
      await mongoose.connect('mongodb://localhost:27017/test', {
         useNewUrlParser: true,
         useFindAndModify: false
      });
      app.listen(PORT, () => {
         console.log('Server has been started at 3000');
      });
   } catch (error) {
      console.log(error);
   }
}
startWork();

app.get('/', async (req, res) => {
   try {
      res.sendfile(__dirname + '/index.html');
      const items = await ShotItem.find({});
      res.send(JSON.stringify(items));
   } catch (error) {
      console.log(error);
   }
});

app.put('/', async (req, res) => {
   try {
      const game = seaBattle.createSeaBattle();
      const data = req.body;
      const result = game(data.x)(data.y);
      const text = 'User shot x: ' + data.x + ', y: ' + data.y + '. Result: ' + result;

      const item = new ShotItem({
         x: data.x,
         y: data.y,
         result: result,
         text: await text
      });
      // сохраняем в Mongo новый файл
      await item.save();
      // console.log(text);
      const items = await ShotItem.find({});
      // console.log(JSON.stringify(items));
      res.send(JSON.stringify(items));
   } catch (error) {
      const item = new ShotItem({
         text: 'Error: ' + await error.message
      });
      await item.save();
      const items = await ShotItem.find({});
      res.send(JSON.stringify(items));
   }
});

app.delete('/', async (req, res) => {
   try {
      await ShotItem.deleteMany({});
      const item = new ShotItem({
         text: 'New Game Started!!!'
      });
      await item.save();
      const items = await ShotItem.find({});
      res.send(JSON.stringify(items));
      // чистим кэш require для обновления поля с кораблями для новой игры
      delete require.cache[require.resolve('./seaBattle.js')];
      seaBattle = require('./seaBattle.js');
      // res.redirect('/');
      // console.log('im in delete method');
   } catch (error) {
      console.log(error);
   }
});
