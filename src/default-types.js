/*
 * Some default types binded to window & Type
*/

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