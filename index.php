<!DOCTYPE HTML>

<html>
  <head>
    <title>ShapePhysics | A Browser-Based Javascript Game</title>
    <script src = "assets/pixi.js/bin/pixi.js"></script>
    <script src = "assets/MatterJS/matter-0.8.0.js"></script>
    <script src = "assets/HowlerJS/howler.js"></script>
    <link rel = "stylesheet" href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel = "stylesheet" href = "/styles/main.css" media="screen" title="no title" charset="utf-8">
    <link rel = "icon" href = "/assets/favicon.png">
  </head>

  <body>
    <div class = "container text-center">
      <script src = "scripts/main.js"></script>
      <div id = "vars">
        <h1><div id = 'score'>Score: 0</div><div id = 'level'>Level: 1</div></h1>
      </div>
      <div id = "health" class="progress">
        <div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:50%">50</div>
      </div>

      <div id = "footer" class = "footer">
        
      </div>
    </div>
  </body>
</html>
