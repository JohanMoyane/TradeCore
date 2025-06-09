<?php
define("BASE_PATH", dirname(__DIR__, 2));
require (BASE_PATH . "/Backend/Php/Database.php");

try{
$sender = $_GET["sender_ID"];
$receiver = $_GET["receiver_ID"];

$stdatainsert = $conn->prepare("SELECT sender_ID, receiver_ID, text_msg FROM messages WHERE (sender_ID = ? AND receiver_ID = ?) OR (sender_ID = ? AND receiver_ID = ?) ORDER BY message_ID ASC");
$datainsert->bind_param("iiii", $sender, $receiver, $receiver, $sender);
$datainsert ->execute();
$msgresult = $datainsert->get_result();

$messages = [];
while ($row = $msgresult->fetch_assoc()) {
    $messages[] = $row;
}
echo json_encode($messages);
}
 catch (Exception $error) {
    echo json_encode(["error: " => $error->getMessage()]);
}
?>