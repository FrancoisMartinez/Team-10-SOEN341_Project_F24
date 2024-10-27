<?php
require 'vendor/autoload.php'; // Ensure this points to the correct path for MongoDB Library

$client = new MongoDB\Client("mongodb://localhost:27017");
$collection = $client->peerFeedback->students; // Adjust to your actual MongoDB collection

if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['file']['tmp_name'];
    $fileName = $_FILES['file']['name'];
    $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);

    if (strtolower($fileExtension) !== 'csv') {
        die('Error: Only CSV files are allowed.');
    }

    if (($handle = fopen($fileTmpPath, 'r')) !== false) {
        $data = [];
        $header = fgetcsv($handle, 1000, ','); // Read header row
        
        while (($row = fgetcsv($handle, 1000, ',')) !== false) {
            $rowData = array_combine($header, $row); // Map headers to values for each row
            $data[] = $rowData; // Collect row data
        }
        fclose($handle);

        if (!empty($data)) {
            $collection->insertMany($data);
            echo 'CSV data imported successfully into MongoDB.';
        }
    } else {
        die('Error: Unable to open the CSV file.');
    }
} else {
    die('Error: No file uploaded or file upload failed.');
}
?>
