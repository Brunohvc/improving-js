class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._form = $('.form');
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = ProxyFactory.create(
            new ListaNegociacoes(),
            ['adiciona', 'esvazia'],
            (model) => this._negociacoesView.update(model)
        );
        this._negociacoesView = new NegociacoesView($('#negociacoesView'), this._listaNegociacoes);
        this._mensagem = new Mensagem();

        this._mensagem = ProxyFactory.create(
            new Mensagem(),
            ['texto'],
            (model) => this._mensagemView.update(model)
        );

        this._mensagemView = new MensagemView($('#mensagemView'))

    }

    adiciona(event) {
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._limpaFormulario();
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso!';
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._form.reset();
        this._inputData.focus();
    }
}