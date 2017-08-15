/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var students_array = [];
/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
var inputIds = ["#studentName", "#course", "#studentGrade"];

/**
 * addClicked - Event Handler when user clicks the add button
 */
function addClicked() {
    addStudent();
}

/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClicked() {
    clearAddStudentForm();
}

/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent() {
    var student = {
        name: $(inputIds[0]).val(),
        course: $(inputIds[1]).val(),
        grade: $(inputIds[2]).val()
    };

    students_array.push(student);
    updateData();
    clearAddStudentForm();
}

/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm() {
    $(inputIds[0]).val("");
    $(inputIds[1]).val("");
    $(inputIds[3]).val("");
}

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage() {
    var avg = 0;
    for (var i = 0; i < students_array.length; i++){
        avg += students_array[i].grade;
    }
    avg /= students_array.length;
    return avg;
}

/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData() {
    $(".avgGrade").text(calculateAverage());
    updateStudentList();
}

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList() {
    var $table_body = $("<tbody>");
    for (var i = 0; i < students_array.length; i++) {
        var $table_row = $("<tr>");
        $table_row.append($('<th>').text(students_array[i].name));
        $table_row.append($('<th>').text(students_array[i].course));
        $table_row.append($('<th>').text(students_array[i].grade));
        $table_row.append($('<th><button type="button" onclick = "deleteStudent(event)" class=" delete-row btn btn-danger">Delete</button></th>'));

        $table_body.append($table_row);
    }
    $(".student-list tbody").replaceWith($table_body);
}

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */

function addStudentToDom(studentObj) {
    var $table_row = $("<tr>");
    for (var attr in studentObj) {
        var $tableCell = $('<td>').text(studentObj[index]);
        $tableRow.append($tableCell);
    }
}

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset() {
    students_array = [];
    updateData();
    updateStudentList();
}

/**
 * Listen for the document to load and reset the data to the initial state
 */