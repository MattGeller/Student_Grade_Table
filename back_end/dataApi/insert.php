<?php
$new_name = $_POST['name'];
$new_grade = $_POST['grade'];
$new_course_name = $_POST['course'];

//check if you have all the data you need from the client-side call.
if(empty($new_name) || empty($new_grade) || empty($new_course_name)) {
    //if not, add an appropriate error to errors
    array_push($output['errors'], 'missing at least one of the inputs you need');
    exit();
}

//write a query that inserts the data into the database.  remember that ID doesn't need to be set as it is auto incrementing
$query = "INSERT INTO `student_data` SET `name` = '$new_name', `grade` = '$new_grade', `course_name` = '$new_course_name'";
//print($query);

$result = null;
//send the query to the database, store the result of the query into $result
$result = mysqli_query($conn, $query);

//check if $result is empty.
if(empty($result)) {
    //if it is, add 'database error' to errors
    array_push($output['errors'], 'database error');
//else:
}else{
    //check if the number of affected rows is 1
    if (mysqli_affected_rows($conn)){
        //if it did, change output success to true
        $output['success'] = true;


        //TODO: what's the point of this part?
        //get the insert ID of the row that was added
//        print(mysqli_insert_id($conn));

        //add 'insertID' to $outut and set the value to the row's insert ID
        $output['insertID'] = mysqli_insert_id($conn);

    } else {
        //if not, add to the errors: 'insert error'
        $output['errors'] = 'insert error';
    }

}

?>