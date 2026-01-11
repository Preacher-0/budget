class App {
    #store;
    #ui;

    constructor(store, ui) {
        this.#store = store;
        this.#ui = ui;
    }

    init() {
        this.#ui.bindAddTransaction(this.handleAdd.bind(this));
        this.render();
    }

    render() {
        const data = this.#store.getTransactions();
        this.#ui.render(data);
    }

    handleAdd(title, amount, type, category) {
        this.#store.addTransaction(title, amount, type, category);
        this.render();
    }
}