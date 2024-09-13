const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js'); 

chai.use(chaiHttp); 
const {expect} = chai;

describe('AuthController', ()=>{
    //TODO: SignUp API TEST 
    describe('POST /signup', ()=>{
        it('should create a new user and return a token', (done) => {
            chai.request(server)
            .post('/api/v1/signup')
            .send({
                firstName: "John",
                lastName: "Doe",
                email: "johndoe@example.com",
                password: "password123",
                purposeOfUse: "Personal",
                contactNumber: "1234567890",
                dob: "1990-01-01",
                region: "India"
            })
            .end((err, res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('access_toke');
                expect(res.body.message).to.equal("User Register Successfully"); 
                done();
            })
        })
        it('should not allow registration with an existing email', (done) => {
            chai.request(server)
            .post('/api/v1/signup')
            .send({
                firstName: "Jane",
                lastName: "Doe",
                email: "johndoe@example.com", // Already registered email
                password: "password123",
                purposeOfUse: "Personal",
                contactNumber: "0987654321",
                dob: "1995-02-15",
                region: "UK"
            })
            .end((err, res) => {
                expect(res).to.have.status(409); // Expected status for conflict
                expect(res.body.message).to.equal('User Already Exist'); // Assuming this is the error message
                done();
            });
        })
    })
    // TODO: Login  API Test
    describe('LOGIN /login', ()=>{
        it('should login an existing user and return a token', (done)=>{
            chai.request(server)
            .post('/api/v1/login')
            .send({
                email: "johndoe@example.com",
                password: "password123"
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token');
                expect(res.body.message).to.equal("User Login Successfully");
                done();
            });
        })
        it('should return an error if email is not found', (done) => {
            chai.request(server)
              .post('/api/v1/login')
              .send({
                email: "nonexistent@example.com",
                password: "password123"
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body.message).to.equal('No User Found'); 
                done();
            });
        });
        it('should return an error if the password is incorrect', (done)=>{
            chai.request(server)
            .post('/api/v1/login')
            .send({
            email: "johndoe@example.com",
            password: "wrongpassword"
            })
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body.message).to.equal('User Credentials Invalid'); // Assuming this is the error message
                done();
            })
        })
    })
})