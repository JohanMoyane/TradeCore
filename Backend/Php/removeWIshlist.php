<?php
require "Database.php";
header("Content-Type: application/json");


$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["wishlist_id"])) {
    echo json_encode(["error" => "Missing wishlist ID"]);
    exit;
}

$wishlist_id = $data["wishlist_id"];

$datainsert = $conn->prepare("DELETE FROM wishlist WHERE wishlist_ID = ?");
$datainsert->bind_param("i", $wishlist_id);
$datainsert->execute();