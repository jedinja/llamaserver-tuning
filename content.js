
const storageKey = 'llama';
var store = [];

function ce (tag) {
	return document.createElement(tag);
}

function te (tt) {
	return document.createTextNode(tt);
}

function ge (id) {
	return document.getElementById(id);
}


let cont = ce('div');
cont.id = 'cont';


let inp = ce('input');
inp.type = 'text';
inp.id = 'inp';


let add = ce('button');
add.prepend(te('Add watch'));
add.id = 'add';
add.onclick = () => {
	if (inp.value) {
		store.push(inp.value);
		chrome.storage.sync.set( { [storageKey]: store } );
		inp.value = '';
		createLinks();
	}
};


let games = ce('div');
games.id = 'games';
games.style = 'padding: 5px;'


let manage = ce('div');
manage.id = 'manage';
manage.style = 'padding: 5px;'


manage.prepend(add);
manage.prepend(inp);
manage.prepend(te('Enter a game name to watch! => '));
cont.prepend(manage);
cont.prepend(games);
document.body.prepend(cont);

chrome.storage.sync.get(storageKey, data => {
	store = Array.isArray(data[storageKey]) ? data[storageKey] : [];
	createLinks();
});

function createLinks () {

	clear(games);

	let currentGames = findGameNodes();

	for (let game of currentGames) {

		let topLinkGame = game.cloneNode(true);
		topLinkGame.style = "margin: 10px;"

		games.prepend(topLinkGame);
	}


	if (store.length !== currentGames.length) {

		store = currentGames.map(cg => cg.firstChild.textContent);

		chrome.storage.sync.set( { [storageKey]: store } );
	}
}

function clear (node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}

function findGameNodes() {

	let res = [];
	let all = document.getElementsByTagName('a');

	for (let i = 0; i < all.length; i++) {
		if (store.indexOf(all[i].firstChild.textContent) > -1) {
			res.push(all[i]);
		}
	}
	return res;
}
