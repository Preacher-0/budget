class UI {
    #listContainer;
    #balanceEl;

    constructor() {
        this.#listContainer = document.getElementById('transaction-list');
        this.#balanceEl = document.getElementById('balance');
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
}