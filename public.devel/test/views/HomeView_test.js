var HomeView = require( 'views/HomeView' );
var view;

describe( 'HomeView', function() {
  beforeEach( function() {
    view = new HomeView();
    view.render();
  });

  afterEach( function() { 
    view.remove();
  });
    
  it( 'Should display an artist', function() {
    expect( view.$el.find('#artist') ).to.have.length( 1 );
  });
    
  it( 'The artist should be Robert Ashley', function() {
    expect( view.$el.find('#artist').text()).to.equal( 'Robert Ashley' );
  });
    
  it( 'Should list nine operas', function() {
    expect( view.$el.find('#operas').find('li')).to.have.length( 9 );
  });
    
});