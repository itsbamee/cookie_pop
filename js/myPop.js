class MyPop {
	constructor(opt) {
		this.lastTime = 2;
		this.wid = opt.wid;
		this.bg = opt.bg;
		this.enableCookie = opt.enableCookie;

		// this.setCookie('today', 'done', 0);
		this.initCookie();
	}
	initCookie() {
		if (document.cookie.indexOf('today=done') < 0) {
			this.createPop({ wid: this.wid, bg: this.bg, lastTime: this.lastTime });
		}
	}
	setCookie(name, value, expires) {
		let now = new Date();
		let duedate = now.getTime() + 1000 * 60 * 60 * expires;
		now.setTime(duedate);
		document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`;
	}
	createPop({ wid = 400, bg = '#ddd', lastTime = 24 }) {
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
        ${this.enableCookie ? checkTags : ''}      
        <button>CLOSE</button>
      </div>
    `;
		aside.innerHTML = tags;
		document.body.append(aside);

		const close = document.querySelector('aside button');

		//팝업 닫기
		close.addEventListener('click', () => {
			if (this.enableCookie) {
				const ck = document.querySelector('aside #ck');
				if (ck.checked) setCookie('today', 'done', this.lastTime);
			}
			document.querySelector('aside').remove();
		});
	}
}
