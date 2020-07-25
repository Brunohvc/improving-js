class ListaNegociacoes {

    constructor(contexto, armadilha) {
        this._negociacoes = [];
        this._armadilha = armadilha;
        this._contexto = contexto;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        this._executaArmadilha();
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    esvazia() {
        this._negociacoes = [];
        this._executaArmadilha();
    }

    _executaArmadilha() {
        // Params: funcão que quer executar, contexto no qual quer executar, array de parametros
        Reflect.apply(this._armadilha, this._contexto, [this]);
    }
}