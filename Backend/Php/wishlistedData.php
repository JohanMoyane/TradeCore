<?php
require "Database.php";
header("Content-Type: application/json");
ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(E_ALL);

try {
    
    $datainsert = $conn->prepare("SELECT buyer_ID, wishlist_ID, item.* FROM wishlist wish JOIN item item ON wish.item_ID = item.item_ID");
    $datainsert->execute();
    $result = $datainsert->get_result();

    $items = [];

    
    while ($item = $result->fetch_assoc()) {
        $items[] = [
            "wishlist_id" => $item["wishlist_ID"],
            "item_id" => $item["item_ID"],
            "item_name" => $item["item_Name"],
            "buyer_id" => $item["buyer_ID"],
            "seller_id" => $item["seller_ID"]
        ];
    }

    if (empty($items)) {
        throw new Exception("There are no items in the wishlist.");
    }

    echo json_encode($items);

} catch (Exception $error) {
    echo json_encode(["error" => $error->getMessage()]);
}