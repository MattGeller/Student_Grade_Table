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

    //adds a new item into the studentList
    this.addItem = function(studentObj){
        studentList.push(studentObj);
    }

}