<?php
require_once('/Models/Note.php');
require_once('/Config/config.php');

function get_connection() 
{
    //$con = mysqli_connect("gladiolus.arvixe.com", "scrum_board_root","Password@1","scrum_board_db");
    try {
        $config = getConfig();
        $host = $config->hostname;
        $dbname = $config->dbname;
        $user = $config->user;
        $pass = $config->pass;

        # MS SQL Server and Sybase with PDO_DBLIB
        # $DBH = new PDO("mssql:host=$host;dbname=$dbname, $user, $pass");
        # $DBH = new PDO("sybase:host=$host;dbname=$dbname, $user, $pass");

        # MySQL with PDO_MYSQL
        $DBH = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
        return $DBH;
        # SQLite Database
        # $DBH = new PDO("sqlite:my/database/path/database.db");
    }
    catch(PDOException $e) {
        echo $e->getMessage();
        return false;
    }
}
function close_connection()
{
    $DBConnection = null;
}
function InsertNote($note)
{
    # no placeholders - ripe for SQL Injection!
    $db = get_connection();
    $STH = $db->prepare("INSERT INTO Notes (`Title`, `Description`, `Column`) values (:title, :description, :column)");
    $STH->bindParam(':title', $note->Title, PDO::PARAM_STR);
    $STH->bindParam(':description', $note->Description, PDO::PARAM_STR);
    $STH->bindParam(':column', $note->Column, PDO::PARAM_INT);
    $STH->execute();
    $db = null;
}
function GetAllNotes()
{
    $resArray = array();
    $db = get_connection();
    $STH = $db->prepare("SELECT `ID`, `Title`, `Description`, `Column` FROM Notes");
    $STH -> execute();
    $result = $STH -> fetchAll();
    foreach($result as $row)
    {
        $note = new Note(
            array(
                'Title' => $row['Title'],
                'Description' => $row['Description'],
                'ID' => $row['ID'],
                'Column' => $row['Column']
            ));
        array_push($resArray, $note);
    }
    $db = null;
    return $resArray;
}
function DisplayAllNotes()
{
    $arr = GetAllNotes();
    foreach($arr as $note)
    {
        echo $note->toHTMLString();
    }
}

function GetNotesForColumn($column)
{
    $resArray = array();
    $db = get_connection();
    $STH = $db->prepare("SELECT `ID`, `Title`, `Description`, `Column` FROM Notes WHERE `Column`=:column");
    $STH->bindParam(':column', $column, PDO::PARAM_INT);
    $STH -> execute();
    $result = $STH -> fetchAll();
    foreach($result as $row)
    {
        $note = new Note(
            array(
                'Title' => $row['Title'],
                'Description' => $row['Description'],
                'ID' => $row['ID'],
                'Column' => $row['Column']
            ));
        array_push($resArray, $note);
    }
    $db = null;
    return $resArray;
}
function DisplayNotesForColumn($column)
{
    $arr = GetNotesForColumn($column);
    foreach($arr as $note)
    {
        echo $note->toHTMLString();
    }
}
function CreateTables()
{
    $table = "Notes";
    try 
    {
        $db = get_connection();
        $db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );//Error Handling
        $sql ="CREATE table $table (
                 `ID` INT AUTO_INCREMENT PRIMARY KEY,
                 `Title` VARCHAR(50) NOT NULL,
                 `Description` VARCHAR(100) NULL,
                 `Column` INT NOT NULL
                 );" ;
        $db->exec($sql);
        $db=null;
    } catch(PDOException $e) {
        echo $e->getMessage();//Remove in production code
    }
}

?>