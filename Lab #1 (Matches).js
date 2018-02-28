var readlineSync = require('readline-sync');
var cntOfMatchesTyped = '';
var maxMatchesTyped = '';
var whoStartTyped = '';

var matchesLeave = 0;
var whoStart = true;
var maxMatches = 0;
var cntOfMatches = 0;
var matchesLeave = 0;
var a = 0;
var playerTake = 0;
var playerTakeType = '';

cntOfMatchesTyped = readlineSync.question('Type count of matches: ');
cntOfMatches = Number(cntOfMatchesTyped);
cntOfMatchesTypedCh = String(cntOfMatches);
if (cntOfMatchesTypedCh != cntOfMatchesTyped || cntOfMatches <= 0) {
	console.log('you type wrong count of matches. stop working');
	return;
}
matchesLeave = cntOfMatches;

maxMatchesTyped = readlineSync.question('Type count of matches that the Player can take on his turn: ');
maxMatches = Number(maxMatchesTyped);
maxMatchesTypedCh = String(maxMatches);
if (maxMatchesTyped != maxMatchesTypedCh || maxMatches <= 0) {
	console.log('you type wrong max tacking matches. stop working');
	return;
}
if (maxMatches <= 3) {
	console.log('only ' + maxMatches + ' is not interesting for me. stop working');
	return;
}

if (cntOfMatches < maxMatches * 3) {
	console.log('too small count of matches. stop working');
	return;
}

whoStartTyped = readlineSync.question('Type 1 to start first, type 2 to start second: ');
if (whoStartTyped == '2') {
	whoStart = true;
} else if (whoStartTyped == '1') {
	whoStart = false;
} else {
	console.log('you did not choose turn (or did it wrong). so...');
	console.log('---');
	whoStart = true;
}

while (matchesLeave > 1) {
	if (whoStart) {
		console.log('my turn!');
		mL = matchesLeave - 1;
		mM = maxMatches + 1;
		a = mL % mM;
		if (a == 0) {
			console.log('I take ' + maxMatches + ' matches!');
			matchesLeave = matchesLeave - maxMatches;
			console.log('---> ' + matchesLeave + ' matches leaved');
		} else {
			console.log('I take ' + a + ' matches!');
			matchesLeave = matchesLeave - a;
			console.log('---> ' + matchesLeave + ' matches leaved');
		}
		whoStart = false;
		console.log('---');
	} else {
		//yeap! the Player mistakes apriory!
		mistake = true;
		while (mistake) {
			playerTakeType = readlineSync.question('your turn: ');
			playerTake = Number(playerTakeType);
			if (playerTake <= 0 || playerTake > maxMatches) {
				console.log('no-no-nope! Type a number between 1 and ' + maxMatches);
			} else {
				mistake = false;
			}
		}
		matchesLeave = matchesLeave - playerTake;
		console.log('---> ' + matchesLeave + ' matches leaved');
		console.log('---');
		whoStart = true;
	}	
}

if (matchesLeave == 1) {
	if (whoStart) {
		console.log('***************************');
		console.log('*You win! Congratulations!*');
		console.log('***************************');
	} else {
		console.log('**********************************************');
		console.log('*I win! Do not be sad! Let us play once more!*');
		console.log('**********************************************');
	}
} else {
	console.log('Hmmm... It is broken.');
}