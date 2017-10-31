//defines the model for the front end, which is the local cache as well as its getters and setters
function Model() {
    var studentList = ['testval', 'testval2', 'testval3'];

    this.getList = function(){
        var outBuffer = [];

        for (var i = 0; i < studentList.length; i++){
            outBuffer.push(studentList[i])
        }
        return outBuffer;
    }
}