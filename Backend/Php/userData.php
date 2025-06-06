<?php
define("BASE_PATH", dirname(__DIR__, 2));
require (BASE_PATH . "/Backend/Php/Database.php");
header("Content-Type: application/json");
ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(E_ALL);

try {
    $datainsert = $conn->prepare("SELECT *,sellerS.nationality_ID FROM users LEFT JOIN sellers sellerS ON user_uniqueID = sellerS.seller_ID");
    $datainsert->execute();
    $result = $datainsert->get_result();

    $users = [];

    while ($user = $result->fetch_assoc()) {
        $userData = [
            "user_UID" => $user["user_uniqueID"],
            "email" => $user["user_email"],
            "first_name" => $user["first_name"],
            "last_name" => $user["last_name"],
            "username" => $user["username"],
            "colour" => $user["user_colour"],
            "role" => $user["role"]
        ];

        if ($user["role"] === "seller") {
            $userData["nationality_ID"] = $user["nationality_ID"];
        }

        $users[] = $userData;
    }

    if (empty($users)) {
        throw new Exception("There are no users.");
    }


    echo json_encode($users);

} catch (Exception $error) {
    echo json_encode(["error: " => $error->getMessage()]);
}