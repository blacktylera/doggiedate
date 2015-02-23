var FIREBASE_URL   = 'https://doggie-date.firebaseio.com',
    fb             = new Firebase(FIREBASE_URL),
    usersFb,
    usersRef       = new Firebase('https://doggie-date.firebaseio.com/users/');


//login and register//

if (fb.getAuth()) {
 usersFb = fb.child('users/' + fb.getAuth().uid);
 usersFb.child('/profile').once('value', function (res){
  var data = res.val();
  populateProf(data);
});
}

$('.login input[type="button"]').click(function (event) {
 var $loginForm = $('.loginForm'),
     email      = $loginForm.find('[type="email"]').val(),
     pass       = $loginForm.find('[type="password"]').val(),
     data       = {email: email, password: pass};

  registerAndLogin(data, function (err, auth) {
   if (err) {
     $('.error').text(err);
   } else {
      window.location.href='./register.html';
   }
 });
});

$('.login form').submit(function(event){
 var $loginForm = $(event.target),
     email      = $loginForm.find('[type="email"]').val(),
     pass       = $loginForm.find('[type="password"]').val(),
     data       = {email: email, password: pass};

 event.preventDefault();

 fb.authWithPassword(data, function(err, auth) {
    if (err) {
     $('.error').text(err);
   } else {
     window.location.href='./profile.html';
   }
 });
});

function registerAndLogin(obj, cb) {
 fb.createUser(obj, function(err) {
   if (!err) {
       fb.authWithPassword(obj, function (err, auth){
       if (!err) {
         cb(null, auth);
       } else {
         cb(err);
       }
     });
   } else {
     cb(err);
   }
 });
}



//using .set() to set profile data to firebase

$('.register form').submit(function(event){
  var $pic = $('#regpic').val();
  var $name = $('#regname').val();
  var $username = $('#regusername').val();
  var $about = $('#regabout').val();
  var profileData = ({'pic_url': $pic, 'name': $name, 'user_name': $username, 'about': $about});
  var matchData = ({'Likes': '', 'Dislikes' : '', 'Matches' : ''});


  event.preventDefault();

  usersFb.child('/profile').set(profileData);
  usersFb.child('/matchdata').set(matchData);

  goToProfile();
});

function populateProf(data){
  $('#headShot').append('<img src=' + data.pic_url + '></img>');
  $('#userName').append('<h3>' + data.user_name + '</h3>');
  $('#aboutUser').append('<p>' + data.about + '</p>');
}

//logout of user

$('.logout').click(function(){
  fb.unauth();
  location.href='./index.html';
});

function goToProfile(){
  window.location.href='./profile.html';
}

$('.to_profile').click(goToProfile);

//go to search matches page

$('.search').click(function(){
  location.href='./searchusers.html';
});

//appends users to page and assigns their uuid as data-attribute

usersRef.once('value', function(res){
  var data = res.val();
   $.each(data, function( key, info ) {
    var $userDiv = $('<div class="potentialMatch"><button class="like button round">LIKE</button><img src=' + info.profile.pic_url +
                     '></img><button class="dislike button round" >DISLIKE</button><h3>' + info.profile.user_name + '</h3><p>' + info.profile.about + '</p>');
    $('#usercontainer').append($userDiv);
    $userDiv.attr('data-uuid', key);
    });
    $('.like').on('click', likeUser);
    $('.dislike').on('click', disLikeUser);
});

//click event to send uuid to the Like database

function likeUser(event){
event.preventDefault();
var likeObject = $(this).parent().data();
usersFb.child('/matchdata/Likes').push(likeObject);
$(this).parent().hide();
}

//click even to send uuid to the disLike databse

function disLikeUser(event){
event.preventDefault();
var disLikeObject = $(this).parent().data();
usersFb.child('/matchdata/Dislikes').push(disLikeObject);
$(this).parent().hide();
}




