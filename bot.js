// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// This is the URL of a search for the latest tweets on the '#mediaarts' hashtag.
var queryParams = {count:1, trim_user: false};  // Im making this false so I can make sure the tweet is "rabbit season || duck season"

// This function finds the latest tweet with the #mediaarts hashtag, and retweets it.
function retweetLatest() {
	T.get('statuses/mentions_timeline', queryParams, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...


	  	

	  	console.log("*********************************************\n******************************\n" +data[0].text + "\n*********************************\n***********************************\n");
		var retweetId = data[0].user.screen_name;

		//This is where we get the text to check for the tweet text
		var tweetText = data[0].text;
		var targetStatus = '@' + data[0].user.screen_name + " ";

			/*
			if(tweetText.indexOf("rabbit season") > -1 || tweetText.indexOf("duck season") > -1) {
				if(Math.random() >= .5){
					targetStatus = "rabbit season";
				} else {
					targetStatus = "duck season";
				}
			}
			*/

			// find how many instances of ! there are
			var i = tweetText.indexOf("!");
			var exCount = 0;
			while(tweetText.charAt(i) == '!'){
				console.log("found an exclamation");
				exCount += 1;
				i+=1;
			}


			if(tweetText.indexOf("rabbit season") > -1) {
				console.log("tweet contained rabbit season");
				if(Math.random() >= .8){
					targetStatus += "rabbit season";
				} else {
					targetStatus += "duck season";
				}
			} else if(tweetText.indexOf("duck season") > -1){
				console.log("tweet contained duck season");
				if(Math.random() >= .2){
					targetStatus += "rabbit season";
				} else {
					targetStatus += "duck season";
				}
			} else {
				console.log("tweet contained neither");
				targetStatus += "rabbit season";
			}

			console.log(targetStatus);
			while(exCount >= 0){
				console.log("adding an exclamation");
				console.log("exount is " + exCount);
				targetStatus += "!";
				exCount -= 1;
			}
		

		//var targetStatus = "";
		// ...and then we tell Twitter we want to retweet it!
		T.post('statuses/update', {status: targetStatus}, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}

// Try to retweet something as soon as we run the program...
retweetLatest();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweetLatest, 1000 * 60 * 60);
