<?php
session_start();

$_SESSION = [];

session_destroy();

if (ini_get("session.use_cookies")) {
    $cookieData = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $cookieData["path"], $cookiedata["domain"],
        $cookieData["secure"], $cookiedata["httponly"]
    );
}

header("Location: /Frontend/Webpages/Index.html");
exit;
?>  