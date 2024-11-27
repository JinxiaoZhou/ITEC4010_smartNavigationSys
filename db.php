<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$host = "localhost";
$dbname = "itec4010";
$username = "root";
$password = "";

$mysqli = new mysqli(
    hostname: $host,
    username: $username,
    password: $password
);

if ($mysqli->connect_errno) {
    die("mysql err" . $mysqli->connect_error);
}

$sqlCreateDB = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($mysqli->query($sqlCreateDB) === false) {
    die("Error creating database: " . $mysqli->error);
} else {
    $mysqli->select_db($dbname);

    //import .sql file
    $sqlFile = __DIR__ . '/user_info.sql';
    $sql = file_get_contents($sqlFile);

    $sqlStatements = explode(';', $sql);
    foreach ($sqlStatements as $statement) {
        $trimmedStatement = trim($statement);
        if (!empty($trimmedStatement)) {
            if ($mysqli->query($trimmedStatement) === false) {
                echo "Error executing statement: " . $mysqli->error . "\n";
            }
        }
    }
}

$mysqli = new mysqli(
    hostname: $host,
    username: $username,
    password: $password,
    database: $dbname
);

return $mysqli;
