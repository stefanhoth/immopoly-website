<?php
  setlocale(LC_ALL, 'de_DE');
  header("Content-Type: text/html; charset=utf-8");
  
  require_once('inc/config.inc.php');
  require_once('inc/main.inc.php');  

  $page=validateStartParams();

?>
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Immopoly :: Ein mobiles Makler-Spiel mit Echtdaten von ImmobilienScout24</title>
    <meta name="description" content="Ein mobiles Makler-Spiel mit Echtdaten von ImmobilienScout24">
    <meta name="author" content="Krautsourcing UG :: Team Immopoly">

    <!-- Le HTML5 shim, for IE6-8 support of HTML elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Le styles -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <style type="text/css">
      body {
        padding-top: 60px;
        padding-bottom: 40px;
      }     
    </style>
    <link href="bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link href="css/overrides.css" rel="stylesheet">

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="images/favicon.ico">
    <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png">

    <!-- G+-Page-Badge -->
    <link href="https://plus.google.com/115948347977579800149" rel="publisher" />
    <script type="text/javascript">
    window.___gcfg = {lang: 'de'};
    (function() 
    {var po = document.createElement("script");
    po.type = "text/javascript"; po.async = true;po.src = "https://apis.google.com/js/plusone.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(po, s);
    })();</script>

  </head>
  <body>
    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="brand" href="/">Immopoly</a>
          <div class="nav-collapse">
            <ul class="nav">
              <li class="home">
                <a href="reboot.html">
                  <i class="icon-home icon-white"></i>&nbsp;Home
                </a>
              </li>
              <li class="screenshots">
                <a href="screenshots.html">
                  <i class="icon-picture icon-white"></i>&nbsp;Screenshots&nbsp;+&nbsp;Beschreibung
                </a>
              </li>
              <li class="download">
                <a href="download.html">
                  <i class="icon-download icon-white"></i>&nbsp;Download
                </a>
              </li>
              <li class="livestats">
                <a href="livestats.html">
                  <i class="icon-list-alt icon-white"></i>&nbsp;Live-Status
                </a>
              </li>
              <li class="contact">
                <a href="contact.html">
                  <i class="icon-envelope icon-white"></i>&nbsp;Kontakt
                </a>
              </li>
            </ul>
          </div><!--/.nav-collapse -->
          <form class="form-inline pull-right">
            <input type="text" class="input-small disabled" disabled placeholder="Benutzername">
            <input type="password" class="input-small disabled" disabled placeholder="Passwort">
            <button type="submit" class="btn-small disabled" disabled>Login</button>
          </form>
        </div>
      </div>
    </div>

    <div class="container">

      <!-- CONTENT HERE -->
      <?php the_page($page); ?>
      <hr>

      <footer>
        <p>&copy; Krautsourcing UG 2011-2012 &bull; Immopoly Team <a class="pull-right" href="impressum.html">Impressum</a></p>
      </footer>

    </div> <!-- /container -->

    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="js/jquery-1.7.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <!--
    <script src="bootstrap/js/bootstrap-transition.js"></script>
    <script src="bootstrap/js/bootstrap-alert.js"></script>
    <script src="bootstrap/js/bootstrap-modal.js"></script>
    <script src="bootstrap/js/bootstrap-dropdown.js"></script>
    <script src="bootstrap/js/bootstrap-scrollspy.js"></script>
    <script src="bootstrap/js/bootstrap-tab.js"></script>
    <script src="bootstrap/js/bootstrap-tooltip.js"></script>
    <script src="bootstrap/js/bootstrap-popover.js"></script>
    <script src="bootstrap/js/bootstrap-button.js"></script>
    <script src="bootstrap/js/bootstrap-collapse.js"></script>
    <script src="bootstrap/js/bootstrap-carousel.js"></script>
    <script src="bootstrap/js/bootstrap-typeahead.js"></script>
    -->
    <script>
      $(document).ready(function(){
        $(".navbar .nav li.<?php echo $page;?>").addClass("active");
      });
    </script>
  </body>
</html>
