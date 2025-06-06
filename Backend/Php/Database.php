<?php

$host = getenv("host");
$user = getenv("user");
$password = getenv("password");
$database = getenv("database");

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
