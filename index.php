<?php require_once('/php/functions.php') ?>
<!-- TODO -->
<html>
    <head>
        <title>Scrum Board</title>
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <link rel="stylesheet" type="text/css" href="includes/font-awesome-4.0.3/css/font-awesome.min.css">
        <script type="text/javascript" src="js/logger.js"></script>
        <script type="text/javascript" src="js/custom-framework.js"></script>
        <script type="text/javascript" src="js/script.js"></script>
    </head>
    <body>
        <div id="sidebar" class="closed">
            <span class="handleBar"><i class="fa fa-angle-double-right"></i></span>
            <div class="title">
                Admin Panel
            </div>
            <div class="content">
                <form id="adminOptions">
                    <fieldset>
                        <label for="shrinkBoard">Shrink board with Admin Panel</label>
                        <fieldset class="shrinkBoard">
                            <input type="radio" value="true" name="shrinkBoard" onclick="setAdminOption('shrinkBoard',true);" />Yes
                            <input type="radio" value="false" name="shrinkBoard" onclick="setAdminOption('shrinkBoard',false);" checked="checked" /> No
                        </fieldset>
                    </fieldset>
                </form>
                <form id="noteOperations">
                    <fieldset>
                        <label for="title">Title</label>
                        <input type="text" name="title" class="title" />
                    </fieldset>
                    <fieldset>
                        <label for="title">Description:</label>
                        <textarea rows="4" cols="20" name="description" class="description"></textarea>
                    </fieldset>
                    <fieldset>
                        <input type="button" value="Insert" onclick="insertNote(document.getElementById('noteOperations').querySelector('.title').value,document.getElementById('noteOperations').querySelector('.description').value);">
                    </fieldset>
                </form>
            </div>
        </div>
        <div id="board">
            <div class="column column_todo" dropable="true">
                <div class="title">TO DO</div>
                <?php DisplayNotesForColumn(1); ?>
            </div>
            <div class="column column_inProgress" dropable="true">
                <div class="title">IN PROGRESS</div>
                <?php DisplayNotesForColumn(2); ?>
            </div>
            <div class="column column_toVerify" dropable="true">
                <div class="title">TO VERIFY</div>
                <?php DisplayNotesForColumn(3); ?>
            </div>
            <div class="column column_done" dropable="true">
                <div class="title">DONE</div>
                <?php DisplayNotesForColumn(4); ?>
            </div>
        </div>
    </body>
</html>
