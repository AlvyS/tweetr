$(document).ready(function () {

//---------------------------------- Create tweet element/object and prep for render ---------------------------------------//
function createTweetElement(tweet) {
  // console.log(tweet);
  let $avatar = $("<img/>", { src: tweet.user.avatars.small }).addClass("avatars");
  let $name = $('<span/>', { text: tweet.user.name }).addClass("fullName");
  let $handle = $('<handle>').text(tweet.user.handle).addClass("handle"); //this format also works.

  let $flag = $('<i/>').addClass('fa fa-flag');
  let $retweet = $('<i>').addClass('fa fa-retweet'); // <i> or <i/>
  let $heart = $('<i/>').addClass('fa fa-heart');


  let $content = $('<p/>', { text: tweet.content.text }).addClass("content");

  let $age = $('<span/>', { text: tweet.created_at }).addClass("age");
  let $header = $('<header/>')

  let $footer = $('<footer/>')

  let $icons = $('<div/>').addClass("icons");

  let $article = $('<article/>').addClass('content-article');

  let $section = $('<section/>');

  $header.append($avatar, $name, $handle);
  $icons.append($flag, $retweet, $heart);
  $footer.append($age, $icons);
  $article.append($header, $content, $footer);
  // $section.append($article);
    return $article;
  // return $section;
  // console.log($section);
}


//----------------------------------------------- Render Tweets ----------------------------------------------------//
function renderTweets(tweets) {
  for (let pastTweet of tweets) {
    $('#old-tweets').prepend(createTweetElement(pastTweet));
  }
}
// renderTweets();
loadTweets();


//----------------------------------- Submit new tweet, POST method, Ajax ------------------------------------------//
$('.new-tweet form').on('submit', function(event) {
  event.preventDefault();
  // console.log('tweet button clicked, preventing default');
  let text = $('.new-tweet textarea');
  let tweetText = $(this).find('[name=text]').val();
  // console.log("text is:", text);

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


//----------------------------- post new Tweets into old tweet thread, GET method, Ajax  ------------------------------//
function loadTweets() {
  $.ajax({
    method: 'GET',
    url: '/tweets',
  }).then(function(tweets) {
    renderTweets(tweets);
  })
};


//------------------------------------------------- Compose Button ----------------------------------------------------//
$('.compose').on('click', function(event) {
  $('.new-tweet').slideToggle(function() {
    $('#text').focus();
  });
});


//--------------------------------------- Template Database of Users(DUMMY DATA) --------------------------------------//
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


//------------------------------------------------------- Close -------------------------------------------------------------------//
});