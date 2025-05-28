<?php
require "Database.php";
header("Content-Type: application/json");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    $datainsert = $conn->prepare("SELECT seller_ID, seller.username AS seller_username, seller.user_email AS seller_email FROM sellers JOIN users seller ON seller_ID=seller.user_uniqueID");
    $datainsert->execute();
    $result = $datainsert->get_result();

    $sellers = [];

    while ($seller = $result->fetch_assoc()) {
        $sellers[] = [
            "seller_id" => $seller["seller_ID"],
            "seller_username" => $seller["seller_username"],
            "seller_email" => $seller["seller_email"]
        ];
    }

    if (empty($sellers)) {
        throw new Exception("There are no items.");
    }

    echo json_encode($sellers);

} catch (Exception $error) {
    http_response_code(500);
    echo json_encode(["error: " => $error->getMessage()]);
}