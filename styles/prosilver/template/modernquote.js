(function ($) {
    $('.postbody .content').mouseup(function(e) {
	$('.floatquote').remove();
	var selected = window.getSelection();
	var selectedText = selected.toString();
	if (selectedText) {
	    $(this).parents('.postbody').prepend(quotebtn);
	}
    });
    $('.postbody').on('click', '.floatquote', function(e) {
	e.preventDefault();
	// Gather data
	var post = $(this).parents('.post');
	var post_id = post.prop('id').replace(/[^0-9]/g, '');
	var username = post.find('.username-coloured').first().text();
	var poster_id = post.find('.row_poster_id').text();
	var post_time = post.find('.row_post_time').text();
        var forum_id = $('#nav-breadcrumbs .crumb').last().attr('data-forum-id');
        if ($('.floatquote').hasClass('qr')) {
            addquote(post_id, username, '{LA_WROTE}', {post_id:post_id, time:post_time, user_id:poster_id});
            $('.floatquote').remove();
        } else {
            var selected = window.getSelection();
            var selectedText = selected.toString();
            var quote_url = post.find('.post-buttons i.fa-quote-left').parents('a.button').attr('href');
            window.location.href = quote_url + '&post_text=' + selectedText;
        }
    });
})(jQuery);