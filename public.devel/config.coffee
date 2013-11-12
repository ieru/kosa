exports.config =
  # See docs at http://brunch.readthedocs.org/en/latest/config.html.

  # Application build path.  Default is public
  #buildPath: ''

  files:
    javascripts:
      defaultExtension: 'js'
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/
        'test/javascripts/test.js': /^test(\/|\\)(?!vendor)/
        'test/javascripts/test-vendor.js': /^test(\/|\\)(?=vendor)/
      order:
        before: [
          'vendor/scripts/console-helper.js',
          'vendor/scripts/jquery-1.10.2.min.js',
          'vendor/scripts/underscore-1.3.3.js',
          'vendor/scripts/backbone-0.9.9.js',
          'vendor/scripts/backbone-mediator.js',
          'vendor/scripts/backbone.super.js',
          'vendor/scripts/jit.js',
          'vendor/scripts/select2.min.js',
          'vendor/scripts/graph.js'
        ]

    stylesheets:
      defaultExtension: 'styl'
      joinTo:
        'stylesheets/app.css': /^(app|vendor)/
        'test/stylesheets/test.css': /^test/
      order:
        # before: ['vendor/styles/normalize.css']
        # after: ['vendor/styles/helpers.css']
        before: [
          'vendor/styles/bootstrap.css',
          'vendor/styles/select2.css',
          'vendor/styles/navbar-fixed-top.css'
        ]
        
    templates:
      defaultExtension: 'hbs'
      joinTo: 'javascripts/templates.js'

  minify: no
