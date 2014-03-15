var startDebugMode = function() {
    localStorage.setItem("debug", "true");
    location.reload();
}
var stopDebugMode = function() {
    localStorage.setItem("debug", "false");
    location.reload();
}
var _console = new Object();
var debugMode = localStorage.getItem("debug") == "true" ? true : false;
_console.log = function(parms) {
    if(debugMode)
        console.log(parms);
}
_console.error = function(parms) {
    if(debugMode)
        console.error(parms);
}
_console.info = function(parms) {
    if(debugMode)
        console.info(parms);
}
_console.warn = function(parms) {
    if(debugMode)
        console.warn(parms);
}