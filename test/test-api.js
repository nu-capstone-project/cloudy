var chai = require("chai");
var chaiHttp = require("chai-http");
chai.use(chaiHttp);
var expect = require("chai").expect;
var request = require("request");

it("API reachable", function(done) {
  request("http://localhost:5000/api/test", function(error, response, body) {
    expect(response.statusCode).to.equal(200);
    done();
  });
});

it("Register API validation with invalid data", function(done) {
  request.post(
    "http://localhost:5000/api/users/register",
    {
      json: {
        name: "Y",
        email: "aa@aa",
        password: "123",
        password2: "123"
      }
    },
    function(error, response, body) {
      expect(response.statusCode).to.equal(400);
      done();
    }
  );
});

it("Login not returning session cookie", done => {
  request.post(
    "http://localhost:5000/api/users/login",
    { json: { email: "yashrastogi@gmail.com", password: "yashrastogi" } },
    (err, res, body) => {
      expect(res).to.not.have.cookie("sessionid");
      done();
    }
  );
});
