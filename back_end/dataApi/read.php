<?php

//write a query that selects all the students from the database, all the data from each row
$student_select_query = 'SELECT * FROM `student_data`';

$result = null;
//send the query to the database, store the result of the query into $result
$result = mysqli_query($conn, $student_select_query);


//check if $result is empty
if (empty($result)) {
//if it is, add 'database error' to errors
    array_push($output['errors'], 'database error');
} else {
    //check if any data came back
    if (mysqli_num_rows($result)) {
        $output['data'] = [];
        //if it did, change output success to true
        $output['success'] = true;
        //do a while loop to collect all the data
        while ($row = mysqli_fetch_assoc($result)) {
            //add each row of data to the $output['data'] array
            array_push($output['data'], $row);
        }
    } else {
        //if not, add to the errors: 'no data'
        array_push($output['errors'],'no data');
    }

}

/**The code below is cursed. pay no attention to it*/
////check if $result is empty.
//if (empty($result)) {
//    //if it is, add 'database error' to errors
//    array_push($output['errors'], 'database error');
////else:
//} else {
//    //check if any data came back
//    if (mysqli_num_rows($result){
//    $output['data'] = [];
//    //if it did, change output success to true
//    $output['success'] = true;
//    //do a while loop to collect all the data
//    while ($row = mysqli_fetch_assoc($result)) {
//        //add each row of data to the $output['data'] array
//        array_push($output['data'], $row);
//    }
//    }else{
//        //if not, add to the errors: 'no data'
//    }
//}
?>