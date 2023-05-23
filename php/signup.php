<?php

require('database.php');

// Start Coding
$email = $_POST['email'];
$password = $_POST['password'];

$otp = rand(123456, 654321);

// get signupdata
$get_data = 'SELECT * FROM signup';
$response = $db->query($get_data);

// Check if there is any data
if ($response) {

    $insert_data = "INSERT INTO signup(email, password, otp) 
    VALUES('$email', '$password', '$otp')";

    // Insert new data
    if ($db->query($insert_data)) {

        // send mail notification
        if (mail($email, "CHAT-GPT", "Please do not share your OTP with others, Your OTP is : " . $otp)) {

            echo "success";

        } else {
            echo "MAIL NOT SENT";
        }

    } else {

        echo "ERROR WHILE INSERTING INTO signup";
    }


} else {

    // create a new table
    $create_table = "CREATE TABLE signup(

        id INT(11) NOT NULL AUTO_INCREMENT,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(50) NOT NULL,
        otp VARCHAR(11) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        PRIMARY KEY (id)

    )";

    if ($db->query($create_table)) {

        $insert_data = "INSERT INTO signup(email, password, otp) 
        VALUES('$email', '$password', '$otp')";

        // Insert new data
        if ($db->query($insert_data)) {

            // send mail notification
            if (mail($email, "CHAT-GPT", "Please do not share your OTP with others, Your OTP is : " . $otp)) {

                echo "success";

            } else {
                echo "MAIL NOT SENT";
            }

        } else {

            echo "ERROR WHILE INSERTING INTO signup";
        }

    } else {
        echo "ERROR";
    }
}

?>