const [open, view, del] = document.querySelectorAll('nav button');
const popup = document.querySelector('aside');
const ck = popup.querySelector('#ck');
const close = popup.querySelector('button');

//쿠키확인
view.addEventListener('click', () => console.log(document.cookie));

//팝업 열기
open.addEventListener('click', () => {
	popup.style.display = 'block';
});

//팝업 닫기
close.addEventListener('click', () => {
	if (ck.checked) setCookie('today', 'done', 1);
	popup.style.display = 'none';
});

//쿠키생성 함수
function setCookie(name, value, expires) {
	let today = new Date();
	let dueDate = today.getDate() + expires;
	today.setDate(dueDate);
	document.cookie = `${name}=${value}; path=/; expires=${today.toString()}`;
}
