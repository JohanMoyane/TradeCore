<?php
session_start();
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");
define("BASE_PATH", dirname(__DIR__, 2));
require BASE_PATH . "/Backend/Php/Database.php";

try {
    $senderID = $_SESSION["user_id"];
    $receiverID = $_POST["receiver_id"];
    $message = $_POST["message"];

    if (empty($message) || empty($receiverID)) throw new Exception("Missing data.");

    $datainsert = $conn->prepare("INSERT INTO messages (sender_ID, receiver_ID, text_msg) VALUES (?, ?, ?)");
    $datainsert->bind_param("iis", $senderID, $receiverID, $message);
    $datainsert->execute();

    echo json_encode(["success" => true]);
} catch (Exception $error) {
    echo json_encode(["error" => $error->getMessage()]);
}
?>