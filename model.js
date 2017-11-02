//defines the model for the front end, which is the local cache as well as its getters and setters
function Model() {
    //private fields
    var studentList = [];

    //returns the contents of the studentList
    this.getList = function(){
        var outBuffer = [];

        for (var i = 0; i < studentList.length; i++){
            outBuffer.push(studentList[i])
        }
        return outBuffer;
    };

    //returns a list, but only the id and timestamp of each
    this.getJustIDAndTimestamp = function () {
        var outBuffer = [];

        //TODO: make this spiffy
        for (var i = 0; i < studentList.length; i++){
            outBuffer.push({ id: studentList[i].id, last_modified: studentList[i].last_modified })
        }
        return outBuffer;
    };

    //adds a new item into the studentList
    this.addItem = function(studentObj){
        studentList.push(studentObj);
    }

}