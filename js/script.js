$(document).ready(function(){
	var items = $('#gallery li'),
		itemsByTags = {};

	//loop through tags
	items.each(function(i){
		var elem = $(this),
		tags = elem.data('tags').split(',');

		//Add data attribute for quicksand
		elem.attr('data-id',i);

		$.each(tags,function(key, value){
			//Remove whitespace
			value = $.trim(value);

			if(!(value in itemsByTags)){
				//Add empty value
				itemsByTags[value] = [];
			}

			//Add image to array
			itemsByTags[value].push(elem);
		});
	});

	//Create "All Itmes" option
	createList('All Items',items);

	$.each(itemsByTags, function(k, v){
		createList(k, v);
	});

	//Click handler
	$('#navbar a').live('click', function(e){
		var link = $(this);

		//Add active class
		link.addClass('active').siblings().removeClass('active');

		$('#gallery').quicksand(link.data('list').find('li'));
		e.preventDefault();
	});

	$('#navbar a:first').click();

	//create the lists
	function createList(text, items){
		/// create empy ul
		var ul = $('<ul>',{'class':'hidden'});

		$.each(items, function(){
			$(this).clone().appendTo(ul);
		});

		//Add gallery div
		ul.appendTo('#gallery');

		//create menu item
		var a = $('<a>', {
			html:text,
			href:'#',
			data:{list:ul}
		}).appendTo('#navbar');
	};
});