// Init
var fqcookie = cookie_name + '_fqcookie';
var multiquote_ary = [];
var mqcookie = cookie_name + '_mqcookie';

// Set floatquote cookie
function setfqcookie(val) {
    // clear anything in it first
    document.cookie = fqcookie + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=' + cookie_path;
    var d = new Date();
    d.setTime(d.getTime() + (30*1000)); // 30 secs
    var expires = "expires="+ d.toUTCString();
    document.cookie = fqcookie + "=" + encodeURIComponent(val) + "; " + expires + "; path=" + cookie_path;
}

// Set multiquote cookie
function setmqcookie() {
    var d = new Date();
    d.setTime(d.getTime() + (24*3600*1000)); // 1 day
    var expires = "expires="+ d.toUTCString();
    var newval = '';
    if (multiquote_ary.length) { 
        newval = multiquote_ary.join("|");
    }
    document.cookie = mqcookie + "=" + newval + "; " + expires + "; path=" + cookie_path;
}

// Get multiquote cookie content and load in array
function getmqcookie() {
    var nameEQ = mqcookie + "=";
	var allcookies = document.cookie.split(';');
	for(var i=0;i < allcookies.length;i++) {
		var c = allcookies[i];
		while (c.charAt(0)==' ') { 
            c = c.substring(1,c.length); 
        }
		if (c.indexOf(nameEQ) == 0) {
            value = c.substring(nameEQ.length,c.length); 
            if (value.length) {
                multiquote_ary = value.split('|');
            }
        }
	}
	return null;
}
// Clearh cookie
function clearmqcookie() {
    document.cookie = mqcookie + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=' + cookie_path;
    multiquote_ary = [];
}

// Load multiquote div
function showmqdiv() {
    if (multiquote_ary.length) {
        $('#wrap').append('<div class="multiquote-wrap"><p>' + l_mq_multiquote_action + clearbtn + '</p>' + quotebtn + '</div>');
        var quote_url = $('.postbody').find('.hide.postdetails').first().attr('data-quote-url') + '&multiquote=' + multiquote_ary.join(';');
        $('.floatquote').attr('href', quote_url);
        $('.floatquote').addClass('multi');
        $('.floatquote .icon').before(' (' + multiquote_ary.length + ') ');
        
        $.each(multiquote_ary, function(index, value) {
            if ($(".multiquote[data-post-id='" + value + "']").length > -1) {
                $(".multiquote[data-post-id='" + value + "']").addClass('active-quote');
            }
            
        });
    }
}

// Clear multiquote
function mqClear() {
    clearmqcookie();
    $('.multiquote-wrap').remove();
    $('.multiquote').removeClass('active-quote');
}

// Select text and show button
function highlightbtn(element, relativeX, relativeY) {
    $('.floatquote').remove();
    $('.multiquote-wrap').remove();
    var selected = window.getSelection();
    var selectedText = selected.toString();
    if (selectedText) {
        element.prepend(quotebtn);
        element.addClass('hasquotebtn');
        $('.floatquote').attr('title', l_mq_quote_selection);
        if (relativeX > -1) {
            $('.floatquote').css({
                'margin-top': relativeY,
                'margin-left': relativeX
            });
        } else {
            $('.floatquote').css({
                'margin-top': relativeY,
                'left': 'calc(100% - ' + $('.floatquote').width() + 'px'
            });
        }
    }
}

function removebtns() {
    var selected = window.getSelection();
    var selectedText = selected.toString();
    if (!selectedText) {
        $('.floatquote').remove();
        $('.postbody .content').removeClass('hasquotebtn');
    }
}
    
// Handle multiquotes
function multiquote(element) {
    $('.floatquote').remove();
    $('.multiquote-wrap').remove();
    
    post_id = $(element).attr('data-post-id');
    multiquote_ary = multiquote_ary.filter(function (item) {
        return item !== post_id;
    });
    if ($(element).hasClass('active-quote')) {
        $(element).removeClass('active-quote');
    } else {
        multiquote_ary.push(post_id);
        $(element).addClass('active-quote');
        setmqcookie();
    }
    showmqdiv();
    return;
}

(function ($) {
    // Load any quotes from cookie when doc ready
    getmqcookie();
    showmqdiv();
   
    // Highlight text for quote
    $('.postbody .content').mouseup(function (e) {
        if (!$(this).hasClass('hasquotebtn')) {
            var offset = $(this).offset();
            var relativeX = (e.pageX - offset.left);
            var relativeY = (e.pageY - offset.top);
            highlightbtn($(this), relativeX, relativeY);
        } else {
            removebtns();
        }
    });
    
    // Touchy variant
    $('.postbody .content').on('touchend', function(e){
        if (!$(this).hasClass('hasquotebtn')) {
            var offset = $(this).offset();
            var relativeY = (e.originalEvent.changedTouches[0].pageY - offset.top) + 10; // Scaling
            highlightbtn($(this), -1, relativeY);
        } else {
            removebtns();
        }
    });
    
    // Handle selective quote action 
    $('.postbody').on('click', '.floatquote', function (e) {
        $('.postbody .content').removeClass('hasquotebtn');
        e.preventDefault();
        var post = $(this).parents('.post');
        var post_id = post.prop('id').replace(/[^0-9]/g, '');
        var postdetails = post.find('.postdetails');
        if ($('.floatquote').hasClass('qr')) {
            // Use built-in method 
            var username = postdetails.attr('data-poster-name');
            var poster_id = postdetails.attr('data-poster-id');
            var post_time = postdetails.attr('data-posttime');
            addquote(post_id, username, l_wrote, {post_id: post_id, time: post_time, user_id: poster_id});
            $('.floatquote').remove();
            $('.multiquote-wrap').remove();
        } else {
            var selected = window.getSelection();
            setfqcookie(selected.toString());
            var quote_url = postdetails.attr('data-quote-url');
            window.location.href = quote_url;
        }
        
    });
})(jQuery);
