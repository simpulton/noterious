describe('Boards Pages', function() {

  beforeEach(function() {
    browser().navigateTo('/');
  });

  it('should have a working index page', function() {
    browser().navigateTo('#/');
    expect(browser().location().path()).toBe("/");
  });

});
