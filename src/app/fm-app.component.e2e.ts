describe('App', function() {

  beforeEach(function() {
      browser.get('');
  });

  it('should have a title', function() {
      expect(browser.getTitle()).toEqual('Fuji Mansion');
  });

  it('should have <h1>', function() {
      expect(element(by.css('h1')).isPresent()).toEqual(true);
  });

  it('should have correct text for <h1>', function() {
      expect(element(by.css('h1')).getText()).toEqual('Fuji Mansion App');
  });

/*
  it('should have <nav>', function() {
      expect(element(by.css('sd-app sd-navbar nav')).isPresent()).toEqual(true);
  });

  it('should have correct nav text for Home', function() {
      expect(element(by.css('sd-app sd-navbar nav a:first-child')).getText()).toEqual('HOME');
  });

  it('should have correct nav text for About', function() {
      expect(element(by.css('sd-app sd-navbar nav a:last-child')).getText()).toEqual('ABOUT');
  });
*/
});
