$(document).ready(function () {

    $(".upload-form").on("submit", function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "php/dashboard.php",
            data: {
                question: $(".question").val().toLowerCase(),
                answer: $(".answer").val(),
            },
            beforeSend: function () {

            },
            success: function (response) {

                if (response.trim() == "success") {

                    swal("ADDED !", "Question And Answer Added Successfully", "success");
                    document.querySelector(".upload-form").reset();
                }
                else {

                    swal("ERROR !", response.trim(), "warning");
                }
            }
        });
    });
});