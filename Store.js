class Store {
    #transactions = [];

    constructor() {
        this.#transactions = this.loadData();
    }

    getTransactions() {
        return this.#transactions;
    }

    addTransaction(title, amount, type, category) {
       
        const trans = new Transaction(title, amount, type, category);

        this.#transactions.push(trans);
        this.saveData();
    }

    //mazacka jednotlive polozky
    removeTransaction(id) {
        this.#transactions = this.#transactions.filter(t => t.id != id);
        this.saveData();
    }

    //maazcka vseho existovani
    resetData() {
        this.#transactions = [];
        this.saveData();
    }

    //ukladani a nacitani
    saveData() {
        localStorage.setItem("budget_data", JSON.stringify(this.#transactions));
    }

    loadData() {
        const saved = localStorage.getItem("budget_data");
        if (saved) {
            return JSON.parse(saved);
        } else {
            return [];
        }
    }
}