class Lifter {

	constructor(options) {

		let _L = this;

		let settings = {
			triggers : '[target=_popup]',
			preload : true
		}

		Object.assign(settings, options);

		_L.base = document.querySelector('body');

		_L.triggers = document.querySelectorAll(settings.triggers);

		_L.base.classList.add('lifter-base');

		_L.triggers.forEach(function(trigger) {
			trigger.classList.add('lifter-trigger');
		}, _L);

		if (settings.preload !== true) {
			let lifterCommon = document.createElement('aside');

			lifterCommon.id = 'lifter-common';
			lifterCommon.classList.add('lifter');

			_L.base.appendChild(lifterCommon);
		}

		if (settings.preload !== false) {
			if (settings.preload === true) {
				_L.preloads = _L.triggers;
			} else {
				_L.preloads = document.querySelectorAll(settings.preload);
			}

			_L.preloads.forEach(function(trigger) {
				if (trigger.getAttribute('data-content') === null) {
					let lifter = document.createElement('aside'),
						frame = document.createElement('iframe');

					lifter.id = 'lifter-' + String(performance.now()).replace('.', '_');
					lifter.classList.add('lifter');

					frame.classList.add('lifter-content');
					frame.src = trigger.href;

					lifter.appendChild(frame);
					_L.base.appendChild(lifter);

					trigger.setAttribute('data-lifter', '#' + lifter.id);
				}
			});
		}

		_L.base.addEventListener('click', function(event) {
			if (event.target.classList.contains('lifter-trigger')) {
				event.preventDefault();

				let trigger = event.target,
					target = trigger.getAttribute('data-lifter');

				if (target === null) {
					target = '#lifter-common';
				}

				let config = {
					target: target,
					classes: [],
					styles: {}
				};


				// size of popup
				if (trigger.classList.contains('lifter-sm')) {
					config.classes.push('lifter-sm');
				} else if (trigger.classList.contains('lifter-lg')) {
					config.classes.push('lifter-lg');
				}

				if (trigger.getAttribute('data-width') !== null) {
					config.styles.width = trigger.getAttribute('data-width');
				}
				if (trigger.getAttribute('data-height') !== null) {
					config.styles.height = trigger.getAttribute('data-height');
				}

				if (trigger.getAttribute('data-size')) {
					let size = trigger.getAttribute('data-size').split('|');
					config.styles.width = size[0];
					config.styles.height = size[1];
				}

				// content of popup
				if (trigger.getAttribute('data-content') !== null) {
					config.html = document.querySelector(trigger.getAttribute('data-content')).innerHtml;
				} else if (trigger.getAttribute('data-lifter') === null) {


					config.src = trigger.href;
				}

				_L.lift(config);
			}
		});


		_L.base.addEventListener('click', function(event) {
			if (event.target.classList.contains('lifting')) {
				_L.lower();
			}
		});
	}

	lift(options) {
		var _L = this;

		let settings = {
			target: '#lifter-common',
			html: null,
			src: null,
			classes: [],
			styles: {}
		}

		Object.assign(settings, options);

		let lifter = document.querySelector(settings.target);

		// classes
		settings.classes.forEach(function(lifterClass) {
			lifter.classList.add(lifterClass);
		});
		lifter.setAttribute('data-added-classes', settings.classes.join(' '));

		// styles
		Object.keys(settings.styles).forEach(function(key) {
			let words = key.split('-'),
				style = '';

			if (words.length > 1) {
				style = words[0].toLowerCase() + words.slice(1).map(function(word) {
					return (
						word.charAt(0).toUpperCase() + word.slice(1)
					);
				}).join();
			} else {
				style = key;
			}

			lifter.style[style] = settings.styles[key];
		});

		if (settings.html !== null) {
			lifter.innerHtml = settings.html;
		} else if (settings.src !== null) {
			let frame = document.createElement('iframe');

			frame.classList.add('lifter-content');
			frame.src = trigger.href;

			lifter.appendChild(frame);
		} else if (settings.target === '#lifter-common') {
			return false; // no content provided to lift
		}

		_L.base.classList.add('lifting');
		lifter.classList.add('lifted');

		return lifter;
	}

	lower() {
		var _L = this;

		let lifter = _L.base.querySelector('.lifted');

		if (lifter.id === 'lifter-common') {
			lifter.innerHtml = '';
		}

		lifter.classList.remove('lifted');
		_L.base.classList.remove('lifting');

		setTimeout(function() {
			if (lifter.getAttribute('data-added-classes').trim() !== '') {
				lifter.getAttribute('data-added-classes').split(' ').forEach(function(lifterClass) {
					lifter.classList.remove(lifterClass);
				});
			}
			lifter.setAttribute('style', '')

		}, 350);
	}
}
