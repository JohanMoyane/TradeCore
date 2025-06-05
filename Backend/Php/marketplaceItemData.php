<?php
require "Database.php";
header("Content-Type: application/json");
ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(E_ALL);

try {
    $datainsert = $conn->prepare("SELECT * FROM item");
    $datainsert->execute();
    $result = $datainsert->get_result();

    $items = [];

    while ($item = $result->fetch_assoc()) {
        $items[] = [
            "item_id" => $item["item_ID"],
            "item_name"=> $item["item_Name"],
            "short_desc"=> $item["short_Desc"],
            "item_desc"=> $item["item_Desc"],
            "item_price"=> "R". number_format($item["item_Price"],2),
            "item_image" => "/Backend/Php/imageRetriever.php?itemId=". $item["item_ID"],
            "seller_id"=> $item["seller_ID"]
        ];
    }

    if (empty($items)) {
        throw new Exception("There are no items.");
    }

    echo json_encode($items);

} catch (Exception $error) {
    echo json_encode(["error: " => $error->getMessage()]);
}