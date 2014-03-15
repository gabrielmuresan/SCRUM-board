_onReady(function() {
    var moveRight = function(el) {
        var nextCol = "";
        var classList = el.parentNode.className;
        var end = false;
        if(classList.indexOf("column_todo")>=0)
            nextCol = ".column_inProgress";
        else if(classList.indexOf("column_inProgress")>=0)
            nextCol = ".column_toVerify";
        else if(classList.indexOf("column_toVerify")>=0)
            nextCol = ".column_done";
        else if(classList.indexOf("column_done")>=0)
            end = true;
        if(!end)
        {
            el.style.opacity = 0;
            document.querySelector(nextCol).appendChild(el);
            if(el.id)location.href="#" + el.id;
            fadeIn(el);
        }
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
        {
            el.style.opacity = 0;
            document.querySelector(nextCol).appendChild(el);
            if(el.id)location.href="#" + el.id;
            fadeIn(el);
        }
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
});
