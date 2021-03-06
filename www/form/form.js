/* Form main JS */
s('.material-form').pageInit(function(){formInit();});

/** */
var formInit = function()
{	
	// Add tabs support
	s('#material-tabs').tabs();
	
	// Make CMSNav beatiful select
	s('.selectify').selectify();

	// Material name field
	var name_field = s('#Name');
	
	// On name focus
	name_field.focus(function()
	{
		// If URL is not generated - set automatic URL generation
		if( !s('#Url').val().length ) s('#Name').keyup( generateUrl );	
	});	
	
	// Url generator
	s('.create_url').click(generateUrl, true, true );
	
	// Save button logic
	s('#btnSave').click(function(){saveMain( true );},true,true);
	
	// Apply button logic
	s('#btnApply').click(function(){saveMain( true );}, true, true);

    // Make fixed header to additional fields
    s('.field_table').pageInit(function(header){
        var tab = $('.field_table').parents('.tab-content');
        var shownBefore = tab.css('display');
        tab.show();
        header.fixedHeader();
        tab.css('display', shownBefore);
    });
};


/** Main tab saving logic */
var saveMain = function( redirect )
{
	// Cache form
	var form = s('#material_editor');
	
	// Create loader object
	var loader = new Loader( form );
	loader.show('Обновление формы',true);
	
	// Async form send	
	form.ajaxForm(function(response)
	{	
		// Parse JSON response
        response = JSON.parse( response );
		// Redirect
		if( redirect == true ) window.location.href = (response.url !== undefined) ? response.url : s('#appName').val() + '/form/' + s('#MaterialID').val();
		// Rerender form
		else
		{			
			// If we have responce from server
			if( response ) try
			{						
				// If we have table html - update it
				if( response.form ) 
				{		
					// Refresh page
					window.location.href = response.url;
					
//					// Get parent container
//					var parent = s('.material-create').parent();			
//					
//					// Remove current form
//					s('.material-create').remove();
//					
//					// Show new form
//					parent.append( response.form );
//					
//					// Reinit form
//					formInit();				
					
					loader.hide();
				}
			}		
			catch(e){ s.trace('Ошибка обработки ответа полученного от сервера, повторите попытку отправки данных:'+e); };	
		}
	});	
};

/** URL transliteration generator */
var generateUrl = function()
{
	// Fill translit
	s('#Url').val( s('#Name').translit() );	
};