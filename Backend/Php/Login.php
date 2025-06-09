<?php
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => isset($_SERVER['HTTPS']),
    'httponly' => true,
    'samesite' => 'Lax',
]);
session_start();
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");
define("BASE_PATH", dirname(__DIR__, 2));
require (BASE_PATH . "/Backend/Php/Database.php");

try {
    $email = $_POST["eText"] ?? null;
    $password = $_POST["pText"] ?? null;

    $datainsert = $conn->prepare("SELECT * FROM users WHERE user_email = ?");
    $datainsert->bind_param("s", $email);
    $datainsert->execute();
    $result = $datainsert->get_result();

    if ($user = $result->fetch_assoc()) {
        if (password_verify($password, $user['user_password'])) {
            session_regenerate_id(true);
            $_SESSION["user_id"] = $user["user_uniqueID"];
            $_SESSION["user_email"]= $user["user_email"];
            $_SESSION["first_name"]= $user["first_name"];
            $_SESSION["last_name"]= $user["last_name"];
            $_SESSION["username"] = $user["username"];
            $_SESSION["role"] = $user["role"];
            $_SESSION["user_colour"] = $user["user_colour"];
            switch ($user["role"]) {
                case "admin":
                    header("Location:  /Frontend/Webpages/AdminPage.html");
                    break;
                case "seller":
                    header("Location: /Frontend/Webpages/Seller Page.html");
                    break;
                case "buyer":
                    header("Location: /Frontend/Webpages/Buyer Page.html");
                    break;
                default:
                    throw new Exception("Invalid role assigned.");
            }
            
            exit();
        } 
        else {
            throw new Exception("Wrong password.");
        }
        
    } else {
        throw new Exception("User not found.");
    }
}
catch (Exception $error) {
    echo '<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Login Error</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <p>' . htmlspecialchars($error->getMessage()) . '</p>
        <button onclick="history.back()">Go Back</button>
    </body>
</html>';
} 
?>
