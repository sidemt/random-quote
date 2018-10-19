$(document).ready(function() {
  // Get a quote on opening the page
  getQuote();
  
  // Get a new quote on clicking "New quote" button
  $("#new-quote").on("click", function(){
    getQuote();
  });

  // Function to get random quote from API
  function getQuote() {
    // Generate random number between 0-9
    var randNum = Math.floor(Math.random() * 10);
    // Get quote from API
    $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10&callback=", function(json) {
      $(".quote").html("<p>" + json[randNum].content + "</p><p>&mdash; " + json[randNum].title + "</p>");
      // Create Tweet button with the random quote which is currently displayed
      createTweetBtn();
    });
  }
  
  // Function to create Tweet button
  // (Sample code taken from https://qiita.com/tkosuga@github/items/78266333790ed9479c8a )
  function createTweetBtn(){
    // Initialize
    $(function() {
      var d = document;
      var s = 'script';
      var id = 'twitter-wjs';
      var js, fjs = d.getElementsByTagName(s)[0];
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);
      }
    });

    // Wait if initialize of twttr (platform.twitter.com/widgets.js) is not complete yet
    function callAfterTwitterInitialization(callback){
      if(typeof twttr !== "undefined"){
        callback();
      } else {
        setTimeout(function(){
            callAfterTwitterInitialization(callback);
        }, 100);
      }
    }

    var shareUrl = "https://codepen.io/sidemt/full/jZrPJO/";
    var targetId = "twitter-share-button";
    var message = $(".quote").text();
    var hashtag = "freeCodeCamp";
    // Shorten the message so that the tweet is within 280 characters
    if (message.length >= 140) {
      message = message.slice(0, 140) + "...";
    }

    // Create Tweet button if twttr is ready
    callAfterTwitterInitialization(function(){
      $('#' + targetId).empty();
      twttr.widgets.createShareButton(
        shareUrl,
        document.getElementById(targetId),
        {
          count: 'none',
          text: message,
          size: "large",
          hashtag: hashtag
        }
      );
    });
  } // End of createTweetBtn()
  
});