// var letterCount = document.querySelector('span.counter')
// letterCount.addEventListener('change', function(event) {
// });

$(document).ready(function() {
    $('.new-tweet textarea').on('keyup', function() {
        let maxText = 140;
        let textLength = $(this).val().length;
        let textRemaining = maxText - textLength;
        if (textRemaining < 0) {
            $(this).parent().find('.counter').css('color', 'red')
        } else {
            $(this).parent().find('.counter').css('color', 'black')
        }
        $(this).parent().find('.counter').text(textRemaining);
    });
});