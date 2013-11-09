// This file will be automatically required when using `brunch test` command.
var chai = require( 'chai' );
var sinonChai = require( 'sinon-chai' );

chai.use( sinonChai );

module.exports = {
  expect: chai.expect,
  sinon: require( 'sinon' )
};
