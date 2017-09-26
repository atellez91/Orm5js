/**
 * Clase principal que contiene toda la logica de conexion con la base de datos
 * 
 * @author atellez
 * @copyright 2017
 */
class connectionDB {

	constructor(dataBase, version = "1.0", description = "", size = 2 * 1024 * 1024) {
		
		// Database parameters
		this.dataBase = dataBase;
		this.version = version;
		this.description = description;
		this.size = size; // Default: 2MB

		this.conn = null;

		// Creating connection
		this.connect();
	}
	
	/**
	 * Setea el nombre de la base de datos
	 * @param {String} dataBase 
	 */
	setDataBase(dataBase) {
		this.dataBase = dataBase;
	}
	
	/**
	 * Recupera el nombre de la base de datos
	 */
	getDataBase() {
		return this.dataBase;
	}
	
	/**
	 * Setea la version de la base de datos
	 * @param {String} version 
	 */
	setVersion(version) {
		this.version = version;
	}
	
	/**
	 * Recupera la version de la base de datos
	 */
	getVersion() {
		return this.version;
	}
	
	/**
	 * Setea la descripcion de la base de datos
	 * @param {String} description 
	 */
	setDescription(description) {
		this.description = description;
	}
	
	/**
	 * Recupera la descripcion de la base de datos
	 */
	getDescription() {
		return this.description;
	}
	
	/**
	 * Setea el tamaño de la base de datos
	 * @param {Integer} size 
	 */
	setSize(size) {
		this.size = size;
	}
	
	/**
	 * Recupera el tamaño de la base de datos
	 */
	getSize() {
		return size;
	}
	
	/**
	 * Crea una conexion con la base de datos
	 */
	connect() {
		var $this = this;
		this.conn = openDatabase(this.dataBase, this.version , this.description, this.size, function() {
			console.info("Database "+$this.dataBase+" created correctly");
		});
	}
	
	/**
	 * Ejecuta una consulta
	 * @param {String} query 
	 */
	execute(query, callback = null) {
		if(this.conn == null) {
			//this.open();
		}

		console.log("QUERY: "+query);
		this.conn.transaction(function(cntxt) {

			cntxt.executeSql(query,[], function(tx, results){
				console.log("RESULTADO ("+results.rows.length+"):",results.rows);
				if(typeof callback == "function") {
					callback(results.rows);
				}
			}, function(e){
				console.error("SQL ERROR: ", e);
			});
		});

	}

}