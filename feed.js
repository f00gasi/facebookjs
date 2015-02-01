(function($) { 
	$.fn.fbFeed = function (data,token){
		var container = $(this);
		var post;
		var img;
		var link;
		var socialdata;
		var username;
		FB.api(
		    "/548395945199562?access_token="+token,
		    function (getuserdata) {
		    	if (getuserdata && !getuserdata.error) {
		        	username = getuserdata;
		        	init(username);
		    	}
		    }
		);

		function init(userdataobj){
			$.each(data, function(i,value){

				$.each(value, function(i,obj){
					if(obj.hasOwnProperty('message')||obj.hasOwnProperty('picture')){
						var postURL ='http://www.facebook.com/'+userdataobj.username+'/posts/';
						var postID = this.id.split('_')[1];
						var postDIV = $('<div class="fbPost" />');
						postURL += postID;

						// MESSAGE
						if(this.message !== undefined){
							var msgtext = this.message;
							post = $('<p>')
									.addClass('message')
									.html(msgtext.replace(/\n/g , '<br />'))
									.css('margin-bottom' , '20px');
						}
						else {
							post = $('<p>')
									.addClass('message')
									.css('margin-bottom' , '20px')
									.html('Neues Foto hinzugefügt');
						}

						// LINK
						if(this.link !== undefined){
							link = '<br><a href="'+this.link+'" target="_blank">Beitrag ansehen</a>';
						}
						else{
							link = '<br><a href="'+postURL+'" target="_blank">Beitrag ansehen</a>';
						}

						// PICTURE
						if(this.picture !== undefined){
							var imglink = $('<a />').attr({
								'href' : this.link,
								'target' : '_blank'
							});
							img = $('<img>').attr('src' , this.picture);
							img.appendTo(imglink);
						}
						else{
							img = '';
						}

						// SOCIAL DATA
						if(this.likes !== undefined){
							socialdata = '<p>Likes: '+this.likes.data.length+'</p>';
						}
						if(this.comments !== undefined){
							socialdata += '<p>Comments: '+this.comments.data.length+'</p>';
						}

						postDIV.append(post,imglink,link,socialdata,'<hr />');

						container.append(postDIV);
					}
				});
			});
		}
	}
})(jQuery);