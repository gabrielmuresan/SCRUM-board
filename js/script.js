//declaration is before dom is ready
var adminOptions = {};
adminOptions.shrinkBoard = false;
var setAdminOption = function(adminOption, value)
{
    switch (adminOption)
    {
        case "shrinkBoard":
            adminOptions.shrinkBoard = value;
            if(value)
                document.querySelector("#board").classList.add("withAdminBar");
            else
                document.querySelector("#board").classList.remove("withAdminBar");
            break;
    }
};
var insertNote = function(){};
_onReady(function() {
    var Note = function(title, description)
    {
        var _self = this;
        this.title = title;
        this.description = description;
        this.toElement = function()
        {
            var el = document.createElement("span");
            el.classList.add("note");
            el.setAttribute("draggable","true");
            var nextId = document.querySelectorAll(".note").length+1;
            el.id="note"+nextId;

            var moveLeft = document.createElement("span");
            moveLeft.classList.add("moveLeft");
            moveLeft.innerHTML = '<i class="fa fa-arrow-left"></i>';
            el.appendChild(moveLeft);
            moveLeft.addEventListener('click', function(e) {
                handleMoveLeft(moveLeft.parentNode);
            }, false);

            var moveRight = document.createElement("span");
            moveRight.classList.add("moveRight");
            moveRight.innerHTML = '<i class="fa fa-arrow-right"></i>';
            el.appendChild(moveRight);
            moveRight.addEventListener('click',function(e) {
                handleMoveRight(moveRight.parentNode);
            }, false);

            var title = document.createElement("span");
            title.classList.add("title");
            title.innerHTML = _self.title;
            var content = document.createElement("span");
            content.classList.add("content");
            content.innerHTML = _self.description;

            el.appendChild(title);
            if(_self.description)
                el.appendChild(content);
            console.log(el.innerHTML);

            el.addEventListener('dragstart', handleDragStart, false);
            el.addEventListener('dragend', handleDragEnd, false);
            return el;
        };
        return this;
    };

    insertNote = function(title,description)
    {
        var el = Note(title, description);
        document.querySelector(".column_todo").appendChild(el.toElement());
        var urlBuilder = 'php/execute.php?action=insert&title=' + title + '&column=1';
        if(description && description.length > 0)
            urlBuilder = urlBuilder + '&description=' + description;
        var xhReq = new XMLHttpRequest();
        xhReq.open("GET", urlBuilder, false);
        xhReq.send(null);
        var serverResponse = xhReq.responseText;
    };
    var initAdminOptions = function() {

        switch(document.getElementById("adminOptions").querySelector(".shrinkBoard > input:checked").value)
        {
            case "true":
                adminOptions.shrinkBoard = true;
                break;
            default:
                adminOptions.shrinkBoard = false;
                break;
        }

    };
    var handleMoveRight = function(el) {
        var nextCol = "";
        var classList = [];
        if(!el.parentNode)
            classList = document.querySelector(".column_todo").className;
        else
            classList = el.parentNode.className;
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
            if(el.id)
                location.href = "#" + el.id;
            fadeIn(el);
        }
    };
    var handleMoveLeft = function(el) {
        var nextCol = "";
        if(!el.parentNode)
            classList = document.querySelector(".column_todo").className;
        else
            classList = el.parentNode.className;
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
    };
    var dragSrcEl = null;
    function handleDragStart(e) {
        this.style.opacity = '0.4';  // this / e.target is the source node.

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData(Element, this);
    }
    function handleDragEnd(e) {
        // this/e.target is the source node.
        fadeIn(this);
        [].forEach.call(dropables, function(col) {
            col.classList.remove('over');
        });
    }
    function handleDragOver(e) {
        this.classList.add('over');
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }
        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
        return false;
    }
    function handleDragEnter(e) {
        // this / e.target is the current hover target.
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');  // this / e.target is previous target element.
    }
    function handleDrop(e) {
        // this/e.target is current target element.

        if (e.stopPropagation) {
            e.stopPropagation(); // Stops some browsers from redirecting.
        }
        this.appendChild(dragSrcEl);
        return false;
    }
    var draggables = document.querySelectorAll('[draggable]');
    [].forEach.call(draggables, function(col) {
        col.addEventListener('dragstart', handleDragStart, false);
        col.addEventListener('dragend', handleDragEnd, false);
    });
    var dropables = document.querySelectorAll('[dropable]');
    [].forEach.call(dropables, function(col) {
        col.addEventListener('dragover', handleDragOver, false);
        col.addEventListener('dragenter', handleDragEnter, false);
        col.addEventListener('dragleave', handleDragLeave, false);
        col.addEventListener('drop', handleDrop, false);
    });

    var moveRightNodes = document.querySelectorAll(".moveRight");
    for (var i = 0; i < moveRightNodes.length; ++i) {
        moveRightNodes[i].addEventListener("click", function(event)
                                           {
                                               handleMoveRight(this.parentNode);
                                           }, false);
    }
    var moveLeftNodes = document.querySelectorAll(".moveLeft");
    for (var i = 0; i < moveLeftNodes.length; ++i) {
        moveLeftNodes[i].addEventListener("click", function(event)
                                          {
                                              handleMoveLeft(this.parentNode);
                                          }, false);
    }
    function handleHandleBarClick(e) {
        if(this.parentNode.classList.contains("closed"))
        {
            console.log(adminOptions.shrinkBoard);
            if(adminOptions.shrinkBoard)
                document.querySelector("#board").classList.add("withAdminBar");
            this.parentNode.classList.remove("closed");
            this.parentNode.classList.add("opened");
            this.querySelector("i").classList.remove("fa-angle-double-right");
            this.querySelector("i").classList.add("fa-angle-double-left");
        }
        else
        {
            console.log(adminOptions.shrinkBoard);
            if(adminOptions.shrinkBoard)
                document.querySelector("#board").classList.remove("withAdminBar");
            this.parentNode.classList.remove("opened");
            this.parentNode.classList.add("closed");
            this.querySelector("i").classList.remove("fa-angle-double-left");
            this.querySelector("i").classList.add("fa-angle-double-right");
        }
    }
    var handleBar = document.querySelector("#sidebar .handleBar");
    handleBar.addEventListener("click", handleHandleBarClick, false);
    initAdminOptions();
});

