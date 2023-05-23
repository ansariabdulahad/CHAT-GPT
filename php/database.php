<?php

$db = new mysqli("localhost", "root", "Abdul@Ahad@Ansari@1234", "chatgpt");

if ($db->connect_error) {

    echo "Error connecting to database";

}

?>