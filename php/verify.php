<?php

require('database.php');

$email = $_POST['email'];
$otp = $_POST['otp'];

$get_data = "SELECT otp FROM signup WHERE email = '$email' AND otp = '$otp'";
$reponse = $db->query($get_data);

if ($reponse->num_rows != 0) {

    $update_status = "UPDATE signup SET status = 'active' WHERE email = '$email'";

    if ($db->query($update_status)) {

        echo "success";
    } else {

        echo "upable to update status";
    }
} else {

    echo "Please Enter Correct OTP";
}

?>