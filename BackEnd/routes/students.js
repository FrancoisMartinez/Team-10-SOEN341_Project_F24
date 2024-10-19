const { connectToMongoDB } = require('..index/'); // Adjust path as needed

async function getAndPrintStudents() {
    try {
        const db = await connectToMongoDB();
        const collection = db.collection('students');

        const students = await collection.find({}).toArray();

        console.log("List of Students:");
        students.forEach((student, index) => {
            console.log(`${index + 1}. ${student.name} - ${student._id}`);
        });
    } catch (error) {
        console.error("Error retrieving students:", error);
    }
}

// Call the function to print students
getAndPrintStudents();

fetch('http://localhost:3000/students')
  .then(response => response.json())
  .then(data => console.log(data)) // Handle the list of students
  .catch(error => console.error('Error fetching students:', error));
