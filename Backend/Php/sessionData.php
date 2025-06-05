<?php
    session_start();
    header("Content-Type: application/json");


    if (!isset($_SESSION["username"])) {
        echo json_encode(["role"  => null]);
        exit;
    }
    echo json_encode([
        "user_id"=> $_SESSION["user_id"],
        "username"=> $_SESSION["username"],
        "role"=> $_SESSION["role"],
        "user_colour" => $_SESSION["user_colour"]
    ]);
?>