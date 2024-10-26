<?php
// Import MongoDB PHP Library OR ANY CHOSEN SERVER NEED TO BE EDITED
require 'vendor/autoload.php'; // MongoDB Library

// Connect to MongoDB OR ANY OTHER CHOSEN SERVER NEED TO BE EDITED 
$client = new MongoDB\Client("mongodb://localhost:27017");
$collection = $client->peerFeedback->teams;

// Handle GET request for teammates
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get the userId from the query parameter (this comes from the frontend)
    $userId = $_GET['userId']; // userId is passed as a query parameter

    // Fetch the team that contains this userId
    $team = $collection->findOne(['members' => $userId]);

    // If the team is found
    if ($team) {
        $teammates = [];
        // Loop through members and exclude the logged-in user
        foreach ($team['members'] as $member) {
            if ($member != $userId) {
                // Add each teammate's ID and name to the result
                $teammates[] = ['id' => $member, 'name' => getUserName($member)];
            }
        }
        // Return teammates as JSON
        echo json_encode($teammates);
    } else {
        // No team found for the user, return empty array
        echo json_encode([]);
    }
}

// Helper function to fetch the user name by ID
function getUserName($userId) {
    global $client;
    $userCollection = $client->peerFeedback->users;
    $user = $userCollection->findOne(['userId' => $userId]);
    return $user ? $user['name'] : 'Unknown';
}
?>
