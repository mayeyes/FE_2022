<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title></title>
  </head>
  <body>
  <?php
      $pp = shell_exec('cd c:/Users/mini/Documents/2021/ && git help && git pull');
      echo "<pre>".$pp."</pre>";
    ?>
  </body>
</html>