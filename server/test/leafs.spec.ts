import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Leaf from '../models/leaf';

const should = chai.use(chaiHttp).should();

describe('Leafs', () => {

  beforeEach(done => {
    Leaf.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for leafs', () => {

    it('should get all the leafs', done => {
      chai.request(app)
        .get('/api/leafs')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get leafs count', done => {
      chai.request(app)
        .get('/api/leafs/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new leaf', done => {
      const leaf = { name: 'Fluffy', weight: 4, age: 2 };
      chai.request(app)
        .post('/api/leaf')
        .send(leaf)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('name');
          res.body.should.have.a.property('weight');
          res.body.should.have.a.property('age');
          done();
        });
    });

    it('should get a leaf by its id', done => {
      const leaf = new Leaf({ name: 'Leaf', weight: 2, age: 4 });
      leaf.save((error, newLeaf) => {
        chai.request(app)
          .get(`/api/leaf/${newLeaf.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('weight');
            res.body.should.have.property('age');
            res.body.should.have.property('_id').eql(newLeaf.id);
            done();
          });
      });
    });

    it('should update a leaf by its id', done => {
      const leaf = new Leaf({ name: 'Leaf', weight: 2, age: 4 });
      leaf.save((error, newLeaf) => {
        chai.request(app)
          .put(`/api/leaf/${newLeaf.id}`)
          .send({ weight: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a leaf by its id', done => {
      const leaf = new Leaf({ name: 'Leaf', weight: 2, age: 4 });
      leaf.save((error, newLeaf) => {
        chai.request(app)
          .delete(`/api/leaf/${newLeaf.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});
