$(document).ready(function () {
    $(".signup-form").submit(function (event) {
        event.preventDefault();

        let email = $(".email").val();

        // validation check
        if ($(".email").val() != "" && $(".password").val() != "") {

            $.ajax({
                type: "POST",
                url: "php/signup.php",
                data: {
                    email: $(".email").val(),
                    password: $(".password").val()
                },
                cache: false,
                beforeSend: function () {
                    $(".signup-btn").html("Please Wait...");
                    $(".signup-btn").attr("disabled", true);
                },
                success: function (response) {
                    $(".signup-btn").html("Signup");
                    $(".signup-btn").attr("disabled", false);

                    if (response.trim() == "success") {

                        $(".signup-form").addClass("d-none");
                        $(".otp").removeClass("d-none");
                        $(".verify-btn").removeClass("d-none");

                        // verify otp btn coding
                        $(".verify-btn").click(function () {

                            $.ajax({
                                type: "POST",
                                url: "php/verify.php",
                                data: {
                                    otp: $(".otp").val(),
                                    email: email
                                },
                                beforeSend: function () {
                                    $(".verify-btn").html("Please Wait...");
                                    $(".verify-btn").attr("disabled", true);
                                },
                                success: function (response) {

                                    if (response.trim() == "success") {

                                        $(".verify-btn").html("Verify");
                                        $(".verify-btn").attr("disabled", false);
                                        $(".signup-form").removeClass("d-none");
                                        $(".signup-form").trigger("reset");
                                        $(".otp").addClass("d-none");
                                        $(".verify-btn").addClass("d-none");

                                        swal("Verification Done !", "You can login now", "success");
                                    }
                                    else {

                                        $(".verify-btn").html("Verify");
                                        $(".verify-btn").attr("disabled", false);

                                        swal(response.trim(), response.trim(), "warning");
                                    }
                                }
                            });
                        });

                    }
                    else {

                        swal(response.trim(), response.trim(), "warning");
                    }
                }
            });
        }
        else {

            swal("Empty Fields Error !", "All Fields Are Required !", "warning");
        }

    })
});