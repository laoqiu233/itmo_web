<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WEBLAB#1</title>
    <link rel="stylesheet" href="/static/style.css">
    <script>
        const points = [
            <?php
                if (isset($_SESSION['attempts'])) {
                    foreach($_SESSION['attempts'] as $index=>$attempt) {
                        srand($index);
                        $random_color = 'rgb(' . rand(0, 255) . ',' . rand(0, 255) . ',' . rand(0, 255) . ')';
                        printf('{\'x\':%s,\'y\':%s, \'color\':\'%s\'},', $attempt['x'], $attempt['y'], $random_color);
                    }
                }
            ?>
        ];
    </script>
</head>
<body>
    <header>
        <div class="gradient"></div>
        <h1><span class="theme-color">Tsiu</span> T.</h1>
        <h2>P3132 <span class="gray-color">Web Lab #1 | Вариант: 3218</span></h2>
    </header>

    <div class="main">
        <div class="panel" style="text-align: center;">
            <canvas id="graph" width="300" height="300">
                <img src="/static/task_graph.png" alt="Task grpah" width="300" height="300">
            </canvas>
            <p>
                <?php
                    if (isset($_SESSION['hit_message'])) {
                        echo($_SESSION['hit_message']);
                        unset($_SESSION['hit_message']);
                    } else {
                        echo('Click anywhere on the graph to send a point');
                    }
                ?>
            </p>
        </div>
        <div class="panel" id="form-panel">
            <form id="form" action="/send_point.php" method="post">    
                <div class="row">
                    <label for="select-x">X</label>
                    <select name="x" id="select-x">
                        <option value="-2">-2</option>
                        <option value="-1.5">-1.5</option>
                        <option value="-1">-1</option>
                        <option value="-0.5">-0.5</option>
                        <option value="0">0</option>
                        <option value="0.5">0.5</option>
                        <option value="1">1</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2</option>
                        <option id="x-from-graph-click" value="" disabled></option>
                    </select>
                </div>
                <div class="row">
                    <label for="input-y">Y</label>
                    <div>
                        <input type="text" name="y" id="input-y" placeholder="0" required>
                        <p id="input-y-warning" class="warning hidden" style="margin-top:5px"></p>
                    </div>
                </div>
                <div class="row">
                    <label>R</label>
                    <div>
                        <div>
                            <div class="row">
                                <input type="radio" name="r" id="r-1" value="1" checked>
                                <label for="r-1">1</label>
                            </div>
                            <div class="row">
                                <input type="radio" name="r" id="r-2" value="2">
                                <label for="r-2">2</label>
                            </div>
                            <div class="row">
                                <input type="radio" name="r" id="r-3" value="3">
                                <label for="r-3">3</label>
                            </div>
                            <div class="row">
                                <input type="radio" name="r" id="r-4" value="4">
                                <label for="r-4">4</label>
                            </div>
                            <div class="row">
                                <input type="radio" name="r" id="r-5" value="5">
                                <label for="r-5">5</label>
                            </div>
                        </div>
                        <p id="input-r-warning" class="warning hidden" style="margin-top:5px"></p>
                    </div>
                </div>
                <div class="row">
                    <button id="form-submit" type="submit" class="row-fill">Send</button>
                </div>
            </form>
        </div>
        
        <div id="results" class="panel">
            <h1>Results</h1>
            <div class="overflow-scroll">
                <table>
                    <tr>
                        <th>Attempt #</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Result</th>
                        <th>Attempt time</th>
                        <th>Processing time</th>
                    </tr>
                    <?php
                        if (isset($_SESSION['attempts'])) {
                            foreach($_SESSION['attempts'] as $index=>$attempt) {
                                echo('<tr>');
                                
                                printf('<td>%s</td>', $index+1);

                                printf('<td>%s</td>', $attempt['x']);
                                printf('<td>%s</td>', $attempt['y']);
                                printf('<td>%s</td>', $attempt['r']);

                                if ($attempt['hit']) {
                                    echo('<td class="theme-color">HIT</td>');
                                } else {
                                    echo('<td class="warning">MISS</td>');
                                }

                                printf('<td>%s</td>', date('Y-m-d H:i:s', $attempt['attempt_time']) . ' UTC');

                                printf('<td>%s ms</td>', $attempt['process_time']);
        
                                echo('</tr>');
                            }
                        }
                    ?>
                </table>
            </div>
        </div>
    </div>
    <script src="/static/grapher.js"></script>
    <script src="/static/validation.js"></script>
</body>
</html>