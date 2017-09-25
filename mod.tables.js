/*
var tableton = function(){
		var oTable = {
			tableId: 'mytable'
		};

		return {
			test: function(){
				//alert('test');
				alert(oTable.tableId);
			}
		};

}();
*/


(function(exports, $){
		var opt;
		var buffer = '';
		var rownums = 0;
		var oTable = {
			tableId: 'mytable',
			jsonFilename: 'json.txt'
		};


		exports.init = function(options){
			opt = $.extend({}, oTable, options);
			objstr = JSON.stringify(opt, "", 4);
				//alert(objstr);

			$(window).keydown(function(event){

					var t = event.target || event.srcElement;
					var elm_name = t.tagName.toLowerCase();
					console.log(elm_name);

				//$('#status').html(event.keyCode);
				//ловим событие нажатия клавиши
				if(event.keyCode == 13) {	//если это Enter
					if($('.selected_cell').is('td') && elm_name !== 'input'){
						console.log('selected td');
						$('.selected_cell').dblclick();
					}else{
						console.log('not td');
						$('#edit').blur();	//снимаем фокус с поля ввода
					}
					//alert('13');
				}



				
				var cell = $('.selected_cell');
				var cellIndex = cell.index();
				

			if(elm_name !== 'input'){
				if(event.ctrlKey && event.keyCode == 67){
					console.log('Index:' + cellIndex);
					console.log('combination ok');
					console.log($('button[data-action="copy"]').html());
					cell.parent('tr').find('button[data-action="copy"]').click();
					//$('button[data-action="copy"]').click();
				}

				if(event.ctrlKey && event.keyCode == 86){
					//console.log('combination ok');
					//console.log($('button[data-action="copy"]').html());
					cell.parent('tr').find('button[data-action="paste"]').click();
					//$('button[data-action="copy"]').click();
				}

				if(event.keyCode == 46){
					cell.parent('tr').prev('tr').find('td:eq('+cellIndex+')').addClass('selected_cell');
					cell.parent('tr').find('button[data-action="delete"]').click();
				}		


				if(event.keyCode == 39){
					//$('.selected_cell').css({'background': 'green'});
					//$('.selected_cell').next().css({'background': 'green'});
					
					
					if(cell.next('td').hasClass('notEditable')){
						if(!event.shiftKey){
							cell.removeClass('selected_cell');
						}
						cell.prevAll('td:eq(-1)').addClass('selected_cell');
					}else{
						$('.selected_cell').removeClass('selected_cell').next().addClass('selected_cell');
					}

				}


				if(event.keyCode == 37){
					//$('.selected_cell').css({'background': 'green'});
					//$('.selected_cell').next().css({'background': 'green'});
					
					//var cell = $('.selected_cell');
					//if(cell.prev().hasClass('notEditable')){
						//console.log(cell.prev()[0].tagName);
						//console.log(cell.prev().is('td'));
					//if(cell.prev().hasClass('notEditable')){
					//if(cell.prev()[0].tagName === 'undefined'){
					if(cell.prev().is('td') === false){
						cell.removeClass('selected_cell');
						cell.nextAll('td:last').prev().addClass('selected_cell');
					}
					else{
						if(!event.shiftKey){
							$('.selected_cell').removeClass('selected_cell').prev().addClass('selected_cell');
						}else{
							$('.selected_cell').prev().addClass('selected_cell');
						}
					}

				}

				if(event.keyCode == 40){
					//cell.parent('tr').next('tr').css({'background':'green'});
					if(cell.parent('tr').next('tr').is('tr') === false){
						cell.removeClass('selected_cell');
						cell.parent('tr').prevAll('tr:eq(-1)').find('td:eq('+cellIndex+')').addClass('selected_cell');
						//cell.css({'background':'purple'});
					}else{
						cell.removeClass('selected_cell');
						cell.parent('tr').next('tr').find('td:eq('+cellIndex+')').addClass('selected_cell');
					}
				} 

				if(event.keyCode == 38){
					//cell.parent('tr').next('tr').css({'background':'green'});
					if(cell.parent('tr').prev('tr').is('tr') === false){
						cell.removeClass('selected_cell');
						cell.parent('tr').nextAll('tr:last').find('td:eq('+cellIndex+')').addClass('selected_cell');
						//cell.css({'background':'purple'});
					}else{
						cell.removeClass('selected_cell');
						cell.parent('tr').prev('tr').find('td:eq('+cellIndex+')').addClass('selected_cell');
					}
				} 

			}//not input

			});


		};


		exports.update = function(){
				
				$('#'+opt.tableId).trigger('update');
				$("#"+opt.tableId).tableDnD();	
				console.log('update');
		};
//ON ON ON ON ON ON ON ON ON ON ON ON ON ON ON ON
		exports.on = function(){
				$('#'+opt.tableId).tablesorter();

				//this.update();

				$('#'+opt.tableId+'>tbody').on('mouseover', 'tr', function(e){
					//$(this).css({'background':'#eee'});
					$(this).addClass('tr_over');
				});


				$('#'+opt.tableId+'>tbody').on('mouseout', 'tr', function(e){
					//$(this).css({'background':''});
					$(this).removeClass('tr_over');
				});


				$('#'+opt.tableId+'>tbody>tr').on('keypress', 'td', function(e){
					console.log('keypress');
					//$(this).dblclick();
				});


				$('body').on('click', 'td', function(e){
					var t = e.target || e.srcElement;
					var elm_name = t.tagName.toLowerCase();
					//$(this).focus();
					if(elm_name == 'input' || $(this).hasClass('notEditable')){
						return false;
					}else{
						$('#edit').blur();
						//$(this).css({'background':'grey'});
						if($(this).hasClass('selected_cell')){
							$(this).removeClass('selected_cell');
						}else{
							if(!e.shiftKey){
								$('#'+opt.tableId+" td").removeClass('selected_cell');
							}
							$(this).addClass('selected_cell');
						}
						
						
					}
				});




				$('body').on('dblclick', 'td', function(e){

					var elClass = $(this).attr('class');
					if(elClass !== 'notEditable'){
					/*
					if($('input').is('#edit')){
						$('#edit').blur();
						tablesort();
					}
					*/
					//alert('click on TD');
					//ловим элемент, по которому кликнули
					var t = e.target || e.srcElement;
					//alert(t);
					//получаем название тега
					var elm_name = t.tagName.toLowerCase();

					//alert(elm_name);
					//если это инпут - ничего не делаем
					if(elm_name == 'input')	{
						return false;
					}else{
						$('#edit').blur();
					}
					var val = $(this).html();
					//alert(val);
					var code = '<input type="text" id="edit" value="'+val+'" />';
					//$(this).css({'background':'red'});
					$(this).empty().append(code);
					//$(this).empty().append('testj  kas kash');
					$('#edit').focus();

					$('#edit').blur(function()	{
						var val = $(this).val();
						$(this).parent().empty().html(val);
					});
}
				});


				$('#'+opt.tableId).on('click', 'button', function(){
					//alert($(this).html());
					var btn_action = $(this).attr('data-action');
					//var row = $(this).attr('data-row');
					//alert($(this).text());
					
					if(btn_action == 'delete'){
						//alert($(this).parent().html());
						//alert(row);
						//$('#row-'+row).remove();
						$(this).parent().parent().remove();
					}else if(btn_action == 'copy'){
						$(this).parent().parent('tr').removeClass();
						buffer = $(this).parent().parent('tr')[0].outerHTML;
						//var thead = $('#'+opt.tableId+'>thead>tr').html();
						//alert(thead);
						//buffer = $(this).parent('tr').tableToJSON();
						//alert(buffer);
						//console.log(JSON.stringify(buffer));
					}else if(btn_action == 'paste'){
						//alert(buffer);
						//create dom element and put html of buffer inside
						var div = document.createElement('tbody');
						div.innerHTML = buffer;
						//remove class and put html in buffer
						$(div).children('tr').children('td').removeClass('selected_cell');
						//alert(div.innerHTML);
						buffer = $(div).html();
						//alert($(div).html());
						$(this).parent().parent('tr').after(buffer);
					}
					exports.update();
				});

		};


		exports.showBuffer = function(){
			alert(buffer);
		}

		exports.test = function(){
			//alert(oTable.tableId);
			alert(objstr);
		}




		exports.createTableFrame = function (){
				var table = document.createElement('TABLE');
				table.id = opt.tableId;
				var thead = document.createElement('THEAD');
				var tbody = document.createElement('TBODY');
				tbody.id = 'tbody';
				table.appendChild(thead);
				table.appendChild(tbody);
				var tr = document.createElement('TR');
				//var tr = table.appendChild('TR');

				//HEADER
				thead.appendChild(tr);



				for(var arrValue in opt.tableFields){

						var th = document.createElement('TH');
						th.setAttribute('data-override',arrValue);//значение из этого аттрибута берется при формировании JSON
						//th.setAttribute('data-type',opt.tableFields[arrValue]['type']);
						tr.appendChild(th);
						//td.innerHTML = val;
						th.appendChild(document.createTextNode(' [ ' + opt.tableFields[arrValue]['title'] + ' ] '));
				}


				//HEADER END

					document.body.appendChild(table);
					exports.on();
		}

		exports.removeTBody = function (){
			$('#'+ opt.tableId +'>tbody').empty();
		}



		exports.readDataFromFile = function(){
				blur();
	//alert('convert to JSON');
				var ajaxData = {
					'action' : 'readJSON',
					'filename' : opt.jsonFilename
				};
				//this.ajaxQuery(ajaxData);
		
				$.when(this.ajaxQuery(ajaxData))
						.then(function(ajaxAns){
								//createTableFrame(tableFields);
								//alert (ajaxAns['json']);
								exports.removeTBody();
								exports.parseJSON(ajaxAns['json']);
								//exports.on();
								//exports.on();
						});

						exports.update();
			};



exports.writeDataInFile = function(){
	//alert('convert to JSON');
		var ajaxData = {
		'action' : 'writeJSON',
		'filename' : opt.jsonFilename,
		'tableId' : opt.tableId,
		'jsonData' : exports.convertToJSON()
	};

		$.when(this.ajaxQuery(ajaxData))
			.then(function(ajaxAns){
					alert (ajaxAns['result']);
			});
};



exports.convertToJSON = function(){
	var table = $('#'+opt.tableId).tableToJSON({
		//ignoreColumns: [0]
	});
	//alert(JSON.stringify(table));
	return JSON.stringify(table);
};


		exports.parseJSON = function (json){
			var json = JSON.parse(json);
			//alert(json[0]);
			var str = '';
			for(var i=0; i<json.length; i++){
				exports.addEmptyTableRow('tbody', json[i])
				//for(var val in json[i]){
				//	str=str+val+'=>'+json[0][val]+'\n';
				//}
			}	
			//alert(str);
		};




		exports.addEmptyTableRow = function (elementIdToAppend, rowObj){
			rownums++;
			var tr = document.createElement('TR');
			//tr.id = 'row-' + rownums;
			//tr.className = "ui-state-default";

				for(var arrValue in opt.tableFields){
				
					var td = document.createElement('TD');
					if(typeof(rowObj) == 'object'){
						td.innerHTML = rowObj[arrValue];	
					}
					
					tr.appendChild(td);

					//console.log('id:' + arrValue);
					//var inputVal = document.getElementById(arrValue).value;

					//td.innerHTML = inputVal;
					//td.style.border = 'solid 1px grey';
					//td.style.height = '20px';
					//td.appendChild(document.createTextNode(' [ ' + arrTmp[arrValue] + ' ] '));
				}


				var td = document.createElement('TD');

				var btn = document.createElement('BUTTON');
				//tr.appendChild(btn);
				td.appendChild(btn);
				btn.innerHTML = 'X';
				//btn.setAttribute('data-row', rownums);
				btn.setAttribute('data-action', 'delete');
				//btn.delete;

				var btn = document.createElement('BUTTON');
				//tr.appendChild(btn);
				td.appendChild(btn);
				btn.innerHTML = 'C';
				//btn.setAttribute('data-row', rownums);
				btn.setAttribute('data-action', 'copy');

				var btn = document.createElement('BUTTON');
				//tr.appendChild(btn);
				td.appendChild(btn);
				btn.innerHTML = 'P';
				//btn.setAttribute('data-row', rownums);
				btn.setAttribute('data-action', 'paste');
				td.className = 'notEditable';
				tr.appendChild(td);

			var elementToAppend = document.getElementById(elementIdToAppend);
			elementToAppend.appendChild(tr);
			//$("#"+opt.tableId).tableDnD();
//			exports.on();
				$('#'+opt.tableId).tablesorter();
				$("#"+opt.tableId).tableDnD();
		};



		exports.ajaxQuery = function(ajaxData){
		    return $.ajax({
		    	  type: 'POST',
		    		cache: false,
		    		async: false,
		        url: 'backend.php',
		        data: ajaxData,
		        })
		        .pipe(function(response){
		            var ajaxAns = JSON.parse(response);    
		            //alert(ajaxAns);
		            if(ajaxAns['error']){
		            	alert(ajaxAns['error']);
		            	return false;
		            }else{
		            	return ajaxAns;
		            }	
		        });
		};






})(this.tableton2 = {}, jQuery);


/*
$(document).ready(function(){

				$('body').on('mouseover', 'tr', function(e){
					$(this).css({'background':'grey'});
				});

				$('body').on('mouseout', 'tr', function(e){
					$(this).css({'background':''});
				});

});
*/