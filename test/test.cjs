const React = require('react');
const {expect} = import('chai');
const axios = require("axios");


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const handleLogin = async (email, password, instructor) => {
    try {
        const response = await axios.post("http://localhost:3000/login", { email, password, instructor });
        expect(response.status).to.equal(200);
    } catch (error) {
        expect.fail(`Login failed with error: ${error.message}`);
    }
};

const handleSignup = async (firstName, lastName, email, password, instructor = false) => {
    try {
        const response = await axios.post("http://localhost:3000/signup", { firstName, lastName, email, password, instructor });
        expect(response.status).to.equal(200);
    } catch (error) {
        expect.fail(`Signup failed with error: ${error.message}`);
    }
};

const handleDelete = async (email) => {
    try {
        const response = await axios.delete("http://localhost:3000/delete", { data: { email } });
        expect(response.status).to.equal(200);
    } catch (error) {
        expect.fail(`Delete failed with error: ${error.message}`);
    }
};

const handleTeamCreation = async (teamName, members, instructor = true) => {
    try {
        const data = { members, teamName, instructor };
        const response = await axios.post("http://localhost:3000/add-team", data);
        expect(response.status).to.equal(200);
    } catch (error) {
        expect.fail(`Team creation failed with error: ${error.message}`);
    }
};

const handleTeamUpdate = async (newMembers, removedMembers, teamName, instructor = true) => {
    try {
        const data = { members: newMembers, teamName, instructor };
        const removedData = { members: removedMembers, teamName: null, instructor };

        const response1 = await axios.post("http://localhost:3000/update-team", data);
        const response2 = await axios.post("http://localhost:3000/update-team", removedData);

        expect(response1.status).to.equal(200);
        expect(response2.status).to.equal(200);
    } catch (error) {
        expect.fail(`Team update failed with error: ${error.message}`);
    }
};

const leaveReview = async (reviewerEmail, recipientEmail, reviewContent) => {
    try {
        const response = await axios.post("http://localhost:3000/reviews", {
            reviewer: reviewerEmail,
            recipient: recipientEmail,
            content: reviewContent
        });
        expect(response.status).to.equal(200);
    } catch (error) {
        expect.fail(`Review submission failed with error: ${error.message}`);
    }
};



describe('Login test', () => {
  it('should return login success', () =>{
      handleLogin("s1@g.c", "123", false);
  })
})
describe('Register test', () => {
    it('should register a new user successfully', () => {
        handleSignup("John", "Doe", "johndoetestreg@example.com", "password123", false);
        handleDelete("johndoetestreg@example.com");
    });
})

describe('Team creation test', () => {
    it('should create a team successfully',  () => {
        const email1 = `student${getRandomInt(1, 10000)}@example.com`;
        const email2 = `student${getRandomInt(1, 10000)}@example.com`;

        handleSignup("StudentOne", "One", email1, "password123", false);
        handleSignup("StudentTwo", "Two", email2, "password123", false);

        const members = [email1, email2];
        handleTeamCreation("Team Alpha", members, false);

        handleDelete(email1);
        handleDelete(email2);
    });
})

describe('Team update test', () => {
    it('should update a team successfully',  () => {
        const email1 = `student${getRandomInt(1, 10000)}@example.com`;
        const email2 = `student${getRandomInt(1, 10000)}@example.com`;
        const email3 = `student${getRandomInt(1, 10000)}@example.com`;

        handleSignup("StudentOne", "One", email1, "password123", false);
        handleSignup("StudentTwo", "Two", email2, "password123", false);
        handleSignup("StudentThree", "Three", email3, "password123", false);

        const initialMembers = [email1, email2];
        handleTeamCreation("Team Alpha", initialMembers, false);

        // Update the team by adding a new member and removing one
        const newMembers = [email1, email3];
        const removedMembers = [email2];
        handleTeamUpdate(newMembers, removedMembers, "Team Alpha", false);

        // Cleanup - delete the fake students
        handleDelete(email1);
        handleDelete(email2);
        handleDelete(email3);
    });
})

describe('Review test', () => {

    it('should create a team and leave a review successfully',  () => {
        // Register two students
        const email1 = `student${getRandomInt(1, 10000)}@example.com`;
        const email2 = `student${getRandomInt(1, 10000)}@example.com`;

        handleSignup("StudentOne", "One", email1, "password123");
        handleSignup("StudentTwo", "Two", email2, "password123");

        // Create a team with these students
        const members = [email1, email2];
        handleTeamCreation("Team Alpha", members);

        // Leave a review from StudentOne to StudentTwo
        const reviewContent = "Great teamwork and communication!";
        leaveReview(email1, email2, reviewContent);

        // Cleanup - delete the fake students
        handleDelete(email1);
        handleDelete(email2);
    });
});
