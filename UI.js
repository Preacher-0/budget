class UI {
    #listContainer;
    #balanceEl;
    #form;
    #btnExport;
    #btnReset;

    constructor() {
        this.#listContainer = document.getElementById('transaction-list');
        this.#balanceEl = document.getElementById('balance');
        this.#form = document.getElementById('transaction-form');
        this.#btnExport = document.getElementById('btn-export');
        this.#btnReset = document.getElementById('btn-reset');
    }

    render(transactions) {
        //cistka tabulky
        this.#listContainer.innerHTML = "";

        for (let t of transactions) {
            let row = document.createElement("tr");
            let rowClass;
            let amountClass; 
            let sign;
            
            //rozhodovano jestli income nebo expense
            if (t.type === 'income') {
                rowClass = 'item-income';
                amountClass = 'amount-income';
                sign = '+';
            } else {
                rowClass = 'item-expense';
                amountClass = 'amount-expense';
                sign = '-';
            }

            row.className = rowClass;

            row.innerHTML = `
                <td>${t.title} <br><small style="color:#888">${t.date}</small></td>
                <td>${t.category}</td>
                <td class="${amountClass}">${sign} ${t.amount} Kč</td>
                <td><button class="btn-delete" data-id="${t.id}" style="padding: 5px 10px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;">X</button></td>
                <td></td> 
            `;

            this.#listContainer.appendChild(row);
        }

        this.updateBalance(transactions);
    }

    updateBalance(transactions) {
        let total = 0;
        
        for (let t of transactions) {
            if (t.type === 'income') {
                total += t.amount;
            } else {
                total -= t.amount;
            }
        }

        this.#balanceEl.innerText = `${total} Kč`;
        
        if (total >= 0) {
            this.#balanceEl.className = "positive";
        } else {
            this.#balanceEl.className = "negative";
        }
    }

    bindAddTransaction(handler) {
        this.#form.addEventListener('submit', (event) => {
            //neobnovit stranku
            event.preventDefault();
            
            // data z fomrulare
            const formData = new FormData(this.#form);
            const title = formData.get('title');
            const amount = formData.get('amount');
            const type = formData.get('type');
            const category = formData.get('category');
            
            // jestli je nazev a castka ok tak posleme do app do handleru
            if (title && amount) {
                handler(title, amount, type, category);
                this.#form.reset();
            }
        });
    }
}