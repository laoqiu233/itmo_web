<?php
session_start();

header('Content-Type: application/json');
if (isset($_SESSION['attempts'])) {
    echo(json_encode($_SESSION['attempts']));
} else {
    echo('[]');    
}
?>