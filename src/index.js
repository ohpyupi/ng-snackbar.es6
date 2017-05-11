'use strict';
import './style.css';
import Animator from './utils/animator';
export default class ErrorService {
	constructor($state) {
		'ngInject';
		this.snackbar = null;
		this.content = null;
		this.message = null;
		this.closeBtn = null;
		this.init();
		this.handleEventListeners();
		this.$state = $state;
	}
	flash(message='', ...args) {
		this.message.innerHTML = message;
		let body = document.getElementsByTagName('body')[0];
		let bottomAnimator = new Animator(-24, 12, .75);
		let opacityAnimator = new Animator(0, 1, .75);
		body.appendChild(this.snackbar);
		let degree = 0;
		let timer = setInterval(()=>{
			degree++;
			let x = degree/10;
			if (x > .75) return clearInterval(timer);
			this.snackbar.style.opacity = opacityAnimator.square(x);
			this.snackbar.style.bottom = `${bottomAnimator.square(x)}px`;
		}, 30);
		if (args[0]) this.$state.go(args[0], args[1] ? args[1]: {});
	}
	remove() {
		let body = document.getElementsByTagName('body')[0];
		let bottomAnimator = new Animator(12, -24, .75);
		let opacityAnimator = new Animator(1, 0, .75);
		let degree = 0;
		let timer = setInterval(()=>{
			degree++;
			let x = degree/10;
			if (x > .75) { 
				clearInterval(timer);
				return body.removeChild(this.snackbar);
			}
			this.snackbar.style.opacity = opacityAnimator.square(x);
			this.snackbar.style.bottom = `${bottomAnimator.square(x)}px`;
		}, 30);
	}
	init() {
		this.snackbar = document.createElement('div');
		this.content = document.createElement('div');
		this.message = document.createElement('p');
		this.closeBtn = document.createElement('span');
		this.closeBtn.innerHTML = 'DISMISS';
		this.content.appendChild(this.message);
		this.content.appendChild(this.closeBtn);
		this.snackbar.appendChild(this.content);
		this.snackbar.className += 'snackbar';
		this.content.className += 'snackbar-con';
		this.message.className += 'snackbar-message';
		this.closeBtn.className += 'snackbar-close-btn';
	}
	handleEventListeners() {
		this.closeBtn.addEventListener('click', e=>{
			this.remove();
		});
	}
}
