_onReady(function() {
    var moveRight = function(el) {
        var nextCol = "";
        var classList = el.parentNode.className;
        console.log(JSON.stringify(classList));
        var end = false;
        console.log(el.className);
        if(classList.indexOf("column_todo")>=0)
            nextCol = ".column_inProgress";
        else if(classList.indexOf("column_inProgress")>=0)
            nextCol = ".column_toVerify";
        else if(classList.indexOf("column_toVerify")>=0)
            nextCol = ".column_done";
        else if(classList.indexOf("column_done")>=0)
            end = true;
        if(!end)
            document.querySelector(nextCol).appendChild(el);
    }
    var moveLeft = function(el) {
        var nextCol = "";
        var classList = el.parentNode.className.split(' ');
        var end = false;
        if(classList.indexOf("column_todo")>=0)
            end = true;
        else if(classList.indexOf("column_inProgress")>=0)
            nextCol = ".column_todo";
        else if(classList.indexOf("column_toVerify")>=0)
            nextCol = ".column_inProgress";
        else if(classList.indexOf("column_done")>=0)
            nextCol = ".column_toVerify";
        if(!end)
            document.querySelector(nextCol).appendChild(el);
    }
    var moveRightNodes = document.querySelectorAll(".moveRight");
    for (var i = 0; i < moveRightNodes.length; ++i) {
        moveRightNodes[i].addEventListener("click", function(event)
        {
            moveRight(this.parentNode);
        }, false);
    }
    var moveLeftNodes = document.querySelectorAll(".moveLeft");
    for (var i = 0; i < moveLeftNodes.length; ++i) {
        moveLeftNodes[i].addEventListener("click", function(event)
        {
            moveLeft(this.parentNode);
        }, false);
    }
    var temp = document.querySelectorAll(".moveLeft i, .moveRight i");
    for (var i = 0; i < temp.length; ++i) {
        temp[i].style.marginTop = temp[i].parentNode.offsetHeight/2 - 8;
    }
});
