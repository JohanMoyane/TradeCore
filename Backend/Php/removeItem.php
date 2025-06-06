<?php
define("BASE_PATH", dirname(__DIR__, 2));
require (BASE_PATH . "/Backend/Php/Database.php");
header("Content-Type: application/json");


$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["item_id"])) {
    echo json_encode(["error" => "Missing item ID"]);
    exit;
}

$item_id = $data["item_id"];

$datainsert = $conn->prepare("DELETE FROM item WHERE item_ID = ?");
$datainsert->bind_param("i", $item_id);
$datainsert->execute();