<?php
session_start();
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");

$_SESSION = [];
session_unset();

session_destroy();

if (ini_get("session.use_cookies")) {
    $cookieData = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $cookieData["path"],
        $cookieData["domain"] ?? '',
        $cookieData["secure"] ?? false,
        $cookieData["httponly"] ?? false
    );
}

header("Location: /Frontend/Webpages/Index.html");
exit;
?>
