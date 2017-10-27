<?php
$id = $_POST['student_id'];
$new_name = $_POST['name'];
$new_grade = $_POST['grade'];
$new_course_name = $_POST['course'];

//check if you have all the data you need from the client-side call.  This should include the fields being changed and the ID of the student to be changed
if(empty($id)){
    array_push($output['errors'], 'You need to send the server an id so it knows what to update');
    exit();
}

if (empty($new_name) || empty($new_grade) || empty($new_course_name)) {
    //if not, add an appropriate error to errors
    array_push($output['errors'], 'missing at least one of the inputs you need');
    exit();
}
//write a query that updates the data at the given student ID.
$query = "UPDATE `student_data` SET `name` = '$new_name', `grade` = '$new_grade', `course_name` = '$new_course_name' WHERE `id` = $id";
//print($query);
$result = null;
//send the query to the database, store the result of the query into $result
$result = mysqli_query($conn, $query);

//check if $result is empty.
if(empty($result)) {
    //if it is, add 'database error' to errors
    array_push($output['errors'], 'database error');
//else:
}else {
    //check if the number of affected rows is 1.  Please note that if the data updated is EXCACTLY the same as the original data, it will show a result of 0
    if (mysqli_affected_rows($conn)) {
        //if it did, change output success to true
        $output['success'] = true;
        //if not, add to the errors: 'update error'
    } else {
        $output['errors'] = 'update error';
    }
}
?>