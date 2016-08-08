class Lifter {

	constructor(options) {

		let settings = {
			ground : 'body',
			triggers : '[target=_popup], [target=popup], [rel=popup], .lifter-up',
			preload : true
		}

		Object.assign(settings, options);

		this.ground = document.querySelector(settings.ground);
		var ground = this.ground;

		this.triggers = document.querySelectorAll(settings.triggers);

		this.ground.classList.add('lifter-ground');

		this.triggers.forEach(function(trigger) {
			trigger.classList.add('lifter-trigger');
		}, this);

		if (settings.preload !== true) {
			let lifterCommon = document.createElement('aside');

			lifterCommon.id = 'lifter-common';
			lifterCommon.classList.add('lifter');

			this.ground.appendChild(lifterCommon);
		}

		if (settings.preload !== false) {
			if (settings.preload === true) {
				this.preloads = this.triggers;
			} else {
				this.preloads = document.querySelectorAll(settings.preload);
			}

			this.preloads.forEach(function(trigger) {
				let lifter = document.createElement('aside'),
					frame = document.createElement('iframe');

				lifter.id = 'lifter-' + String(performance.now()).replace('.', '_');
				lifter.classList.add('lifter');

				frame.classList.add('lifter-content');
				frame.src = trigger.href;

				lifter.appendChild(frame);
				ground.appendChild(lifter);

				trigger.setAttribute('data-lifter', '#' + lifter.id);
			}, this);
		}

		this.ground.addEventListener('click', function(event) {
			if (event.target.classList.contains('lifter-trigger')) {
				event.preventDefault();
				let trigger = event.target,
					target = trigger.getAttribute('data-lifter');

				if (target === null) {
					target = '#lifter-common';
				}

				let lifter = document.querySelector(target);

				// size of popup
				if (trigger.classList.contains('lifter-sm')) {
					lifter.classList.add('lifter-sm');
				} else if (trigger.classList.contains('lifter-lg')) {
					lifter.classList.add('lifter-lg');
				}

				if (trigger.getAttribute('data-width') !== null) {
					lifter.style.width = trigger.getAttribute('data-width');
				}
				if (trigger.getAttribute('data-height') !== null) {
					lifter.style.height = trigger.getAttribute('data-height');
				}

				if (trigger.getAttribute('data-size')) {
					let size = trigger.getAttribute('data-size').split('x');
					lifter.style.width = size[0] + 'px';
					lifter.style.height = size[1] + 'px';
				}

				// content of popup
				if (trigger.getAttribute('data-content') !== null) {
					lifter.innerHtml = document.querySelector(trigger.getAttribute('data-content')).innerHtml;
				} else if (trigger.getAttribute('data-lifter') === null) {
					let frame = document.createElement('iframe');

					frame.classList.add('lifter-content');
					frame.src = trigger.href;

					lifter.appendChild(frame);
				}

				ground.classList.add('lifting');
				lifter.classList.add('lifted');
			}
		});


		this.ground.addEventListener('click', function(event) {
			if (event.target.classList.contains('lifting')) {
				let lifter = ground.querySelector('.lifted');

				if (lifter.id === 'lifter-common') {
					lifter.innerHtml = '';
				}

				lifter.classList.remove('lifted');
				ground.classList.remove('lifting');

				setTimeout(function() {
					lifter.classList.remove('lifter-sm');
					lifter.classList.remove('lifter-lg');
					lifter.style.width = '';
					lifter.style.height = '';
				}, 350);
			}
		});
	}
}
