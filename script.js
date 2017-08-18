/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var students_array = [];
var ids_array = [];
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

    //this ajax call should put the student into the server
    $.ajax({
        method: 'post',
        dataType: "json",
        url: "http://s-apis.learningfuze.com/sgt/create",
        data: {
            api_key: "UNcvqWgEXK",
            name: student.name,
            course: student.course,
            grade: student.grade
        },
        timeout: 1000,
        success: function (serverResponse) {
            console.log(serverResponse);

            alert("We just tried to add " + student.name + "'s info to the server!");
            updateData();
        },

        error: function () {
alert("Couldn't quite get in contact with the server ¯\\\_(ツ)_/¯")
        }
    });


    updateData();
    clearAddStudentForm();
}

/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm() {
    $(inputIds[0]).val("");
    $(inputIds[1]).val("");
    $(inputIds[2]).val("");
}

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage() {
    var avg = 0;
    if (students_array.length === 0) {
        return avg;
    }
    for (var i = 0; i < students_array.length; i++) {
        avg += parseFloat(students_array[i].grade);
    }
    avg /= students_array.length;
    avg = Math.round(avg);
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
 * updateStudentList - loops through global student array and appends each object's data into the student-list-container > list-body
 * calls addStudentToDom once on each student in the student array
 */
function updateStudentList() {
    //first clear out dom student_list
    $(".student-list tbody > tr").remove();

    for (var i = 0; i < students_array.length; i++) {
        addStudentToDom(students_array[i]);
        // $(students_array[i].name).appendTo('.student-list-container > .list-body');
        // $(students_array[i].course).appendTo('.student-list-container > .list-body');
        // $(students_array[i].grade).appendTo('.student-list-container > .list-body');
    }

}

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */

function addStudentToDom(studentObj) {
    var $table_row = $("<tr>");
    for (var attr in studentObj) {
        $table_row.append($("<td>").text(studentObj[attr]));
    }

    // $table_row.append($('<th><button type="button" onclick = "deleteStudent(event)" class=" delete-row btn btn-danger">Delete</button></th>'));

    var $delete_button = $("<button>", {
        type: "button",
        class: "delete-row btn btn-danger",
        text: "Delete"
    });

    $delete_button.click(function () {
        var index = $(this).parent().parent().index();


        //this ajax call should delete the student from the server
        $.ajax({
            method: 'post',
            dataType: "json",
            url: "http://s-apis.learningfuze.com/sgt/delete",
            data: {
                api_key: "UNcvqWgEXK",
                student_id: ids_array[index]
            },
            timeout: 1000,
            success: function (serverResponse) {
                console.log(serverResponse);

                alert("We're about to try to remove the student with id " + ids_array[index] + " from the server!");

                students_array.splice(index, 1);
                ids_array.splice(index, 1);

                updateData();
            },

            error: function () {
                alert("Couldn't quite get in contact with the server ¯\\\_(ツ)_/¯")
            }
        });



        // students_array.splice(index, 1);
        // ids_array.splice(index, 1);

        updateData();
    });

    $table_row.append($("<td>").append($delete_button)); // <- does this line look ok?
    // $table_row.append($delete_button);

    $(".student-list tbody").append($table_row);
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
$(document).ready(function () {
    reset();
    pullData();
});

function pullData() {
    $.ajax({
        method: 'post',
        dataType: "json",
        url: "http://s-apis.learningfuze.com/sgt/get",
        data: {api_key: "UNcvqWgEXK"},

        success: function (thing) {
            console.log("ajax object we get for pulling data from the server:", thing);
            for (var i = 0; i < thing.data.length; i++) {
                ids_array.push(thing.data[i].id);

                students_array.push({
                    name: thing.data[i].name,
                    course: thing.data[i].course,
                    grade: thing.data[i].grade
                });
            }
            updateData();
        },

        error: function () {

        }
    })
}
