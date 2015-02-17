/* jshint jquery: true */
/* global _: false */

;(function(){
  'use strict';
  var FIREBASE_URL = 'https://doggie-date.firebaseio.com/users.json',
      fb           = new Firebase(FIREBASE_URL);

  $.get(FIREBASE_URL, function(data){
    _.forEach(data, function(user){
      //variables from returned data
      var pic_url = user.pic_url,
          user_name = user.user_name,
          name = user.name,
          about = user.about;

      //jquery variables to append to page
      var $pic_url = $('<img class="pic_url" src='+ pic_url +'>')
       .error(function(){
         $image.attr( 'src', 'img/deadlink.png');
       }),
          $user_name = $('<div>' + user_name + '</div>'),
          $name = $('<div>' + '$' + name + '</div>'),
          $about = $('<div>' + about + '</div>'),
          $likeButton = $('<button id="likeButton" value="Like"></button>'),
          $dislikeButton = $('<button id="dislikeButton" value="Dislike"></button'),
          $user = $('<div></div>')
        .attr('class', 'user_container');

        //put user on page
      $user.append($image)
        .append($pic_url)
        .append($user_name)
        .append($name)
        .append($about)
        .append($likeButton)
        .append($dislikeButton);
      $('.userGroup').append($user);
    });
  });
  function like() {
    $('#likeButton').on('click', function () {
      
    })
    function dislike () {
      $('user_container').hide();
    }
  }
}());
