const React = require('react');
const {expect} = import('chai');
const axios = require("axios");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const handleSubmit1 = async (email, password, instructor) => {

  try {
      const response = await axios.post("http://localhost:3000/login", { email, password, instructor });

      if (response.status === 200) {
        expect(true).to.be.true;
      }
  } catch (error) {
      expect(false).to.be.true;
  }
};


const handleSubmit2 = async ( firstName, lastName, email, password, instructor ) => {
  try {
      const response = await axios.post("http://localhost:3000/signup", { firstName, lastName, email, password, instructor });

      if (response.status === 200) {;
          expect(true).to.be.true;
      }
  } catch (error) {
      expect(false).to.be.true;
  }
};

describe('Login test', () => {
  it('should return login success', () =>{
    handleSubmit1("s1@g.c", "123", false);
  })
})
describe('Register test', () => {
  it('should return register success', () =>{
    handleSubmit2("Billy","Bob",getRandomInt(1,10000)+"@gmail.com","password123", true);
  })
})
