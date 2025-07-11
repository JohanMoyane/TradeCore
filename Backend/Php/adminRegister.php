<?php
session_set_cookie_params([
    "lifetime" => 0,
    "path" => "/",
    "secure" => isset($_SERVER["HTTPS"]),
    "httponly" => true,
    "samesite" => "Lax",
]);
session_start();
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");
define("BASE_PATH", dirname(__DIR__, 2));
require (BASE_PATH . "/Backend/Php/Database.php");

try {

    $email = $_POST["eText"];
    $first_name = $_POST["fName"];
    $last_name = $_POST["lName"];
    $username = $_POST["uText"];
    $password = password_hash($_POST["pText"], PASSWORD_BCRYPT);
    $user_colour = "#" . substr(str_shuffle("ABCDEF0123456789"), 0, 6);
    $role = "admin";

    $datainsert = $conn->prepare("INSERT INTO users (user_email, first_name, last_name, username, user_password, user_colour, role) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $datainsert->bind_param("sssssss", $email, $first_name, $last_name, $username, $password, $user_colour, $role);
    $datainsert->execute();

    $user_id = $datainsert->insert_id;
    $conn->query("INSERT INTO administrator (admin_ID) VALUES ($user_id)");

    exit();
} catch (mysqli_sql_exception $error) {
        echo '<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Error</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <p>' . htmlspecialchars($error->getMessage()) . '</p>
        <button onclick="history.back()">Go Back</button>
    </body>
</html>';
}
?>