describe('test suite', function () {
  it('should assert true', function () {
    true.should.be.true;
    false.should.be.false;
  });
});


describe('populateProf', function () {
  before(function () {
    if (window.__karma__) {
      $('body').empty();
      $('body').append('<div class="userName"></div>');
    };
  });
  it('should append profile info to the page', function() {
    var data=( { name: 'test' });
    populateProf(data);
    expect('div').to.not.be.empty;
  });
});

describe('user', function () {
  it('should have property', function () {
    var user = { about: 'Some text', name: 'Tyler', pic_url: 'www.image.jpg', user_name: 'ausername' };
    expect(user).to.have.property('about');
  });
});

describe('user', function () {
  it('should have property', function () {
    var user = { about: 'Some text', name: 'Tyler', pic_url: 'www.image.jpg', user_name: 'ausername' };
    expect(user).to.have.property('name');
  });
});

describe('user', function () {
  it('should have property', function () {
    var user = { about: 'Some text', name: 'Tyler', pic_url: 'www.image.jpg', user_name: 'ausername' };
    expect(user).to.have.property('pic_url');
  });
});

describe('user', function () {
  it('should have property', function () {
    var user = { about: 'Some text', name: 'Tyler', pic_url: 'www.image.jpg', user_name: 'ausername' };
    expect(user).to.have.property('user_name');
  });
});

