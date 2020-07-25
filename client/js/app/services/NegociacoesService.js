class NegociacoesService extends HttpService {

    obterNegociacoesDaSemana() {
        return new Promise((resolve, reject) => {
            this.get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    );
                })
                .catch(erro => {
                    console.log(xhr.responseText);
                    reject('Erro ao obter negociações da semana!');
                })
        });
    }

    obterNegociacoesDaSemanaPassada() {
        return new Promise((resolve, reject) => {
            this.get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    );
                })
                .catch(erro => {
                    console.log(xhr.responseText);
                    reject('Erro ao obter negociações da semana passada!');
                })
        });
    }

    obterNegociacoesDaSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this.get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    );
                })
                .catch(erro => {
                    console.log(xhr.responseText);
                    reject('Erro ao obter negociações da semana passada!');
                })
        });
    }
}