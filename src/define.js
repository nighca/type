/*
 * func define/destroy to define/destroy a type
*/

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

Type.prototype.suicide = function(){
    this.constructor.destroy(this.typeName);
};