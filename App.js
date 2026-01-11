class App {
    #store;
    #ui;

    constructor(store, ui) {
        this.#store = store;
        this.#ui = ui;
    }

    init() {
        //pridani polozky
        this.#ui.bindAddTransaction(this.handleAdd.bind(this));

        //export a smazani polozky
        this.#ui.bindExportBtn(this.handleExport.bind(this));
        this.#ui.bindResetBtn(this.handleReset.bind(this));

        this.render();
    }

    render() {
        const data = this.#store.getTransactions();
        this.#ui.render(data);

        this.#ui.bindDeleteBtns(this.handleDelete.bind(this));
    }

    handleAdd(title, amount, type, category) {
        this.#store.addTransaction(title, amount, type, category);
        this.render();
    }

    //mazacka jedne polozky
    handleDelete(id) {
        this.#store.removeTransaction(id);
        this.render();
    }

    //mazacka vseho
    handleReset() {
        if(confirm("Opravdu smazat všechna data?")) {
            this.#store.resetData();
            this.render();
        }
    }

    //volani exportu
    handleExport() {
        const data = this.#store.getTransactions();
        Export.generateCSV(data);
    }
}