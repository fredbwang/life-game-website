<?php
require_once 'global.php';

print <<<EOF
<!doctype html>
<html>
<style>
</style>

<body>
    <script>
        let DIMENSION = $DIMENSION;
        let matrix;
        let GAME_ON = false;
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="index.js?version=$VERSION"></script>
    <link rel="stylesheet" type="text/css" href="index.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <body>
        <div>
            <canvas id=mycanvas width=500 height=500></canvas>
        </div>
        
        <div id=button-block class="mx-auto">
            <input id=save-button class="btn btn-outline-primary" type=submit value=Save onclick="save()">
            <input id=reset-button class="btn btn-outline-primary" type=submit value=Reset onclick="reset()">
            <input id=start-button class="btn btn-outline-primary" type=submit value=Start onclick="start()">
            <input id=stop-button class="btn btn-outline-primary" type=submit value=Stop onclick="stop()">
        </div>
        
        <div id=spinner></div>
    </body>
</html>
EOF;