const [open, view, del] = document.querySelectorAll('nav button');
const popup = document.querySelector('aside');
const ck = popup.querySelector('#ck');
const close = popup.querySelector('button');

open.addEventListener('click', () => {
	popup.style.display = 'block';
});

close.addEventListener('click', () => {
	popup.style.display = 'none';
});

function setCookie(name, value, expires) {
	let today = new Date(); //시작 인수값
	let dueDate = today.getDate() + expires;
	//현재 시간으로부터 2틀뒤로 덮어야 됨
	//setDate
	today.setDate(dueDate);
	document.cookie = `${name}=${value}; path=/; expires=${today.toString()}`;
	//today.toString() -> 숫자를 강제로 문자로 변경함
}
