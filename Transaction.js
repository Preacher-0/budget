class Transaction {
    constructor(title, amount, type, category) {
        this.id = Date.now();
        this.title = title;
        this.amount = parseFloat(amount);
        this.type = type;
        this.category = category;
        this.date = new Date().toLocaleDateString('cs-CZ');
    }
}