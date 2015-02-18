var FIREBASE_URL   = 'https://doggie-date.firebaseio.com',
    fb             = new Firebase(FIREBASE_URL),
    usersFb;

//login and register//

if (fb.getAuth()) {
 usersFb = fb.child('users/' + fb.getAuth().uid);
 usersFb.once('value', function (res){
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



//pushing data to database as an event handler on the register form. And then taking you to your profile page where we can GET from firebase what we just pushed?
//

$('.register form').submit(function(event){
  var $pic = $('#regpic').val();
  var $name = $('#regname').val();
  var $username = $('#regusername').val();
  var $about = $('#regabout').val();
  var profileData = ({'pic_url': $pic, 'name': $name, 'user_name': $username, 'about': $about});

  event.preventDefault();

  usersFb.set(profileData);

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


var usersRef = new Firebase('https://doggie-date.firebaseio.com/users');

usersRef.once('value', function(res){
  var data = res.val();
  $.each(data, function( key, info ) {
    $('#usercontainer').append('<button class="like button round">LIKE</button>');
    $('#usercontainer').append('<img src=' + info.pic_url + '></img>');
    $('#usercontainer').append('<button class="dislike button round" >DISLIKE</button>');
    $('#usercontainer').append('<h3>' + info.user_name + '</h3>');
    $('#usercontainer').append('<p>' + info.about + '</p>');
    });
    $('.like').click(function(){
  console.log('hello world');
  });
});



