$(document).ready(function () {

    $(".search-btn").click(function (e) {
        e.preventDefault();

        let question = $(".user-question").val();

        $.ajax({
            type: "POST",
            url: "php/user.php",
            data: {
                question: question
            },
            beforeSend: function () {

            },
            success: function (response) {

                $(".gpt-box").addClass("d-none");
                $(".answer-box").removeClass("d-none");
                $(".question").html(question);

                if (response.trim() != "Unable to give answer, we will update this question soon !") {

                    let answer_el = document.querySelector(".answer");
                    let data = JSON.parse(response.trim());
                    let array_text = [data.answer];
                    let char_index = 0;

                    animation(); // calling...

                    // animation function coding
                    function animation() {

                        char_index++;
                        answer_el.innerHTML = array_text[0].slice(0, char_index) + " | ";

                        setTimeout(() => {
                            animation(); // calling...
                        }, 30);
                    }

                }
                else {

                    $(".answer").html(response.trim());
                }
            }
        });
    });
});