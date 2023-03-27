
class Field {
    constructor(value, type) {
        this.value = value;
        this.type = type;
        this.formattedValue = null;
    }
    format(newFormat) {
        this.formattedValue = formatValue(this.value, this.type, newFormat);
    }
}

class Row {
    constructor() {
        this.id = null
        this.fields = [];
    }
    setID(id) {
        this.id = id
    }
    addField(type, value) {
        let field = new Field(value, type);
        this.fields.push(field);        
    }
}


class TableHandler {
    constructor(table, config) {
        this.table = table;
        this.config = config;
        this.rows = [];
    }
    _clearTable(table) {
        this.table.innerHTML = "";
    }
    _createRowStructure(row) {
        let table_row = document.createElement("tr");
        console.log(row.fields);
        for (let i = 0; i < FIELD_NAMES.length; i++) {
            if (this.config.fields[FIELD_NAMES[i]]) {
                console.log(row.fields[i]);
                row.fields[i].format(this.config.formats[FIELD_NAMES[i]]);
                var element = document.createElement("td");
                let text = document.createTextNode(row.fields[i].formattedValue);
                element.appendChild(text);
                table_row.appendChild(element)
            }
        } 
        return table_row;
    }
    _createThStructure() {
        let table_row = document.createElement("tr");
        for (let i = 0; i < FIELD_NAMES.length; i++) {
            if (this.config.fields[FIELD_NAMES[i]]) {
                var element = document.createElement("th");
                let text = document.createTextNode(FIELD_DISPLAY_NAMES[i]);
                element.appendChild(text);
                table_row.appendChild(element)
            }
        } 
        return table_row;
    }
    _display() {
        let th = this._createThStructure();
        this.table.appendChild(th);
        for (let i = 0; i < this.rows.length; i++) {
            let row = this._createRowStructure(this.rows[i]);
            this.table.appendChild(row);
        } 
        console.log(this.table.childNodes);
    }
    getLatestRowID() {
        try {
            return this.rows[this.rows.length - 1].id;
        } catch {
            return null;
        }
    }
    refreshTable() {
        this._clearTable();
        this._display();
    }
    addRow(row) {
        this.rows.push(row);
    }
    
}
