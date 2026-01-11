class Export {
    
    static generateCSV(transactions) {
        if (transactions.length === 0) {
            alert("Žádná data k exportu.");
            return;
        }

        //hlavicka CSV
        let csvContent = "data:text/csv;charset=utf-8,ID;Datum;Typ;Kategorie;Nazev;Castka\n";
        let date = new Date().toLocaleDateString('cs-CZ').replace(/\./g, '_');
        
        //pruchod dat a tvorba radku v CSV
        transactions.forEach(t => {
            csvContent += `${t.date};${t.type};${t.category};${t.title};${t.amount}\r\n`;
        });

        //stazeni souboru
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `budget_export_${date}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}