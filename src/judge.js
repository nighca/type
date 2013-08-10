/*
 * Some funcs to judge obj type
*/

Type.toString = function(){
    return JSON ? JSON.stringify(new this()) : '>_<';
};

Type.format = function(obj){
    return Object.prototype.toString.call(obj);
};

Type.isNum = function(obj){
    return typeof obj === 'number' || Type.format(obj) === '[object Number]';
};

Type.isStr = function(obj){
    return typeof obj === 'string' || Type.format(obj) === '[object String]';
};

Type.isFunc = function(obj){
    return typeof obj === 'function' || Type.format(obj) === '[object Function]';
};

Type.isBool = function(obj){
    return typeof obj === 'boolean' || Type.format(obj) === '[object Boolean]';
};

Type.isArr = function(obj){
    return Type.format(obj) === '[object Array]';
};

Type.isReg = function(obj){
    return Type.format(obj) === '[object RegExp]';
};

Type.isObj = function(obj){
    return Type.format(obj) === '[object Object]';
};

Type.isUndef = function(obj){
    return typeof obj === 'undefined';
};

Type.isNul = function(obj){
    return Type.format(obj) === '[object Null]';
};

Type.isVoid = function(obj){
    return true;
};