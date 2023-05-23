<?php

require('database.php');

// Start Coding
$email = $_POST['email'];
$password = $_POST['password'];

$check_email = "SELECT email FROM signup WHERE email = '$email'";
$reponse = $db->query($check_email);

if ($reponse->num_rows != 0) {

    $check_pass = "SELECT password FROM signup WHERE email = '$email' AND password = '$password'";
    $pass_res = $db->query($check_pass);

    if ($pass_res->num_rows != 0) {

        $check_status = "SELECT status FROM signup WHERE email = '$email' AND status = 'active'";
        $status_res = $db->query($check_status);

        if ($status_res->num_rows == 0) {

            $get_otp = "SELECT otp FROM signup WHERE email = '$email'";
            $otp_res = $db->query($get_otp);
            $data = $otp_res->fetch_assoc();
            $new_otp = $data['otp'];

            // send mail notification
            if (mail($email, "CHAT-GPT", "Please do not share your OTP with others, Your OTP is : " . $new_otp)) {

                echo "status pending";

            } else {
                echo "MAIL NOT SENT";
            }

        } else {

            echo "Login success";
        }

    } else {

        echo "Password Not Matched";
    }

} else {

    echo "wrong Username";
}

?>