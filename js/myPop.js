class MyPop {
	constructor(opt) {
		const defOpt = { wid: 400, bg: 'gray', enableCookie: true, lastTime: 24 };
		const resultOpt = { ...defOpt, ...opt };
		this.lastTime = resultOpt.lastTime;
		this.wid = resultOpt.wid;
		this.bg = resultOpt.bg;
		this.enableCookie = resultOpt.enableCookie;

		//setCookie('today', 'done', 0);
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

	createPop() {
		const aside = document.createElement('aside');
		aside.style.width = this.wid + 'px';
		aside.style.backgroundColor = this.bg;

		const checkTags = `
      <p>
        <input type="checkbox" id="ck">
        <label for="ck">${this.lastTime}시간동안 보지 않기</label>
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
				if (ck.checked) this.setCookie('today', 'done', this.lastTime);
			}
			document.querySelector('aside').remove();
		});
	}
}
