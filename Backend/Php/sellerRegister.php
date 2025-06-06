<?php
session_start();
define("BASE_PATH", dirname(__DIR__, 2));
require (BASE_PATH . "/Backend/Php/Database.php");


$case = false;

try {

    $email = trim($_POST["eText"]);
    $password = $_POST["pText"];
    $nationality_id = (int) $_POST["idText"];

    $datainsert = $conn->prepare("SELECT user_uniqueID, user_password FROM users WHERE user_email = ? FOR UPDATE");
    $datainsert->bind_param("s", $email);
    $datainsert->execute();
    $user = $datainsert->get_result()->fetch_assoc();
    if (!$user) {
        throw new Exception("Email not found.");

    }

    if (!password_verify($password, $user['user_password'])) {
        throw new Exception("Incorrect password.");
    }
    $user_id = (int) $user["user_uniqueID"];

    $conn->begin_transaction();
    $case = true;

    $datainsert = $conn->prepare(
      "UPDATE users 
          SET role = 'seller' 
        WHERE user_uniqueID = ?"
    );
    $datainsert->bind_param("i", $user_id);
    $datainsert->execute();

    $datainsert = $conn->prepare(
      "INSERT INTO sellers (seller_ID, nationality_ID) 
            VALUES (?, ?)"
    );
    $datainsert->bind_param("ii", $user_id, $nationality_id);
    $datainsert->execute();

    $conn->commit();
    header("Location: /Backend/Php/Logout.php");
    exit;

} catch (Exception $error) {

    if ($case) {
        $conn->rollback();
    }
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


