(function ( window, factory ) {

    var Type = factory( window );

    if ( typeof module === "object" && typeof module.exports === "object" ) {
        // CMD module
        module.exports = Type;
    } else if ( typeof define === "function" && define.amd ) {
        // AMD module
        define( "Type", [], function() {
            return Type;
        });
    }

}(this, function ( window ) {

    "use strict";