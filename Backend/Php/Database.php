<?php

$env = parse_ini_file('.env');

// Assign variables directly from $env array
$host = $env["HOST"];
$user = $env["USER"];
$password = $env["PASSWORD"];
$database = $env["DATABASE"];

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>