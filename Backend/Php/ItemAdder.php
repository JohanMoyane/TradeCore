<?php
session_start();
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");
define("BASE_PATH", dirname(__DIR__, 2));
require (BASE_PATH . "/Backend/Php/Database.php");

try {
    $itemName = $_POST["itemName"];
    $shortDesc = $_POST["shortDesc"];
    $description = $_POST["description"];
    $price = $_POST["price"];

    if (!isset($_FILES["addImage"]) || $_FILES["addImage"]["error"] !== UPLOAD_ERR_OK) {
        throw new Exception("Image upload failed.");
    }

    $imageData = file_get_contents($_FILES["addImage"]["tmp_name"]);
    $imageType = $_FILES["addImage"]["type"];

    $allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!in_array($imageType, $allowedTypes)) {
        throw new Exception("Unsupported image type.");
    }
        
    $userID = $_SESSION["user_id"];

    $datainsert = $conn->prepare("SELECT seller_ID FROM sellers WHERE seller_ID = ?");
    $datainsert->bind_param("i", $userID);
    $datainsert->execute();
    $result = $datainsert->get_result();
    $sellerData = $result->fetch_assoc();

    if (!$sellerData) {
        throw new Exception("You must be a registered seller to add items.");
    }

    $sellerID = $sellerData["seller_ID"];

    $null = null;
    $datainsert = $conn->prepare("INSERT INTO item (item_Name, short_Desc, item_Desc, item_Price, item_Image, image_Type, seller_ID) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $datainsert->bind_param("sssdbsi", $itemName, $shortDesc, $description, $price, $null, $imageType, $sellerID);
    $datainsert->send_long_data(4, $imageData);
    $datainsert->execute();

    header("Location: /Frontend/Webpages/Seller Page.html");
} catch (Exception $error) {
    echo '<!DOCTYPE html>
    <html>
        <head><title>Error</title></head>
        <body>
            <p>' . htmlspecialchars($error->getMessage()) . '</p>
            <button onclick="history.back()">Go Back</button>
        </body>
    </html>';
}
?>
