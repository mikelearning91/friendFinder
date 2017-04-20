var nameComplete = false;
var photoComplete = false;

function checkForm() {
    if (nameComplete && photoComplete) {
        $("#submit-button").removeAttr("disabled");
        $('#instructions').hide();
    } else {
        $("#submit-button").attr("disabled", true);
    }
}

function hasSuccess(divID, spanID) {
    $(divID).removeClass("has-error has-feedback");
    $(divID).addClass("has-success has-feedback");
    $(spanID).removeClass("glyphicon glyphicon-remove form-control-feedback");
    $(spanID).addClass("glyphicon glyphicon-ok form-control-feedback");
}

function hasError(divID, spanID) {
    $(divID).removeClass("has-success has-feedback");
    $(divID).addClass("has-error has-feedback");
    $(spanID).removeClass("glyphicon glyphicon-ok form-control-feedback");
    $(spanID).addClass("glyphicon glyphicon-remove form-control-feedback");
}


$(document).ready(function() {

    $("#name").keyup(function() {
        if ($("name").val() != "") {
            nameComplete = true;
            hasSuccess("#name-group", "#name-span");
        } else {
            nameComplete = false;
            hasError("#name-group", "#name-span");
        }
        checkForm();
    });

    $("#photo").keyup(function() {
        if ($("photo").val() != "") {
            console.log($('#photo').val());
            photoComplete = true;
            hasSuccess("#photo-group", "#photo-span");
        } else {
            photoComplete = false;
            hasError("#photo-group", "#photo-span");
        }
        checkForm();
    });

    $('#submit-button').on('click', function() {
        var newFriend = {
            name: $('#name').val().trim(),
            photo: $('#photo').val().trim(),
            question1: parseInt($('#question1').val().replace(/[^0-9 | ^.]/g, '')),
            question2: parseInt($('#question2').val().replace(/[^0-9 | ^.]/g, '')),
            question3: parseInt($('#question3').val().replace(/[^0-9 | ^.]/g, '')),
            question4: parseInt($('#question4').val().replace(/[^0-9 | ^.]/g, '')),
            question5: parseInt($('#question5').val().replace(/[^0-9 | ^.]/g, '')),
            question6: parseInt($('#question6').val().replace(/[^0-9 | ^.]/g, '')),
            question7: parseInt($('#question7').val().replace(/[^0-9 | ^.]/g, '')),
            question8: parseInt($('#question8').val().replace(/[^0-9 | ^.]/g, '')),
            question9: parseInt($('#question9').val().replace(/[^0-9 | ^.]/g, '')),
            question10: parseInt($('#question10').val().replace(/[^0-9 | ^.]/g, ''))
        }
        $.post('http://localhost:3000/api/friends', newFriend).then(function(response) {
            //change link to Heroku link

            //modal pop up
            $('#match-image').attr('src', response.photo);
            $('#match-name').text(response.name);
            $('#message').text('You should be friends with ' + response.name + '!')
            $('#modal').modal('show');
        });
        return false;
    });
});

// Image Preview
$(document).ready(function() {
    $(document).on('change', '.btn-file :file', function() {
        var input = $(this),
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function(event, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = label;

        if (input.length) {
            input.val(log);
        } else {
            if (log) console.log(log);
        }

    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('#img-upload').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function() {
        readURL(this);
    });
});