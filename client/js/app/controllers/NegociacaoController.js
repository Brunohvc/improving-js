class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._form = $('.form');
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia'
        );

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        );
    }

    adiciona(event) {
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._limpaFormulario();
    }

    importaNegociacoes() {
        let service = new NegociacoesService();
        let promisseSemana = service.obterNegociacoesDaSemana();
        let promisseSemanaPassada = service.obterNegociacoesDaSemanaPassada();
        let promisseSemanaRetrada = service.obterNegociacoesDaSemanaRetrasada();

        Promise.all([promisseSemana, promisseSemanaPassada, promisseSemanaRetrada])
            .then(negociacoes => {
                negociacoes
                    .reduce((arrayNovo, array) => arrayNovo.concat(array), [])
                    .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações importadas!';
            })
            .catch(erro => {
                this._mensagem.texto = erro;
            });


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