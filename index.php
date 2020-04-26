<?php
require_once 'global.php';

print <<<EOF

<!doctype html>
<html>
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-firestore.js"></script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="index.js?version=$VERSION"></script>

<style>
    body {
        background-color: #f0f0f0;
        margin: 16px;
        font-family: Arial, Helvetica, sans-serif;
    }

    #mycanvas {
        border: 1px #000 solid;
        background-color: #fff;
        cursor: pointer;
    }

    #mycanvasWrapper {
        position: relative;
    }

    #selectedBox {
        border: 1px rgba(0, 50, 100, 0.5) solid;
        background-color: rgba(0, 50, 100, 0.25);
        position: absolute;
        pointer-events: none;
    }
</style>
<script>
    let DIMENSION = $DIMENSION;
</script>

<body>
    <div id=mycanvasWrapper>
        <canvas id=mycanvas></canvas>
    </div>

</body>

</html>
EOF;