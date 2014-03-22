<?php
header('Access-Control-Allow-Origin: localhost');
require_once('/Models/Note.php');
require_once('./functions.php');


$action = $_POST["action"];
echo $action;
switch ($action) {
    case 'insert':
    handleNoteInsert();
    break;
}
function handleNoteInsert()
{
    $title = $_POST["title"];
    $description = $_POST["description"];
    $column = $_POST["column"];
    $args = array(
        'Title' => $title,
        'Description' => $description,
        'Column' => $column
    );
    $note = new Note($args);
    InsertNote($note);
    echo $note->toString();
}
?>