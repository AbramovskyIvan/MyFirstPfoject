var a = 25;
//just give me the 'a' value and you'll see the magic
var i = 1;
var str = '';

while (i <= a) {
	for (var x = 1; x <= i; x++) {
		str = str + '#';
	}
	console.log(str);
	str = '';
	i++;
}