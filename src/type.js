var Type = function(){
    this.author = {
        name: 'nighca',
        email: 'nighca@live.cn'
    };
};

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

Type.__registered__ = {};

Type.define = function(name, check, override){
    var Type = this;
    if(!Type.isStr(name) || !Type.isFunc(check)){
        throw new TypeError('Param error');
    }else if(!override && this.__registered__[name]){
        throw new Error('Type ' + name + ' already exists');
    }else{
        var funcCreator = function(func){
            var argumentTypes = Array.prototype.slice.call(arguments, 1);
            var wrapper = function(){
                for (var i = 0, l = argumentTypes.length; i < l; i++) {
                    if(argumentTypes[i] && !argumentTypes[i].check(arguments[i])){
                        throw new TypeError(
                            'Unexpected argument, expecting ' +
                            argumentTypes[i].typeName +
                            ' (arg[' + i + '])'
                        );
                    }
                };
                var ret = func.apply(this, arguments);
                if(!check(ret)){
                    throw new TypeError('Unexpected result, expecting ' + name);
                }
                return ret;
            };
            wrapper.toString = function(){
                return func.toString();
            };
            return wrapper;
        };
        funcCreator.check = check;
        funcCreator.typeName = name;
        funcCreator.constructor = Type;
        funcCreator.__proto__ = Type.prototype;

        return this.__registered__[name] = funcCreator;
    }
};

Type.destroy = function(name){
    if(!Type.isStr(name)){
        throw new TypeError('Param error');
    }

    var type = this.__registered__[name];
    if(type){
        type = null;
        delete this.__registered__[name];
    }
};

window.Num = Type.Num = Type.define('NUMBER', Type.isNum);

window.Str = Type.Str = Type.define('STRING', Type.isStr);

window.Func = Type.Func = Type.define('FUNCTION', Type.isFunc);

window.Bool = Type.Bool = Type.define('BOOLEAN', Type.isBool);

window.Arr = Type.Arr = Type.define('ARRAY', Type.isArr);

window.Reg = Type.Reg = Type.define('REGEXP', Type.isReg);

window.Obj = Type.Obj = Type.define('OBJECT', Type.isObj);

window.Undef = Type.Undef = Type.define('UNDEFINED', Type.isUndef);

window.Nul = Type.Nul = Type.define('NULL', Type.isNul);

window.Void = Type.Void = Type.define('VOID', Type.isVoid);

Type.prototype.suicide = function(){
    this.constructor.destroy(this.typeName);
};