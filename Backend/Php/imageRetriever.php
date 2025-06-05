<?php
require "Database.php";

if (!isset($_GET['itemId'])) {
    http_response_code(400);
    exit("No image ID specified.");
}

$itemId = $_GET["itemId"];

$datainsert = $conn->prepare("SELECT item_Image, image_Type FROM item WHERE item_ID = ?");
$datainsert->bind_param("i", $itemId);
$datainsert->execute();
$datainsert->store_result();

if ($datainsert->num_rows === 0) {
    exit("Image not found.");
}

$datainsert->bind_result($imageData, $imageType);
$datainsert->fetch();

header("Content-Type: " . $imageType);
echo $imageData;
?>