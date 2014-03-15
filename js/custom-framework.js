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
var getEventTarget = function(ev) {
        var targ;
        if (!e) var e = window.event;
        if (e.target) targ = e.target;
        else if (e.srcElement) targ = e.srcElement;
        if (targ.nodeType == 3) // defeat Safari bug
            targ = targ.parentNode;
        return targ;
    }
var initFramework = function() {
    _console.log("Initialising framework");
}
function fadeOut(elem) {
  var opacity = 1;
  function frame() {
    opacity = opacity - 0.08;
    elem.style.opacity = opacity // show frame
    if (opacity <= 0)  // check finish condition
      clearInterval(int)
  }
  var int = setInterval(frame, 10) // draw every 10ms
}
function fadeIn(elem) {
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
