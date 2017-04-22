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

$("#name").keyup(function() {
    if ($(this).val() !== "") {
        nameComplete = true;
        hasSuccess("#name-group", "#name-span");
    } else {
        nameComplete = false;
        hasError("#name-group", "#name-span");
    }
    checkForm();
});


$(document).ready(function() {

    $('#submit-button').on('click', function() {

        var newFriend = {
            name: $('#name').val().trim(),
            photo_name: $('#photo-name').val().trim(),
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
        };
        $.post('http://localhost:3000/api/friends', newFriend).then(function(response) {
            //change link to Heroku link

            //modal pop up
            $('#match-image').attr('src', "/uploads/" + response.photo_name);
            console.log(response.photo_name);
            $('#match-name').text(response.name);
            $('#message').text('You should be friends with ' + response.name + '!');
            $('#modal').modal('show');
        });
        return false;
    });
});

// Image Preview before form submit
$(document).ready(function() {
    $(document).on('change', '.btn-file :file', function() {
        var input = $(this),
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function(event, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = label;

        if (input.length)
            input.val(log);


    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('#img-upload').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    $('#photo').on('change', function() {
        // run readURL to preview file
        readURL(this);

        // validate form for photo field
        // NOTE::::: this is an odd work-around - wouldn't validate on :file input field's ".val()" for some reasion
        // Find better way to validate
        if ($("#img-upload").attr('src') !== " ") {
            photoComplete = true;
            hasSuccess('#photo-group', '#photo-span', '#photo', '#photo-name');
            $("#img-upload").show();
        } else {
            photoComplete = false;
            hasError('#photo-group', '#photo-span', '#photo', '#photo-name');
        }
        checkForm();

        // upload file
        var files = $(this).get(0).files;

        if (files.length > 0) {
            // create a FormData object which will be sent as the data payload in the
            // AJAX request
            var formData = new FormData();

            // loop through all the selected files and add them to the formData object
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                // add the files to formData object for the data payload
                formData.append('uploads[]', file, file.name);
            }

            $.ajax({
                url: '/uploads',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(data) {
                    console.log('upload successful!\n' + data);
                },
                xhr: function() {
                    // create an XMLHttpRequest
                    var xhr = new XMLHttpRequest();
                    return xhr;
                }
            });

        }
    });
});