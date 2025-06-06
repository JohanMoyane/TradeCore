<?php
define("BASE_PATH", dirname(__DIR__, 2));
require (BASE_PATH . "/Backend/Php/Database.php");

try{

    $datainsert = $conn ->prepare("INSERT INTO wishlist (buyer_ID, item_ID) VALUES (?,?)");
    $datainsert->bind_param("ii",$senderID, $itemID);
    $datainsert->execute();
    header("Location: /Frontend/Webpages/Marketplace.html");

}catch (Exception $error) {
    echo '<!DOCTYPE html>
    <html>
        <head><title>Error</title></head>
        <body>
            <p>' . htmlspecialchars($error->getMessage()) . '</p>
            <button onclick="history.back()">Go Back</button>
        </body>
    </html>';
}