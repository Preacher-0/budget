class Store {
    #transactions = [];

    constructor() {
        this.#transactions = this.loadData();
    }

    getTransactions() {
        return this.#transactions;
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