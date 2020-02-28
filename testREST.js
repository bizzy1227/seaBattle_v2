/* global
   describe
   beforeEach
   it
*/

const mongoose = require('mongoose');
const Shot = require('./model');
const bodyParser = require('body-parser');
const express = require('express');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

// Чистим базу данных перед каждым тестом
describe('Shots', () => {
   beforeEach((done) => { // Перед каждым тестом чистим базу
      Shot.remove({}, (err) => {
         if (err) {
            console.log(err);
         }
         done();
      });
   });

   describe('/GET html', () => {
      it('it should GET html', (done) => {
         chai.request(server)
            .get('/')
            .end((err, res) => {
               if (err) {
                  console.log(err);
               }
               // eslint-disable-next-line no-unused-expressions
               expect(res).to.be.html;
               res.should.have.status(200);
               done();
            });
      });
   });

   describe('/GET getDoc', () => {
      it('it should GET mongo docs', (done) => {
         chai.request(server)
            .get('/getDoc')
            .end((err, res) => {
               if (err) {
                  console.log(err);
               }
               res.should.have.status(200);
               // eslint-disable-next-line no-unused-expressions
               expect(res).to.be.json;
               res.body.length.should.be.eql(0);
               res.body.should.be.a('array');
               done();
            });
      });
   });

   describe('/PUT mongoDoc', () => {
      it('it should UPDATE docs', (done) => {
         function getRandomInt (max) {
            return Math.floor(Math.random() * Math.floor(max));
         }
         const X = getRandomInt(9);
         const Y = getRandomInt(9);
         chai.request(server)
            .put('/')
            .send({ x: X, y: Y })
            .end((err, res) => {
               if (err) {
                  console.log(err);
               }
               res.should.have.status(200);
               // eslint-disable-next-line no-unused-expressions
               expect(res).to.be.json;
               res.body[0].x.should.be.eql(X);
               res.body[0].y.should.be.eql(Y);
               done();
            });
      });
   });

   describe('/DELETE mongoDoc', () => {
      it('it should DELETE docs', (done) => {
         chai.request(server)
            .delete('/')
            .end((err, res) => {
               if (err) {
                  console.log(err);
               }
               res.should.have.status(200);
               // eslint-disable-next-line no-unused-expressions
               expect(res).to.be.json;
               res.body.length.should.be.eql(1);
               res.body[0].text.should.be.eql('New Game Started!!!');
               done();
            });
      });
   });
});
