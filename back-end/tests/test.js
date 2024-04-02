// make sure you run `npm install chai@4 chai-http@4 --save-dev` and then run `npm test`
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');
const expect = chai.expect;

chai.use(chaiHttp);

/*
describe('Name', () => {
    describe('level', () => {
        it('what', (done) => {
            chai.request(app)
                .get(route)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('TYPE');
                    done();
                })
        })
    })
})
*/

describe('Login & Signup', () => {
    // successful login
    describe('Successful login of an existing user', () => {
        it('should log in existing user', (done) => {
            chai.request(app)
                .post('/users/login')
                .send({'email' : 'user1@example.com', 'password' : '123'})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id');
                    expect(res.body).to.have.property('fullname', 'John Doe');
                    expect(res.body).to.have.property('username', 'John');
                    done();
                })
        })
    })
    
    // failed login due to incorrect email address
    describe('Failed login, email not found', (done) => {
        it('should return 401', (done) => {
            chai.request(app)
                .post('/users/login')
                .send({'email' : 'invalid@email.com', 'password': '123'})
                .end((err, res) => {
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
    })
    
   
    // failed login due to incorrect password
    describe('Failed login, incorrect password', (done) => {
        it('should return 401', (done) => {
            chai.request(app)
                .post('/users/login')
                .send({'email' : 'user1@example.com', 'password': 'incorrectPassword'})
                .end((err, res) => {
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
    })
    

    /*
    // successful signup
    describe('Successful signup of new user', () => {
        it ('should register new user', (done) => {
            chai.request(app)
                .post('/users/register')
                .done()
        })
    })
    */
})

/*
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
*/