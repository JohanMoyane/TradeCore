<?php
require "Database.php";

header("Content-Type: application/json");
ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(E_ALL);


if (!isset($_POST["type"]) || !isset($_POST["id"])) {
    throw new Exception("Missing parameters.");
}

$type = $_POST["type"];
$id = intval($_POST["id"]);

try {
    if ($type == "item_id") {
        $stmt = $conn->prepare("DELETE FROM item WHERE item_ID = ?");
    } elseif ($type == "user_id") {
        $stmt = $conn->prepare("DELETE FROM users WHERE user_uniqueID = ?");
    } else {
        throw new Exception("Invalid deletion type.");
    }

    $stmt->bind_param("i", $id);
    $stmt->execute();

    header("Location: ../../Frontend/Webpages/AdminPage.html");

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