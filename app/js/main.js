var FIREBASE_URL   = 'https://doggie-date.firebaseio.com',
    fb             = new Firebase(FIREBASE_URL),
    usersFb;

 if (fb.getAuth()) {
  usersFb = fb.child('users/' + fb.getAuth().uid);
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
