export default class Animator {
	constructor(startingPoint, endPoint, endTime) {
		this.startingPoint = startingPoint;
		this.endPoint = endPoint;
		this.endTime = endTime;
	}
	square(time) {
		let delta_x = this.endPoint - this.startingPoint;
		let delta_t = this.endTime;
		return -((delta_x*time*time)/delta_t) + 2*(delta_x*time)/delta_t + this.startingPoint;
	}
}
