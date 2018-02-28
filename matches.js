const readlineSync = require('readline-sync');
const cntOfMatchesTyped = readlineSync.question('Type count of matches');
const maxMatchesTyped = readlineSync.question('Type count of matches that the Player can take on his turn');
const whoStartTyped = readlineSync.question('Type 1 to start first, type 0 to start second');
var matchesLeave = 0;

maxMatches = Number(maxMatchesTyped);
cntOfMatches = Number(cntOfMatchesTyped);
matchesLeave = cntOfMatches;
whoStart = Number(whoStartTyped);

//numbers checking
if (cntOfMatches <= 0 || maxMatches <= 0) {
	console.log('zero detected. stop working');
	return;
}
if (cntOfMatches < maxMatches * 3) {
	console.log('too small count of matches. stop working');
	return;
}
if (whoStart != 1 && whoStart != 0) {
	console.log('you did not choose turn. so my turn now!');
	whoStart = 0;
}


while (matchesLeave >= 1) {
	if (whoStart = 0) {
		А = (matchesLeave - 1)%(maxMatches + 1);
		console.log(toString(A));
		whoStart = 1;
	} else {
		return;
	}	
}
