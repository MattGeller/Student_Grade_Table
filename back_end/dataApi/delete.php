<?php

$row_to_delete = $_POST['student_id'];

//check if you have all the data you need from the client-side call.
if(empty($row_to_delete)) {
    //if not, add an appropriate error to errors
    array_push($output['errors'], 'I\'m confused about which row you want to delete');
}
//write a query that deletes the student by the given student ID
$query = "DELETE FROM `student_data` WHERE `id` = $row_to_delete";

$result = null;

//send the query to the database, store the result of the query into $result
$result = mysqli_query($conn, $query);

//check if $result is empty.
if(empty($result)) {
    //if it is, add 'database error' to errors
    array_push($output['errors'], 'database error');

//else:
} else {
    //check if the number of affected rows is 1
    if (mysqli_affected_rows($conn)) {
        //if it did, change output success to true
        $output['success'] = true;
    }
    //if not, add to the errors: 'delete error'
    else {
        $output['errors'] = 'delete error';
    }
}
?>