<?php

$env = parse_ini_file(".env");

$host = $env["host"];
$user = $env["user"];
$password = $env["password"];
$database = $env["database"];

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
