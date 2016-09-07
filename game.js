String.prototype.replaceAt=function(index, character)
{
    return this.substr(0, index) + character + this.substr(index+character.length);
}

var slowo = "";
var slowo_display = "";
var used_letters = "";

var error_count = 0;

var play = false;

function toFloor(str)
{
	for (var i = 0; i < str.length; i++)
	{
		if (slowo[i] == ' ')
		{
			slowo_display += ' ';
		}
		else
		{
			slowo_display += '_';
		}
	}
}

function findKeys(c)
{
	var found = false;
	
	for (var i = 0; i < slowo.length; i++)
	{
		if (slowo[i] == c)
		{
			slowo_display = slowo_display.replaceAt(i, c);
			found = true;
		}
	}
	
	return found;
}

$('input#ready').click(function() {
	slowo = $('input#in').val().toLowerCase();
	
	if (slowo.length == 0)
	{
		alert('Podaj słowo!');
		return;
	}
	
	play = true;
	
	$('p#top').text('Pozostało ci 11 błędów.');
	
	toFloor(slowo);
	
	$('#letters').text(slowo_display);
	
	$('#word').fadeOut(function() {
		$('#letters').fadeIn();
	});
});

$(document).keypress(function(e) {
	if (!play) return;
	
	var ch = String.fromCharCode(e.charCode).toLowerCase();
	
	if (used_letters.search(ch) > -1) return;
	
	used_letters += ch;
	
	$('p#bottom').text('Użyte litery: ' + used_letters);
	
	if (!findKeys(ch))
	{
		error_count++;
		
		if (error_count <= 11)
		{
			$('p#top').text('Pozostało ci ' + (11 - error_count).toString() + ' błędów.');
			
			$('img#hangman').attr('src', 'img/' + error_count.toString() + '.png');
		}
		else
		{
			play = false;
			$('p#top').html('Przegrałeś!<br>Poprawna odpowiedź to: ' + slowo);
			$('p#top').animate({'font-size': '50px'});
			$('#letters').css('color', 'red');
			$('p#bottom').html('<a href="">Spróbuj jeszcze raz</a>');
		}
	}
	
	if (slowo_display.search('_') == -1)
	{
		$('p#top').text('Wygrałeś!');
		$('p#top').animate({'font-size': '50px'});
		$('#letters').css('color', 'green');
		$('p#bottom').html('<a href="">Spróbuj jeszcze raz</a>');
		
		play = false;
	}
	
	$('#letters').text(slowo_display);
	
});