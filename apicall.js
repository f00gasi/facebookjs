    window.fbAsyncInit = function() {
      var token = '1547280538876319|g1LM9mQCvr6qIQ7zKHzNRASz1fI';
      FB.init({
        appId      : '1547280538876319',
        xfbml      : true,
        version    : 'v2.2'
      });
      FB.api(
        '/548395945199562/feed?access_token='+token, function (response) {
        if (response && !response.error) {
          jQuery('#facebookFeed').fbFeed(response,token);
        }
        if(response.error){
          console.log(response.error);
        }
      }
      );
    };