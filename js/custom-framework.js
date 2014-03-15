var _onReady = function(callback) {
    if(document.readyState === "complete")
        callback();
    else
        document.onreadystatechange = function () {
            if (document.readyState === "complete") {
                callback();
            }
        }
        }

var initFramework = function() {
    _console.log("Initialising framework");
}
var fadeOut = function(elem) {
    var opacity = 1;
    function frame() {
        opacity = opacity - 0.08;
        elem.style.opacity = opacity // show frame
        if (opacity <= 0)  // check finish condition
            clearInterval(int)
            }
    var int = setInterval(frame, 10) // draw every 10ms
    }
var fadeIn = function(elem) {
    var opacity = 0;
    function frame() {
        opacity = opacity + 0.08;
        elem.style.opacity = opacity // show frame
        if (opacity >=1)  // check finish condition
            clearInterval(int)
            }
    var int = setInterval(frame, 10) // draw every 10ms
    }
initFramework();
