const User = require("../models/userModel");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const should = chai.should();

chai.use(chaiHttp);

// TO  RUN  =>  npm run test
// npm run test "./test/adminTests"(For running only adminTests)

//To do authentication before testing
const adminUser = {
  name: "admin",
  email: "admin@gmail.com",
  password: "adminpassword",
};
// 5fa1046f9026b415480dcf18 => ID of admin account

//Sample Test Objects
let user1 = {
  name: "Preet",
  email: "preet@gmail.com",
  password: "preetpassword",
};

// To delete a user account
var userId;
// To update order
orderId = "613098cc5f61c5984cec9faf";

describe("Endpoints for Admin", () => {
  before((done) => {
    //Before each test we check for authentication
    chai
      .request(app)
      .post("/users/login")
      .send(adminUser)
      .end((err, res) => {
        if (err) done(err);
        bearer_token = res.body.token;
        // console.log(bearer_token);
        done();
      });
  });

  // Test the GET /admin/allUserDetails route
  describe("/admin/allUserDetails", () => {
    it("it should get details of all users", (done) => {
      chai
        .request(app)
        .get("/admin/allUserDetails")
        .set({ Authorization: `Bearer ${bearer_token}` })
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("Array");
          done();
        });
    });
  });

  // Test the GET /admin/allOrderDetails route
  describe("/admin/allOrderDetails", () => {
    it("it should get details of all orders", (done) => {
      chai
        .request(app)
        .get("/admin/allOrderDetails")
        .set({ Authorization: `Bearer ${bearer_token}` })
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("Array");
          done();
        });
    });
  });

  // Test the PUT /admin/updateOrderStatusToPaid/:id route
  describe("/admin/updateOrderStatusToPaid/:id", () => {
    it("it should UPDATE status of the order to PAID", (done) => {
      chai
        .request(app)
        .put(`/admin/updateOrderStatusToPaid/${orderId}`)
        .set({ Authorization: `Bearer ${bearer_token}` })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  // Test the PUT /admin/updateOrderStatusToProcessed/:id route
  describe("/admin/updateOrderStatusToProcessed/:id", () => {
    it("it should UPDATE status of the order to PROCESSED", (done) => {
      chai
        .request(app)
        .put(`/admin/updateOrderStatusToProcessed/${orderId}`)
        .set({ Authorization: `Bearer ${bearer_token}` })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  // Test the PUT /admin/updateOrderStatusToShipped/:id route
  describe("/admin/updateOrderStatusToShipped/:id", () => {
    it("it should UPDATE status of the order to SHIPPED", (done) => {
      chai
        .request(app)
        .put(`/admin/updateOrderStatusToShipped/${orderId}`)
        .set({ Authorization: `Bearer ${bearer_token}` })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  // Test the PUT /admin/updateOrderStatusToDelivered/:id route
  describe("/admin/updateOrderStatusToDelivered/:id", () => {
    it("it should UPDATE status of the order to DELIVERED", (done) => {
      chai
        .request(app)
        .put(`/admin/updateOrderStatusToDelivered/${orderId}`)
        .set({ Authorization: `Bearer ${bearer_token}` })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  // Test the DELETE /admin/deleteUser/:id route

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
          userId = res.body._id;
          done();
        });
    });
  });

  describe("/admin/deleteUser/:id", () => {
    it("it should delete a user account", (done) => {
      chai
        .request(app)
        .delete(`/admin/deleteUser/${userId}`)
        .set({ Authorization: `Bearer ${bearer_token}` })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
