<?php
require_once('/Models/Note.php');
require_once('./functions.php');


$action = $_GET["action"];
echo $action;
switch ($action) {
    case 'insert':
    handleNoteInsert();
    break;
}
function handleNoteInsert()
{
    $title = $_GET["title"];
    $description = $_GET["description"];
    $column = $_GET["column"];
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