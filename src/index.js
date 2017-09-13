'use strict';
import './styles.css';
import Animator from 'dokebi/services/accelerator';

export default (params={})=>{
	/*
	** @param {string} params.directionFrom "top" or "bottom" (default: bottom)
	** @param {number} params.xi (default: -24)
	** @param {number} params.xf (default: 12)
	** @param {string} params.closeLabel (default: "DISMISS")
	** @param {number} params.duration (default: .75)
	** @param {string} params.router (default: 'ui-router', availables: 'ui-router' and 'react-router')
	**/
	return class ErrorService {
		constructor(routerMachine) {
			'ngInject';
			this.snackbar = null;
			this.content = null;
			this.message = null;
			this.closeBtn = null;
			this.routerMachine = routerMachine;
			this.directionFrom = params.directionFrom ? params.directionFrom : `bottom`;
			this.xi = params.xi !== undefined ? params.xi : -24;
			this.xf = params.xf !== undefined ? params.xf : 12;
			this.closeLabel = params.closeLabel ? params.closeLabel : `DISMISS`;
			this.duration = params.duration ? params.duration : .75;
			this.router = params.router ? params.router : 'ui-router';
			this.init();
		}
		flash(message='', ...args) {
			this.message.innerHTML = message;
			let body = document.getElementsByTagName('body')[0];
			let positionAnimator = new Animator(this.xi, this.xf, this.duration);
			let opacityAnimator = new Animator(0, 1, this.duration);
			body.appendChild(this.snackbar);
			let degree = 0;
			let timer = setInterval(()=>{
				degree++;
				let x = degree/(100*this.duration);
				if (x > this.duration) return clearInterval(timer);
				this.snackbar.style.opacity = opacityAnimator.square(x);
				this.snackbar.style[this.directionFrom] = `${positionAnimator.square(x)}px`;
			}, 1);
			if (args[0]) this.redirect(args[0], args[1] ? args[1]: {});
		}
		redirect(...args) {
			/*
			** @param {string} args[0] (required) args[0] will be a state's name in ui-router
			** while a path url in react-router.
			** @param {object} args[1] (optional) args[1] works only if using ui-router.
			*/
			if (this.router === 'ui-router') {
				this.routerMachine.go(args[0], args[1]);
			} else if (this.router === 'react-router') {
				this.routerMachine.push(args[0]);
			} else {
				throw Error(`Unavailable value for "params.router".`);
			}
		}
		remove() {
			let body = document.getElementsByTagName('body')[0];
			let positionAnimator = new Animator(this.xf, this.xi, this.duration);
			let opacityAnimator = new Animator(1, 0, this.duration);
			let degree = 0;
			let timer = setInterval(()=>{
				degree++;
				let x = degree/(100*this.duration);
				if (x > this.duration) { 
					clearInterval(timer);
					return body.removeChild(this.snackbar);
				}
				this.snackbar.style.opacity = opacityAnimator.square(x);
				this.snackbar.style[this.directionFrom] = `${positionAnimator.square(x)}px`;
			}, 1);
		}
		init() {
			this.snackbar = document.createElement('div');
			this.content = document.createElement('div');
			this.message = document.createElement('p');
			this.closeBtn = document.createElement('span');
			this.closeBtn.innerHTML = this.closeLabel;
			this.content.appendChild(this.message);
			this.content.appendChild(this.closeBtn);
			this.snackbar.appendChild(this.content);
			this.snackbar.className += 'snackbar';
			this.content.className += 'snackbar-con';
			this.message.className += 'snackbar-message';
			this.closeBtn.className += 'snackbar-close-btn';
			this.handleEventListeners();
		}
		handleEventListeners() {
			this.closeBtn.addEventListener('click', e=>{
				this.remove();
			});
		}
	}
}

