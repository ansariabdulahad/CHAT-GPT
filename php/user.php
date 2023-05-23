<?php

require('database.php');

$question = $_POST['question'];

$get_data = "SELECT answer FROM dashboard WHERE question = '$question'";
$reponse = $db->query($get_data);

if ($reponse->num_rows != 0) {

    $data = $reponse->fetch_assoc();

    echo json_encode($data);
} else {

    echo "Unable to give answer, we will update this question soon !";
}

?>