var h_hght = 60; // высота шапки
var h_mrg = 0;   // отступ когда шапка уже не видна
$(function()
{
	$(window).scroll(function()
	{
		var top = $(this).scrollTop();
		var elem = $('#menu');
		if (top+h_mrg < h_hght) 
		{
			elem.css('top', (h_hght-top));
		} 
		else 
		{
			elem.css('top', h_mrg);
		}
	});
});



$(function() 
{
	$(window).scroll(function()
	{
		if($(this).scrollTop() != 0) 
		{
			$('#toTop').fadeIn();
		} 
		else 
		{
			$('#toTop').fadeOut();
		}
	});
	$('#toTop').click(function() 
	{
		$('body,html').animate({scrollTop:0},800);
	});
});



$('#send').click (function () {
var email = $('#email').val ();
var name = $('#name').val ();
var message = $('#message').val ();
	$.ajax({
		url:    	'ajax/feedback.php',
		type:		'POST',
		cache: 		false,
		data:   	{'name':name, 'email':email, 'message':message},
		dataType:	'html',
		beforeSend: function () {
			$('#send').attr ("disabled", "disabled");
		},
		success: function(data) {
			if (data == true) {
				$('#name').val ("");
				$('#email').val ("");
				$('#message').val ("");
				$('#send').text ("Сообщение отправлено");
				$('#email').css ("border-color", "#60fc8c");
				$('#name').css ("border-color", "#60fc8c");
				$('#message').css ("border-color", "#60fc8c");
			} else {
				if (data == false)				
					alert ("Что-то пошло не так! Сообщение не отправлено");
				else {					
					switch (data) {
					case "Имя не указано":
					$('#name').css ("border-color", "#f7b4b4");
					break;
					case "Сообщение не указано":
					$('#message').css ("border-color", "#f7b4b4");
					break;
					case "Неправильный e-mail":
					$('#email').css ("border-color", "#f7b4b4");
					break;
					default:
					$('#email').css ("border-color", "#f7b4b4");
					$('#message').css ("border-color", "#f7b4b4");
					$('#name').css ("border-color", "#f7b4b4");
					}
				}
			}
			$('#send').removeAttr ("disabled");				
		}
	});
});