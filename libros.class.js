class libros extends orm {

	constructor() {
		super();

		this.dataBase = "biblioteca"; 
		this.table = "libros"

		// Fields
		this.fields.id_libro = ['integer', 'primary key'];
		this.fields.name = ['text'];
		this.fields.url = ['text']

		
		this.init(); // Run the last
	}


}