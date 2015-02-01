(function($) { 
	$.fn.fbFeed = function (data,token){
		var container = $(this);
		container.addClass('loading');
		container.append('<div class="spinner"></div');
		var post;
		var img;
		var link;
		var socialdata;
		var username;
		var count=0;
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
				var objcount = value.length;
				$.each(value, function(i,obj){
					if(obj.hasOwnProperty('message')||obj.hasOwnProperty('picture')){
						var postURL ='http://www.facebook.com/'+userdataobj.username+'/posts/';
						var postID = this.id.split('_')[1];
						var $postDIV = $('<div class="post-content" />');
						var $msgDiv = $('<div class="content-inner" />');
						var $socialDiv = $('<div class="social" />');
						postURL += postID;

						// MESSAGE
						if(this.message !== undefined){
							var msgtext = shortenText(this.message);
							post = $('<p>')
									.addClass('message')
									.html(msgtext.replace(/\n/g , '<br />'))
									.css('margin-bottom' , '20px');
							$msgDiv.append(post);
						}
						else {
							post = $('<p>')
									.addClass('message')
									.css('margin-bottom' , '20px')
									.html('Neues Foto hinzugefügt');
							$msgDiv.append(post);
						}

						// LINK
						if(this.link !== undefined){
							link = $('<a />')
									.attr({'href':this.link,'target':'_blank'})
									.html('Beitrag ansehen');
						}
						else{
							link = $('<a />')
									.attr({'href':postURL,'target':'_blank'})
									.html('Beitrag ansehen');
						}

						// DATE OF POST
						if(this.created_time !== undefined){
							var timestamp = this.created_time;
							var datestr = timestamp.substr(0,timestamp.indexOf('T'));
							var time = timestamp.substr(timestamp.indexOf('T')+1,5)
							datestr = convertDate(datestr);
							var $dateDiv = createDiv(datestr+'|'+time,link.attr('href'));
						}

						// PICTURE
						if(this.picture !== undefined){
							var imglink = $('<a />').attr({
								'href' : this.link,
								'target' : '_blank'
							});
							img = $('<img>').attr('src' , this.picture);
							img.appendTo(imglink);
							$msgDiv.append(imglink);
						}
						else{
							img = '';
						}

						// SOCIAL DATA
						if(this.likes !== undefined){
							socialdata = '<p><i class="fa fa-thumbs-up fa-1"></i> '+this.likes.data.length+'</p>';
						}
						if(this.comments !== undefined){
							socialdata += '<p><i class="fa fa-comment fa-1"></i> '+this.comments.data.length+'</p>';
						}
						$socialDiv.append(socialdata);

						$postDIV.append($dateDiv,$msgDiv,link,$socialDiv);

						container.append($postDIV);

						count++;
						if(count==objcount){
							console.log($postDIV);
							setTimeout(function(){
								container.removeClass('loading');
							},350);
						}
					}
					else {
						objcount--;
					}
				});
			});
			$(document).ready(function(){
				$('a.showmore').on('click',function(e){
					e.preventDefault();
					var hiddenSpan = $(this).siblings('span.hide');
					if(hiddenSpan.css('display') == 'none'){
						hiddenSpan.show();
						$(this).html('... Weniger anzeigen');
					}
					else{
						hiddenSpan.hide();
						$(this).html('... Mehr anzeigen');
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

		function createDiv(timestamp,link){
			while(timestamp){
				var div = $('<div />').addClass('post-meta');
				var a = $('<a />').attr({'href':link,'target':'_blank'});
				var datediv = $('<div />').addClass('date');
				var split = timestamp.split('|');
				var span1 = $('<span />').addClass('daymonth').html(split[0]);
				var span2 = $('<span />').addClass('time').html(split[1]);
				datediv.append(span1,span2);
				a.append(datediv);
				div.append(a);
				return div;
			}
		}

		function shortenText(text){
			var countchars = text.length;
			var maxlength = Math.floor(countchars/2);
			if(countchars > maxlength){
				var cutText = text.substr(0, maxlength);
				cutText = cutText.substr(0, Math.min(cutText.length, cutText.lastIndexOf(" ")));
				var secondHalf = text.substr(cutText.length, text.lastIndexOf(" "));
				var spanShow = '<span class="show">'+cutText+'</span>';
				var spanHide = '<span class="hide">'+secondHalf+'</span>';
				return spanShow+spanHide+' <a class="showmore" href="javascript:void(0)">... Mehr anzeigen</a>';
			}
		}
	}

})(jQuery);