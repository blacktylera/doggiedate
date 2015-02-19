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

//appending users to search page maybe need to append data attribute here?

usersRef.once('value', function(res){
  var data = res.val();
  console.log(usersRef);
  $.each(data, function( key, info ) {
    $('#usercontainer').append('<button class="like button round">LIKE</button>');
    $('#usercontainer').append('<img src=' + info.pic_url + '></img>');
    $('#usercontainer').append('<button class="dislike button round" >DISLIKE</button>');
    $('#usercontainer').append('<h3>' + info.user_name + '</h3>');
    $('#usercontainer').append('<p>' + info.about + '</p>');

   //  $('button').attr('data-uuid', this);
    });
    $('.like').on('click', likeUser);
    $('.dislike').on('click', disLikeUser);
});

function likeUser(event){
event.preventDefault();
}

function disLikeUser(event){
event.preventDefault();
}




