const User = require("../models/userModel");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const should = chai.should();

chai.use(chaiHttp);

// TO  RUN  =>  npm run test
// npm run test "./test/orderTests.js"(For running only orderTests)

//To do authentication before testing
const user = {
  name: "raj",
  email: "raj@gmail.com",
  password: "rajpassword",
};

//Sample Test Objects
var sampleOrder = {
  orderItems: [
    {
      name: "Assignment sheets",
      qty: 3,
      price: 150,
      product: "612f8a411ad3fc02f95a3c2f",
    },
  ],
  shippingAddress: {
    address: "567, XYZ Road",
    city: "Delhi",
    country: "India",
    postalCode: "400002",
  },
  paymentMethod: "paypal",
};

var sampleOrderId;

describe("Endpoints for Order", () => {
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

  // Test the POST /orders/addOrder route
  describe("/orders/addOrder", () => {
    it("it should create a new order", (done) => {
      chai
        .request(app)
        .post("/orders/addOrder")
        .set({ Authorization: `Bearer ${bearer_token}` })
        .send(sampleOrder)
        .end((err, res) => {
          if (err) {
            done();
          }
          res.should.have.status(201);
          res.body.should.be.a("object");
          sampleOrderId = res.body._id;
          done();
        });
    });
  });

  //Test the GET /orders/userOrder/:id route
  describe("/orders/userOrder/:id", () => {
    it("it should GET details of the order by id", (done) => {
      chai
        .request(app)
        .get(`/orders/userOrder/${sampleOrderId}`)
        .set({ Authorization: `Bearer ${bearer_token}` })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  //Test the GET /orders/allOrders/ route
  describe("/orders/allOrders", () => {
    it("it should GET details of all ordes of user", (done) => {
      chai
        .request(app)
        .get("/orders/allOrders")
        .set({ Authorization: `Bearer ${bearer_token}` })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("Array");
          done();
        });
    });
  });

  // Test the PUT /orders/updateOrder/:id route
  describe("/orders/updateOrder/:id", () => {
    it("it should UPDATE details of the order by the given id", (done) => {
      chai
        .request(app)
        .put(`/orders/updateOrder/${sampleOrderId}`)
        .set({ Authorization: `Bearer ${bearer_token}` })
        .send({
          paymentMethod: "GPay",
        })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  // Test the DELETE /orders/cancelOrder/:id route
  describe("/orders/cancelOrder/:id", () => {
    it("it should DELETE the order by the given id", (done) => {
      chai
        .request(app)
        .delete(`/orders/cancelOrder/${sampleOrderId}`)
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
