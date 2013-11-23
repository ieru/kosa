exports.config =
  # See docs at http://brunch.readthedocs.org/en/latest/config.html.

  # Application build path.  Default is public
  #buildPath: ''

  files:
    javascripts:
      defaultExtension: 'js'
      joinTo:
        'javascripts/app.min.js': /^app/
        'javascripts/vendor.min.js': /^vendor/
        'test/javascripts/test.js': /^test(\/|\\)(?!vendor)/
        'test/javascripts/test-vendor.js': /^test(\/|\\)(?=vendor)/
      order:
        before: [
          'vendor/scripts/console-helper.min.js',
          'vendor/scripts/jquery-1.10.2.min.js',
          'vendor/scripts/lodash-custom-2.3.0.min.js',
          'vendor/scripts/backbone-0.9.9.min.js',
          'vendor/scripts/backbone-mediator.min.js',
          # 'vendor/scripts/backbone.super.js',
          'vendor/scripts/jit.min.js',
          'vendor/scripts/select2-3.4.5.min.js'
        ]
        after: [
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
      joinTo: 'javascripts/templates.min.js'

  minify: no
