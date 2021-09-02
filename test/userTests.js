const User = require("../models/userModel");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const should = chai.should();

chai.use(chaiHttp);

// TO  RUN  =>  npm run test
// npm run test "./test/userTests.js"(For running only userTests)

//To do authentication before testing
const user = {
  name: "raj",
  email: "raj@gmail.com",
  password: "rajpassword",
};

//Sample Test Objects
let user1 = new User({
  name: "Preet",
  email: "preet@gmail.com",
  password: "preetpassword",
});

let user2 = {
  name: "Vedanti",
  email: "vedanti@gmail.com",
  password: "vedantipassword",
};

userId1 = "612f70239994cf131be35660";

describe("Endpoints for User", () => {
  before((done) => {
    //Before each test we check for authorization

    chai
      .request(app)
      .post("/users/login")
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        bearer_token = res.body.token;
        // console.log(bearer_token);
        done();
      });
  });

  // Test the POST /users/register route
  describe("/users/register", () => {
    it("it should register a new user", (done) => {
      chai
        .request(app)
        .post("/users/register")
        .send(user1)
        .end((err, res) => {
          if (err) {
            done();
          }
          res.should.have.status(201);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  //Test the GET /users/userDetails route
  describe("/users/userDetails", () => {
    it("it should GET details of the user", (done) => {
      chai
        .request(app)
        .get("/users/userDetails")
        .set({ Authorization: `Bearer ${bearer_token}` })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  // Test the PUT /users/userUpdate route
  describe("/users/userUpdate", () => {
    it("it should UPDATE details of the user by the given id", (done) => {
      chai
        .request(app)
        .put("/users/userUpdate")
        .set({ Authorization: `Bearer ${bearer_token}` })
        .send(user)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
