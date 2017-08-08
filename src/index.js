'use strict';
import './styles.css';
import Animator from 'dokebi/services/accelerator';

export default (params={})=>{
	return class ErrorService {
		constructor($state) {
			'ngInject';
			/*
			** @param {string} params.directionFrom "top" or "bottom" (default: bottom)
			** @param {number} params.xi (default: -24)
			** @param {number} params.xf (default: 12)
			** @param {string} params.closeLabel (default: "DISMISS")
			** @param {number} params.duration (default: .75)
			**/
			this.snackbar = null;
			this.content = null;
			this.message = null;
			this.closeBtn = null;
			this.$state = $state;
			this.directionFrom = params.directionFrom ? params.directionFrom : `bottom`;
			this.xi = params.xi !== undefined ? params.xi : -24;
			this.xf = params.xf !== undefined ? params.xf : 12;
			this.closeLabel = params.closeLabel ? params.closeLabel : `DISMISS`;
			this.duration = params.duration ? params.duration : .75;
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
			if (args[0]) this.$state.go(args[0], args[1] ? args[1]: {});
		}
		redirect(stateName, stateParams={}) {
			/*
			** @param {string} stateName (required)
			** @param {object} stateParams (optional)
			*/
			this.$state.go(stateName, stateParams);
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

