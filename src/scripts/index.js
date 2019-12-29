import domready from 'domready';
import {TweenMax, Power3} from 'gsap';
import Drawer from './components/drawer';
import Gallery from './components/gallery';
import Smoothscroll from './components/smoothscroll';

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

		if(body.className === 'home') {
			Gallery().init();
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

		// Smoothscroll
	    const smoothscroll_arr = [].slice.call(document.querySelectorAll('.smoothscroll'));
	    smoothscroll_arr.forEach((el) => {
	    	new Smoothscroll({
	        	el: el,
	        		options: {
	          			offsetTop: 32
	        		}
	      	});
		});
		  
		const storyBookSection = document.querySelectorAll('.storybook__section');
		const storyBookCurrent = 7;
	
		storyBookSection.forEach((el) => {
			const storyBookSectionIndex = Number(el.dataset.storybookIndex);

			console.log('storybook index', typeof storyBookSectionIndex, storyBookSectionIndex);

			if(storyBookSectionIndex === storyBookCurrent) {
				el.classList.add('stepActive');
			} else {
				el.style.display = 'none';
			}
		});
		
	
		
	}
}

domready(() => {
	new App();
});
