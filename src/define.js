/*
 * func define/destroy to define/destroy a type
*/

Type.__defined__ = {};

Type.define = function(name, check, override){
    var Type = this;
    if(!Type.isStr(name) || !Type.isFunc(check)){
        throw new TypeError('Param error');
    }else if(!override && this.__defined__[name]){
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

        return this.__defined__[name] = funcCreator;
    }
};

Type.isType = function(t){
    return t && t.constructor === Type;
}

Type.mix = function(name){
    var types, type;
    if(!Type.isStr(name)){
        types = Array.prototype.slice.call(arguments, 0);
        name = null;
    }else{
        types = Array.prototype.slice.call(arguments, 1);
    }

    if(types.length < 2){
        throw new Error('Params error');
    }
    var i, l;
    for (i = 0, l = types.length; i < l; i++) {
        if(!Type.isType(types[i])){
            throw new TypeError('Param not a type');
        }
    }

    if(!name){
        name = 'MIX_OF_' + types[0].typeName;
        for (i = 1, l = types.length; i < l; i++) {
            name += '_' + types[i].typeName;
        }
        name += '@' + Date.now();
    }

    var checker = function(obj){
        for (var i = 0, l = types.length; i < l; i++) {
            if(!types[i].check(obj)){
                return false;
            }
        }
        return true;
    };

    return Type.define(name, checker);
};

Type.any = function(name){
    var types, type;
    if(!Type.isStr(name)){
        types = Array.prototype.slice.call(arguments, 0);
        name = null;
    }else{
        types = Array.prototype.slice.call(arguments, 1);
    }

    if(types.length < 2){
        throw new Error('Params error');
    }
    var i, l;
    for (i = 0, l = types.length; i < l; i++) {
        if(!Type.isType(types[i])){
            throw new TypeError('Param not a type');
        }
    }

    if(!name){
        name = 'ANY_OF_' + types[0].typeName;
        for (i = 1, l = types.length; i < l; i++) {
            name += '_' + types[i].typeName;
        }
        name += '@' + Date.now();
    }

    var checker = function(obj){
        for (var i = 0, l = types.length; i < l; i++) {
            if(types[i].check(obj)){
                return true;
            }
        }
        return false;
    };

    return Type.define(name, checker);
};

Type.isDefined = function(name){
    return !!this.__defined__[name];
};

Type.destroy = function(name){
    if(!Type.isStr(name)){
        throw new TypeError('Param error');
    }

    var type = this.__defined__[name];
    if(type){
        type = null;
        delete this.__defined__[name];
    }
};

Type.prototype.suicide = function(){
    this.constructor.destroy(this.typeName);
};