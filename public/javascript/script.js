var nameComplete = false;
var photoComplete = false;
var photoFile = $('#photo');

function checkForm() {
    if (nameComplete && photoComplete) {
        $("#submit-button").removeAttr("disabled");
        $('#instructions').hide();
    } else {
        $("#submit-button").attr("disabled", true);
        $("#submit-button").attr("title", "Please check if all fields are filled in");
    }
}

function resetFormValidation(divID, spanID, divIDTwo, spanIDTwo) {
    $(divID).removeClass("has-success has-feedback");
    $(spanID).removeClass("glyphicon glyphicon-ok form-control-feedback");
    $(divIDTwo).removeClass("has-success has-feedback");
    $(spanIDTwo).removeClass("glyphicon glyphicon-ok form-control-feedback");
    $("#img-upload").attr('src', '');
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

    $('#submit-button').on('click', function() {
        // =================
        // FIRST: upload photo file
        // =================
        var files = $("#photo").get(0).files;

        // preparing/checking for file to make ajax post
        if (files.length > 0) {
            // create a FormData object which will be sent as the data payload in the
            // AJAX request
            var formData = new FormData();

            // loop through (all) the selected files and add them to the formData object
            // future use: may want to upload multiple files (which can be set in file-routes.js, line 14)
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                // add the files to formData object for the data payload
                formData.append('uploads[]', file, file.name);
            }
            // ajax post for photo file
            $.ajax({
                url: '/uploads',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(data) {
                    console.log('upload successful!\r\n' + data);
                },
                xhr: function() {
                    // create an XMLHttpRequest
                    var xhr = new XMLHttpRequest();
                    return xhr;
                }
            });

        }

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

        $.post('https://fierce-headland-26934.herokuapp.com/api/friends', newFriend).then(function(response) {
            //change link to Heroku link

            //modal pop up
            if (response.name === undefined) {
                $(".modal-title").html("Yikes! We got buddy troubles.");
                $('#match-name').text('Sorry ' + newFriend.name + "! This silly app is so unpopular at this point, we don't have enough buddies to find everybody matches. This is our fault, not yours! We Love You " + newFriend.name + "!");
                $('#match-image').attr('src', "/uploads/heart.png");
                $('#modal').modal('show');
            } else {
                $(".modal-title").html("You have a match!");
                $('#match-image').attr('src', "/uploads/" + response.photo_name);
                console.log(response.photo_name);
                $('#match-name').text(response.name);
                $('#message').text('You should be friends with ' + response.name + '!');
                $('#modal').modal('show');
            }

            $('#buddy-form').each(function() {
                this.reset();
                resetFormValidation("#name-group", "#name-span", "#photo-group", "#photo-span");
            });
        });
        return false;
    });
});


$(document).ready(function() {

    // Image Preview before form submit
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

    // validate name field
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

    // validates on click if image exists in input field
    // also validates on 'change', see line 141
    $('.btn-file').on('click', function() {
        $('#img-upload').each(function() {
            if (photoFile.val() != '') {
                photoComplete = true;
                hasSuccess('#photo-group', '#photo-span');
                $("#img-upload").show();

            } else {
                photoComplete = false;
                hasError('#photo-group', '#photo-span');
            }
        });
        checkForm();
    });

    $('#photo').on('change', function() {
        // run readURL to preview file
        readURL(this);

        // validate if image exists in input field on change
        if (photoFile.val() != '') {
            photoComplete = true;
            hasSuccess('#photo-group', '#photo-span');
            $("#img-upload").show();

        } else {
            photoComplete = false;
            hasError('#photo-group', '#photo-span');
            $("#img-upload").attr("src", "");
            $("#img-upload").hide();
        }

        checkForm();
    });
});