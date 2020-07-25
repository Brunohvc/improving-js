class ProxyFactory {

    static create(objeto, props, acao) {
        return new Proxy(objeto, {
            get(target, prop, receiver) {
                if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
                    return function () {
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                }

                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, reciver) {
                if (props.includes(prop)) {
                    target[prop] = value;
                    acao(target);
                }

                return Reflect.set(target, prop, value, reciver);
            }
        });
    }

    static _isFunction(func) {
        return typeof (func) == typeof (Function);
    }
}