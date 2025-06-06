<?php
session_start();
define("BASE_PATH", dirname(__DIR__, 2));
require (BASE_PATH . "/Backend/Php/Database.php");

try {
    $senderID = $_SESSION["user_id"];
    $itemID = $_POST["item_id"];
    $message = $_POST["message"];

    if (empty($message)) {
        throw new Exception("Missing message");
    }
    $datainsert = $conn->prepare("SELECT seller_ID FROM item WHERE item_ID = ?");
    $datainsert->bind_param("i", $itemID);
    $datainsert->execute();
    $result = $datainsert->get_result();
    $sellerData = $result->fetch_assoc();

    if (!$sellerData) {
        throw new Exception("No seller found for this item.");
    }

    $receiverID = $sellerData["seller_ID"];

    $datainsert = $conn->prepare("INSERT INTO messages (sender_ID, receiver_ID, text_msg) VALUES (?, ?, ?)");
    $datainsert->bind_param("iis", $senderID, $receiverID, $message);
    $datainsert->execute();

    include BASE_PATH . ("/Backend/Php/wishlistAdder.php");

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