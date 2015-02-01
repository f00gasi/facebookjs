(function($) { 
	$.fn.fbFeed = function (data,token){
		var container = $(this);
		var post;
		var img;
		var link;
		var socialdata;
		var username;
		var months = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
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
					//console.log(this);
					if(obj.hasOwnProperty('message')||obj.hasOwnProperty('picture')){
						var postURL ='http://www.facebook.com/'+userdataobj.username+'/posts/';
						var postID = this.id.split('_')[1];
						var postDIV = $('<div class="fbPost" />');
						postURL += postID;

						// DATE OF POST
						if(this.created_time !== undefined){
							var timestamp = this.created_time;
							var datestr = timestamp.substr(0,timestamp.indexOf('T'));
							var time = timestamp.substr(timestamp.indexOf('T')+1,5)
							datestr = convertDate(datestr);
							var $dateDiv = createDiv(datestr+'|'+time);
							console.log($dateDiv);
						}

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

						postDIV.append($dateDiv,post,imglink,link,socialdata,'<hr />');

						container.append(postDIV);
					}
				});
			});
		}

		function convertDate(date){
			var split = date.split('-');
			var d=new Date(date);
			var m=months[d.getMonth()];
			return split[2]+' '+m;
		}

		function createDiv(timestamp){
			while(timestamp){
				var div = $('<div />').addClass('date');
				var split = timestamp.split('|');
				var span1 = $('<span />').addClass('daymonth').html(split[0]);
				var span2 = $('<span />').addClass('time').html(split[1]);
				div.append(span1,span2);
				return div;
			}
		}
	}
})(jQuery);