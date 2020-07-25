class NegociacoesService {

    obterNegociacoesDaSemana(callBack) {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/semana');

        xhr.onreadystatechange = () => {
            /*  Tipos de status da requisição
                0: requisição ainda não iniciada
                1: conexão com o servidor estabelecida
                2: requisição recebida
                3: processando requisição
                4: requisição concluída e a resposta está pronta
            */

            // verifica se a requisição foi concluída e o servidor respondeu algo
            if (xhr.readyState == 4) {

                // verifica se a requisição mandou uma resposta com sucesso
                if (xhr.status == 200) {
                    callBack(null,
                        JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                } else {
                    // Ocorreu algum erro
                    console.log(xhr.responseText);
                    callBack('Erro ao obter negociações!');
                }
            }
        };

        xhr.send();
    }
}