<?php

//pass in an id and this function will go through the list to find the date associated with that id or it will return false if it's not found
function findDateByID($id){
    global $list;

    foreach ($list as $item){
        if ($item['id'] == $id){
            return $item['last_modified'];
        }
    }
    return false;
}

//receive a list of ids and their timestamps from the front end
$list = $_POST['list'];
var_dump($list);
die();

//get data from the entire student table
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

        //this array will store the student table info fresh from the database
        $student_table_info = [];

        //do a while loop to collect all the data
        while ($row = mysqli_fetch_assoc($result)) {
            //look at id from this particular row
            $current_id = $row['id'];

            //check if this row exists in the front end OR if the server has a more recent version



        }

        //compare all the timestamps and ids and make a list of all the ids that don't match

        //go back to the database and get all the information for each of those ids

        //put them into an output object

    } else {
        //if not, add to the errors: 'no data'
        array_push($output['errors'],'no data');
    }

}


var_dump($student_table_info);

//$output['data'][] = $_POST['list'];
//$output['success'] = true;