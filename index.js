var vm = require('vm');
var fs = require('fs');
var path = require('path');
var assign = require('object-assign');

function requireWith(required, mocks) {
    requireWith.context = context;

    var result = requireWith.context(required, mocks);
    return assign({}, result.exports, result.module.exports);
}

requireWith.context = context;

function getModulePath(required){
    var isRelative = required.charAt(0) === '.';
    var isAbsolute = path.parse(required).root !== '';
    if(isRelative){
        return require.resolve(path.resolve(path.dirname(module.parent.filename), required));
    }
    else if(isAbsolute){
        return require.resolve(required);
    }
    else {
        return required;
    }
}

function context(required, mocks) {
    mocks = mocks || {};
    for (var i in mocks){
        if(mocks.hasOwnProperty(i) && (i !== getModulePath(i))){
            mocks[getModulePath(i)] = mocks[i];
            delete mocks[i];
        }
    }

    var exports = {};
    var context = {
        require: function(name) {
            name = getModulePath(name);
            var parsed = path.parse(name);
            if(mocks[name]){
                return mocks[name];
            }
            else if(mocks[parsed.name]){
                return mocks[parsed.name];
            }
            else if(mocks[parsed.base]){
                return mocks[parsed.base];
            }
            return require(name);
        },
        console: console,
        exports: exports,
        module: {
            exports: exports
        }
    };

    vm.runInNewContext(fs.readFileSync(getModulePath(required)), context);
    return context;
}

module.exports = requireWith;