import domready from 'domready'
import {TweenMax, Power3} from 'gsap'
import Drawer from './components/drawer'
import Gallery from './components/gallery'

class App {
	constructor() {
		console.log('[Snooks Angel Books App]');

		this.initAnimations();
		this.initComponents();
	}
  	initAnimations() {
    	// Default easing for all components
    	TweenMax.defaultEase = Power3.easeOut;
  	}
  	initComponents() {

  		const body = document.getElementsByTagName('body')[0];

		if(body.id === 'home') {
			Gallery.init();
		}

		// Drawers
		const drawers_arr = [].slice.call(document.querySelectorAll('.drawer'));
		drawers_arr.forEach((el) => {
			new Drawer({
		    	el: el,
		    	options: {
		      		closeSelector: '.drawer__close, .drawer__backdrop, a[href="#close-drawer"]'
		    	}
		  	});
		});
	}
}

domready(() => {
	new App();
});