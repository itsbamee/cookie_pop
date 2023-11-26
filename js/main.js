const lastTime = 2;
const wid = 600;
const bg = 'aqua';
let enableCookie = true;

//setCookie('today', 'done', 0);
initCookie();

function initCookie() {
	if (document.cookie.indexOf('today=done') < 0) {
		createPop({ wid: wid, bg: bg, lastTime: lastTime });
	}
}

//쿠키생성 함수
function setCookie(name, value, expires) {
	let now = new Date();
	let duedate = now.getTime() + 1000 * 60 * 60 * expires;
	now.setTime(duedate);
	document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`;
}

//팝업생성 함수
function createPop({ wid = 400, bg = '#ddd', lastTime = 24 }) {
	const aside = document.createElement('aside');
	aside.style.width = wid + 'px';
	aside.style.backgroundColor = bg;

	const checkTags = `
    <p>
      <input type="checkbox" id="ck">
      <label for="ck">${lastTime}시간동안 보지 않기</label>
    </p>
  `;

	const tags = `
    <div class="con"></div>
    <div class="controls">
      ${enableCookie ? checkTags : ''}      
      <button>CLOSE</button>
    </div>
  `;
	aside.innerHTML = tags;
	document.body.append(aside);

	const close = document.querySelector('aside button');

	//팝업 닫기
	close.addEventListener('click', () => {
		if (enableCookie) {
			const ck = document.querySelector('aside #ck');
			if (ck.checked) setCookie('today', 'done', lastTime);
		}
		document.querySelector('aside').remove();
	});
}
