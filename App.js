class App {
    #store;
    #ui;

    constructor(store, ui) {
        this.#store = store;
        this.#ui = ui;
    }

    init() {
        this.render();
    }

    render() {
        const data = this.#store.getTransactions();
        this.#ui.render(data);
    }
}