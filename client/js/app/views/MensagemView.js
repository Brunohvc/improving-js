class MensagemView extends View {

    constructor(elemento, model = { texto: '' }) {
        super(elemento);
        this.update(model);
    }

    template(model) {
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : '<p></p>';
    }
}