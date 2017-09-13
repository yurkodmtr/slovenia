"use strict";



var soon = function(){

	/* smoothScroll */
	var smoothScroll = function(){
		$('a[href*="#"]:not([href="#"])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 200);
					return false;
				}
			}
		});
	}

	function vidRescale(){
		var w = $(window).outerWidth()+400,
		h = $(window).outerHeight()+400;

		$('.video-foreground iframe').css('min-height', h+'px');
		$('.video-foreground iframe').css('min-width', w+'px');

	}
	
	

	$(window).load(function(){
		smoothScroll();
		
		$('.pop_confirm .close').click(function(){
			$('.pop_confirm').fadeOut('slow');
		});

		$('.page_1 .more span').click(function(){
			$(".main").moveDown();
		});

		vidRescale();

		/* form */
		$('.form').submit(function(event){
			event.preventDefault();

			var email = $(this).find('input[type="email"]').val(); 

			$.ajax({
	            url: "mailchimp.php",
	            type: 'POST',
	            dataType: 'json',
	            data: {
	                email: email
	            },
	            success: function (data) {
                	$('.pop_confirm .ok').show();
                	$('.pop_confirm').fadeIn();
                	setTimeout(function(){
                		$('.pop_confirm').fadeOut('slow', function(){
                			$('.pop_confirm .resp_text').hide();
                		});	                		
                	}, 4000);	                
	            },
	            error: function (data) {
	            	$('.pop_confirm .error').show();
	                $('.pop_confirm').fadeIn();
                	setTimeout(function(){
                		$('.pop_confirm').fadeOut('slow', function(){
                			$('.pop_confirm .resp_text').hide();
                		});	
                	}, 4000);
	            }
	        });

		});
	});

	$(window).resize(function(){
		vidRescale();
	});

}

soon();
