const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const expect = chai.expect;

chai.use(chaiHttp);

/* TEMPLATE - for hannah, delete when done :)
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

describe("Login & Signup", () => {
    
  // successful login - TODO : failing
  describe("Successful login of an existing user", () => {
    it("should log in existing user", (done) => {
      chai
        .request(app)
        .post("/users/login")
        .send({ email: "user1@example.com", password: "123" })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("fullname", "John Doe");
          expect(res.body).to.have.property("username", "John");
          done();
        });
    });
  });

  // failed login due to incorrect email address
  describe("Failed login, email not found", (done) => {
    it("should return 401", (done) => {
      chai
        .request(app)
        .post("/users/login")
        .send({ email: "invalid@email.com", password: "123" })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an("object");
          done();
        });
    });
  });

  // failed login due to incorrect password
  describe("Failed login, incorrect password", (done) => {
    it("should return 401", (done) => {
      chai
        .request(app)
        .post("/users/login")
        .send({ email: "user1@example.com", password: "incorrectPassword" })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an("object");
          done();
        });
    });
  });

  // successful signup
  describe("Successful signup of new user", () => {
    it("should register new user", (done) => {
      chai
        .request(app)
        .post("/users/register")
        .send({
          fullname: "Tester",
          username: "testing",
          email: "testing@testmail.com",
          password: "123",
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          done();
        });
    });
  });
});

describe("Book Routes", () => {
  it("should get all books", (done) => {
    chai
      .request(app)
      .get("/books")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

describe("Friends Routes", () => {
  describe("Friend Shelf Route", () => {
    it("should display friends", (done) => {
      chai
        .request(app)
        .get("/users/1/books/FriendsCurrentReads")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array"); // ok -> but could be better
          done();
        });
    });
  });

  // describe("Friends Route", () => {
  //   it("Friends Page Route", (done) => {
  //     chai
  //       .request(app)
  //       .get("/users/1/friends")
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //         expect(res.body).to.be.an("object");
  //         done();
  //       });
  //   });
  // });
});

describe("User Routes", () => {
  describe ("Gets all users", () => {
    it("should get all users", (done) => {
      chai
        .request(app)
        .get("/users")
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          done();
        });
    });
  });

  describe("Gets users by their id", () => {
    it("should get user by their id", (done) => {
      chai
        .request(app)
        .get("/users/1")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          done();
        });
    });
  });
});