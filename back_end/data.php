<?php
define('fromData',true);
//
if(empty($_GET['action']/* check if the get superglobal variable 'action' is empty*/)){
	exit('no action specified');
}
//require the mysql_connect.php file.  Make sure your properly configured it!
require_once('mysql_connect.php');

$output = [
	'success'=> false, //we assume we will fail
	'errors'=>[]
];

switch($_GET['action']/*do a comparison switch on the get superglobal action*/){
	case 'readAll':
		//include the php file 'read.php'
        include_once('dataApi/read.php');
		break;
	case 'insert':
		//include the php file insert.php
        include_once('dataApi/insert.php');
		break;
	case 'delete':
		//include the php file delete.php
        include_once('dataApi/delete.php');
		break;
	case 'update':
		//include the update.php file
        include_once('dataApi/update.php');
		break;

    case 'freshnessCheck':
        include_once('dataApi/freshness_checker.php');
        break;
}

//convert the $output variable to json, store the result in $outputJSON
$outputJSON = json_encode($output);

//print $outputJSON
print($outputJSON);

//end

?>