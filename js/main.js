const [open, view, del] = document.querySelectorAll('nav button');
const popup = document.querySelector('aside');
const ck = popup.querySelector('#ck');
const close = popup.querySelector('button');

document.cookie.indexOf('today=done') < 0
	? (popup.style.display = 'block')
	: (popup.style.display = 'none');

//쿠키확인
view.addEventListener('click', () => console.log(document.cookie));

del.addEventListener('click', () => {
	setCookie('today', 'done', 24);
	//만료시간이 오늘이 되므로 바로 쿠키가 삭제됨
	alert('쿠키삭제');
});

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
	let now = new Date();
	//현재 밀리세컨드 시간값에 1시간(1000*60*60) * expires
	let dueDate = now.getTime() + 1000 * 60 * 60 * expires; //밀리세컨드 변환
	now.setTime(dueDate); //10초 추가된 값으로 setTime바꿈
	document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`;
}
