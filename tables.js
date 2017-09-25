//var rownums = 0;
//var grid = document.getElementById('mytable');

//tableton.test();



$(document).ready(function(){
	//https://habrahabr.ru/post/247857/


	tableFields = {
		'type': {
			'title': "Древесина",
			'type': "string"
		},
		'sort': {
			'title': "Сорт",
			'type': "string"	
		},
		'length': {
			'title': "Длина",
			'type': "number"
		}
	};



var tab1 = tableton2;

tab1.init({
	//tableId : 'mynewtable',
	tableFields : tableFields,
	jsonFilename : 'json.txt'
});


tab1.createTableFrame();



//tabella('hallo');


})//document ready