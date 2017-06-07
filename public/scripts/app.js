$(document).ready(function () {

//---------------------------------- Create tweet element/object and prep for render ---------------------------------------//
function createTweetElement(tweet) {
  let $avatar = $("<img/>", { src: tweet.user.avatars.small }).addClass("avatars");
  let $name = $('<span/>', { text: tweet.user.name }).addClass("fullName");
  // same as above, but different syntax
  let $handle = $('<handle>').text(tweet.user.handle).addClass("handle");
  let $flag = $('<i/>').addClass('fa fa-flag');
  let $retweet = $('<i/>').addClass('fa fa-retweet');
  let $heart = $('<i/>').addClass('fa fa-heart');
  let $content = $('<p/>', { text: tweet.content.text }).addClass("content");
  let $age = $('<span/>', { text: tweet.created_at }).addClass("age");
  let $header = $('<header/>')
  let $footer = $('<footer/>')
  let $icons = $('<div/>').addClass("icons");
  let $article = $('<article/>').addClass('content-article');
  let $section = $('<section/>');

  // Creation of new tweet
  $header.append($avatar, $name, $handle);
  $icons.append($flag, $retweet, $heart);
  $footer.append($age, $icons);
  $article.append($header, $content, $footer);
    return $article;

}

//----------------------------------------------- Render Tweets ----------------------------------------------------//
function renderTweets(tweets) {
  for (let pastTweet of tweets) {
    $('#existing-tweets').prepend(createTweetElement(pastTweet));
  }
}

loadTweets();

//----------------------------------- Submit new tweet, POST method, Ajax ------------------------------------------//
$('.new-tweet form').on('submit', function(event) {
  event.preventDefault();
  let text = $('.new-tweet textarea');
  let tweetText = $(this).find('[name=text]').val();

  if (tweetText === '') {
    $('.too-short').slideDown(function() {
    setTimeout(function() {
      $('.too-short').slideUp();
      }, 5000);
    });
    return;
  }

  if (tweetText.length > 140) {
    $('.too-long').slideDown(function() {
    setTimeout(function() {
      $('.too-long').slideUp();
      }, 5000);
    });
    return;
  }

  $.ajax({
    method: 'POST',
    url: '/tweets',
    data : text.serialize(),
  }).then(loadTweets);
  
});


//----------------------------- post new Tweets into existing tweet thread, GET method, Ajax  ------------------------------//
function loadTweets() {
  $.ajax({
    method: 'GET',
    url: '/tweets',
  }).then(function(tweets) {
    renderTweets(tweets);
  })
};

//-------------------------------------- Compose Button Event Handler --------------------------------------------------//
$('.compose').on('click', function(event) {
  $('.new-tweet').slideToggle(function() {
    $('#text').focus();
  });
});

$('.dual-compose').on('click', function(event) {
  $('.new-tweet').slideToggle(function() {
    $('#text').focus();
  });
});

//------------------------------------------------------- Close -------------------------------------------------------------------//
});