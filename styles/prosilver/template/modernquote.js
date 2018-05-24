var multiquote_ary = [];
(function ($) {
    $('.multiquote').click(function(e) {
        $('.floatquote').remove();
        $('.multiquote-wrap').remove();

        var post_id = $(this).attr('data-post-id');
        multiquote_ary = multiquote_ary.filter(function(item) {
            return item !== post_id;
        });
        if ($(this).hasClass('active-quote')) {
            $(this).removeClass('active-quote');
        } else {
            multiquote_ary.push(post_id);
            $(this).addClass('active-quote');
        }
        
        if (multiquote_ary.length) {
            $('#wrap').append('<div class="multiquote-wrap"><p>' + l_mq_multiquote_action + '</p>' + quotebtn + '</div>');
            var quote_url = $('#page-body').find('.post-buttons i.fa-quote-left').first().parents('a.button').attr('href') + '&multiquote=' + multiquote_ary.join(';');
            $('.floatquote').attr('href', quote_url);
            $('.floatquote').addClass('multi');
            $('.floatquote .icon').before(' (' + multiquote_ary.length + ') ')
        }
    });
    
    
    $('.postbody .content').mouseup(function(e) {
	$('.floatquote').remove();
        $('.multiquote-wrap').remove();
	var selected = window.getSelection();
	var selectedText = selected.toString();
	if (selectedText && (selectedText.length < 6000)) {
	    $(this).parents('.postbody').prepend(quotebtn);
            $('.floatquote').attr('title', l_mq_quote_selection);
            var offset = $(this).offset();
            var relativeX = (e.pageX - offset.left);
            var relativeY = (e.pageY - offset.top);
            $('.floatquote').css({
                    'margin-top': relativeY,
                    'margin-left': relativeX
                });
	}
    });
    $('.postbody').on('click', '.floatquote', function(e) {
	e.preventDefault();
        
        if ($('.floatquote').hasClass('multi')) {
            var quote_url = $('#page-body').find('.post-buttons i.fa-quote-left').first().parents('a.button').attr('href');
            window.location.href = quote_url ;

        } else {
            // Gather data
            var post = $(this).parents('.post');
            var post_id = post.prop('id').replace(/[^0-9]/g, '');
            if ($('.floatquote').hasClass('qr')) {
                var postdetails = post.find('.postdetails');
                var username = postdetails.attr('data-poster-name');
                var poster_id = postdetails.attr('data-poster-id');
                var post_time = postdetails.attr('data-posttime');
                addquote(post_id, username, '{LA_WROTE}', {post_id:post_id, time:post_time, user_id:poster_id});
                $('.floatquote').remove();
                $('.multiquote-wrap').remove();
            } else {
                var selected = window.getSelection();
                var selectedText = selected.toString();
                var quote_url = post.find('.post-buttons i.fa-quote-left').parents('a.button').attr('href');
                window.location.href = quote_url + '&post_text=' + selectedText;
            }
        }
    });
})(jQuery);