const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Book Routes', () => {
    it('should get all books', (done) => {
        chai.request(app)
            .get('/books')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });
});

// make sure you run `npm install chai@4 chai-http@4 --save-dev` and then run `npm test`