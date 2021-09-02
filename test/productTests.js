const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const Product = require("../models/productModel");
const should = chai.should();

chai.use(chaiHttp);

// TO  RUN  =>  npm run test
// npm run test "./test/userTests.js"(For running only userTests)

//To do authentication before testing
const adminUser = {
  name: "admin",
  email: "admin@gmail.com",
  password: "adminpassword",
};

//Sample Test Objects
let product1 = new Product({
  name: "Sketchpens",
  category: "stationary",
  material: "plastic",
  description: "Pack of 5 colourful sketchpens",
  rating: 4.3,
  numReviews: 23,
  price: 15,
  countInStock: 30,
});

// productId = "612f8a0e1ad3fc02f95a3c2c";

var sampleProductId = "";

describe("Endpoints for Product", () => {
  before((done) => {
    //Before each test we check for authorization

    chai
      .request(app)
      .post("/users/login")
      .send(adminUser)
      .end((err, res) => {
        if (err) done(err);
        bearer_token = res.body.token;
        done();
      });
  });

  // Test the POST /products/addProduct route
  describe("/products/addProduct", () => {
    it("it should add a new Product", (done) => {
      chai
        .request(app)
        .post("/products/addProduct")
        .set({ Authorization: `Bearer ${bearer_token}` })
        .send(product1)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.should.have.status(201);
          res.body.should.be.a("object");
          sampleProductId = res.body._id;
          console.log(sampleProductId);
          done();
        });
    });
  });

  //Test the GET /products/allProducts route
  describe("/products/allProducts", () => {
    it("it should GET all Products", (done) => {
      chai
        .request(app)
        .get("/products/allProducts")
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("Array");
          done();
        });
    });
  });

  //Test the GET /products/oneProduct/:id route
  describe("/products/oneProduct/:id", () => {
    it("it should GET particular product", (done) => {
      chai
        .request(app)
        .get(`/products/oneProduct/${sampleProductId}`)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  //Test the GET /products/uniforms route
  describe("/products/uniforms", () => {
    it("it should GET all Uniforms", (done) => {
      chai
        .request(app)
        .get("/products/uniforms")
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("Array");
          done();
        });
    });
  });

  //Test the GET /products/stationary route
  describe("/products/stationary", () => {
    it("it should GET all Stationary", (done) => {
      chai
        .request(app)
        .get("/products/stationary")
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("Array");
          done();
        });
    });
  });

  // Test the PUT /products/updateProduct/:id route
  describe("/products/updateProduct/:id", () => {
    it("it should UPDATE details of the product by the given id", (done) => {
      chai
        .request(app)
        .put(`/products/updateProduct/${sampleProductId}`)
        .set({ Authorization: `Bearer ${bearer_token}` })
        .send({
          price: 25,
          countInStock: 40,
        })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  // Test the DELETE /products/deleteProduct/:id route
  describe("/products/deleteProduct/:id", () => {
    it("it should DELETE the product by the given id", (done) => {
      chai
        .request(app)
        .delete(`/products/deleteProduct/${sampleProductId}`)
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
