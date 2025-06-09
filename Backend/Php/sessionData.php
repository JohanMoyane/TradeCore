<?php
    session_start();
    header("Content-Type: application/json");

    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Pragma: no-cache");
    header("Expires: 0");

    if (!isset($_SESSION["username"])) {
        http_response_code(401);
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