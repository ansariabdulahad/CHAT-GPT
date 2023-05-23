// Start login coding

$(document).ready(function () {
    $(".login-form").submit(function (e) {
        e.preventDefault();

        var email = $(".email").val();

        $.ajax({
            type: "POST",
            url: "php/login.php",
            data: {
                email: $(".email").val(),
                password: $(".password").val()
            },
            beforeSend: function () {
                $(".btn-login").html("Please Wait...");
                $(".btn-login").attr("disabled", true);
            },
            success: function (response) {

                $(".btn-login").html("Login");
                $(".btn-login").attr("disabled", false);

                if (response.trim() === "status pending") {

                    $(".login-form").addClass("d-none");
                    $(".otp").removeClass("d-none");
                    $(".verify-btn").removeClass("d-none");

                    $(".verify-btn").click(function () {

                        $.ajax({
                            type: "POST",
                            url: "php/verify.php",
                            data: {
                                email: email,
                                otp: $(".otp").val(),
                            },
                            beforeSend: function () {
                                $(".verify-btn").html("Please Wait...");
                            },
                            success: function (response) {

                                if (response.trim() === "success") {

                                    window.location = "user.html";

                                }
                                else {

                                    alert(response.trim());
                                }
                            }
                        });
                    });

                }
                else if (response.trim() === "Login success") {

                    window.location = "user.html";

                }
                else {

                    alert(response.trim());
                }
            }
        });
    })
});