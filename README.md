# immopoly website repository

This repo is deployed on [immopoly.org](http://immopoly.org).

## website structure

Some words explaining the structure should help you to put stuff where they belong:

 * **boostrap/**

	files for [Twitter Bootstrap 2.0](http://twitter.github.com/bootstrap/)

 * **content/**

	PHP-files for inner content of subpages. One File per Subpage. (Has to be configured in `config.inc.php` to be callable)

 * **css/overrides.css**

	styles overriding default behavior of Bootstrap

 * **img/layout/**

	image files needed for the layout (logos, icons, etc.)

 * **img/screenshots/**

	image files needed for showcasing the app(s)

 * **inc/config.inc.php**

	configuration file. Most important `$pageNames` for allowing access to these subpages (must exist as `content/*.inc.php`, too)

 * **inc/main.inc.php**

	Mini PHP dispatcher for loading subpages and testing access.

 * **js/jquery-1.7.min.js**

	jQuery is needed for Twitter Bootstrap-plugins and AJAX-loading

 * **js/interactive.js**

	Handling of AJAX-calls to the immopoly backend

## credits

My love goes out to the awesome devs at Twitter who created this freaking cool framework to easily build websites on.

## contact

If you have questions on this project, drop me a note through GitHub on my [profile page](https://github.com/stefanhoth).