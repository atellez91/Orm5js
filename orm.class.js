/**
 * Clase principal que contiene toda la logica comun de los ORM
 * 
 * @author atellez
 * @copyright 2017
 */
class orm {

	constructor() {
		this.dataBase = null;
		this.conn = null;

		
		this.fields = {};
		this.pkFields = [];
		this.new = true;

		this.debug = true;
		
	}
	
	/**
	 * Inicializa la tabla y setea los valores necesarios
	 */
	init() {
		let $this = this;

		// 1.- Creating connection
		this.conn = new connectionDB(this.dataBase);
	
		// 2.- Creating table (if not exists)
		if(Object.keys(this.fields).length > 0 ) {
			
			// Set table fields
			let values = [];
			for( var key in this.fields) {
				values.push(key+" "+ this.fields[key].join(" "));
				Object.defineProperty($this, key, {
					value: null,
					writable: true
				});

				this.fields[key].forEach(function(val){
					if(val.toUpperCase() == "PRIMARY KEY") {
						$this.pkFields.push(key);
					}
				})
			}
			
			// Creating table
			this.conn.execute("CREATE TABLE IF NOT EXISTS "+this.table+" ("+values.join(", ")+")");
			
		} else {
			this.log("It is necessary to define at least one field for the table", "error");
		}
		
	}
	
	/**
	 * Recupera los campos de la tabla
	 */
	getFields() {
		let fields = [];
		for( var key in this.fields) {
			fields.push(key);
		}

		return fields;
	}

	/**
	 * Recupera las claves primarias de la tabla
	 */
	getPkFields() {
		return this.pkFields;
	}
	
	/**
	 * Borra el contenido de una tabla y reseta los indices
	 */
	truncate() {
		this.conn.execute("BEGIN TRANSACTION");
		this.conn.execute("DELETE FROM "+this.table);
		this.conn.execute("VACUUM");
		this.conn.execute("COMMIT");
	}
	
	/**
	 * Borra una tabla
	 */
	drop() {
		this.conn.execute("DROP TABLE "+this.table);
	}
	
	/**
	 * Busca un valor por las claves primarias
	 * @param {Array} values 
	 */
	getByPk(values) {
		if(values.length == this.pkFields.length) {
			var conds = [];
			for(var i = 0; i < values.length; i++) {
				conds.push(this.pkFields[i] + " = " + values[i]);
			}
			var query = "SELECT * FROM "+this.table+" WHERE "+conds.join(" AND ");
			this.conn.execute(query);
			
		} else {
			this.log("The number of values ​​is incorrect","error")
		}
		
	}
	
	/**
	 * Recupera valores que coincidan por un campo y valor dados
	 * @param {String} field 
	 * @param {String} value 
	 */
	getByField(field, value) {
		var query = "SELECT * FROM "+this.table+" WHERE "+field+" = '"+value+"'";
		this.conn.execute(query);
	}
	
	//TODO
	save() {
		// recorrer los campos de la tabla y setear su valor
		
		this.conn.execute()
	}
	
	//TODO
	insert() {
		this.conn.execute("INSERT INTO "+this.table+" (name, url) VALUES ('cams 1','url de la cam 1')");

	}
	
	
	/**
	 * Muestra un mensaje en la consola si esta activo el debug
	 * @param {Mixed} text 
	 * @param {String} type 
	 */
	log(content, type = "log") {
		if(this.debug) {
			if(console[type] == undefined) {
				console.warn("Method: "+type+" is not defined in console object");
				console.log("[DEBUG|"+type+"] ",content);
			} else {
				console[type]("[DEBUG|"+type+"] ",content);
			}
		}
	}

}