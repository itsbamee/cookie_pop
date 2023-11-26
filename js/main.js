const [view, del] = document.querySelectorAll('nav button');
const lastTime = 2;

//1. 다큐먼트 쿠키가 있을 때에만 보여주고
if (document.cookie.indexOf('today=done') < 0) {
	createPop({ wid: 600, bg: 'lightcoral', lastTime });
}

//쿠키만 확인
view.addEventListener('click', () => console.log(document.cookie));

//쿠키만 삭제
del.addEventListener('click', () => {
	setCookie('today', 'done', 0);
	alert('쿠키삭제');
});

//쿠키생성 함수
function setCookie(name, value, hours) {
	let now = new Date();
	//현재 밀리세컨드 시간값에 1시간(1000*60*60) * expires
	let dueDate = now.getTime() + 1000 * 60 * 60 * hours; //밀리세컨드 변환
	now.setTime(dueDate);
	document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`;
}

//팝업생성 함수 (쿠키가 있으면 다 만들어지고)
function createPop({ wid = 400, bg = '#ddd', lastTime = 24 }) {
	const aside = document.createElement('aside');
	aside.style.width = wid + 'px';
	aside.style.backgroundColor = bg;

	const tags = `
  <div class="con"></div>
  <div class="controls">
    <p>
      <input type="checkbox" id="ck">
      <label for="ck">${lastTime}시간동안 보지 않기</label>
    </p>
    <button>CLOSE</button>
  </div>
  `;
	aside.innerHTML = tags;
	document.body.append(aside); //aside유지하면서 body안쪽에 들어감

	//닫기버튼은 팝업이 있을때만 작동을 하므로
	const close = document.querySelector('aside button');
	const ck = document.querySelector('aside #ck');

	//팝업 제거할때 쿠키가 없는 상태에서 닫히는거니까 새로고침하면 다시 쿠키가 만들어질거고
	close.addEventListener('click', () => {
		if (ck.checked) setCookie('today', 'done', lastTime);
		document.querySelector('aside').remove();
	});
}
