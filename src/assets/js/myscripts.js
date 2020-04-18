// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};
function scrollFunction() {
    try
    {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("movetop").style.display = "block";
        } else {
            document.getElementById("movetop").style.display = "none";
        }
    }
    catch{}
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    $("html, body").animate({ scrollTop: "0" });
    document.documentElement.scrollTop = 0;
}

function submitSearchForm() {
    $('#searchForm').submit();
}

function closeSearchForm() {
    $('#searchForm').parent().removeClass('active');
}

function checkComment() {
    if ($('#errorGuestName').val().trim() == '') {
        $('#guestName').html('Please enter your name')
        return false;
    }
    if ($('#errorGuestEmail').val().trim() == '') {
        $('#guestEmail').html('Please enter your email')
        return false;
    }
    if ($('#errorContentComment').val().trim() == '') {
        $('#contentComment').html('Please enter content')
        return false;
    }
    return true;
}