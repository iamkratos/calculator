document.addEventListener('DOMContentLoaded', function() {
	// Sets up listener for all buttons
	let allButtons = [
		...document.querySelectorAll('.calculator-key-wrap button')
	];
	allButtons.map(button => {
		button.addEventListener('click', calculate);
	});

	function calculate() {
		// 1. Check button action, if no action, it must be a number button
		// List all variables
		let calculator = document.querySelector('.calculator');
		let button = this;
		let action = button.dataset.action;
		let currentValue = document.querySelector('.current-value');
		let clickedNumber = button.textContent;
		const previousButtonType = calculator.dataset.previousButtonType;

		if (!action) {
			removeAllHighlightedOperators();
			// 2A. first check if the number is a solo zero, if so, replace text value with the new value
			if (
				currentValue.textContent === '0' ||
				previousButtonType === 'operator'
			) {
				currentValue.textContent = clickedNumber;
			} else {
				// 2B. Append numbers to current value
				currentValue.textContent = currentValue.textContent + clickedNumber;
			}

			calculator.dataset.previousButtonType = 'number';
		} else {
			// 3. Figure out what action it is

			if (
				action === 'plus' ||
				action === 'minus' ||
				action === 'multiply' ||
				action === 'divide'
			) {
				const firstValue = calculator.dataset.firstValue;
				const operator = calculator.dataset.operator;
				const secondValue = currentValue.textContent;

				// Note: It's sufficient to check for firstValue and operator because secondValue always exists
				if (
					firstValue &&
					operator &&
					previousButtonType !== 'operator' &&
					previousButtonType !== 'calculate'
				) {
					const calcValue = calculateAnswer(firstValue, operator, secondValue);
					currentValue.textContent = calcValue;
					// Update calculated value as firstValue
					calculator.dataset.firstValue = calcValue;
				} else {
					// If there are no calculations, set currentValue as the firstValue
					calculator.dataset.firstValue = currentValue.textContent;
				}

				console.log('operator key!');
				calculator.dataset.previousButtonType = 'operator';
				calculator.dataset.firstValue = currentValue.textContent;
				calculator.dataset.operator = action;

				button.classList.add('is-pressed');
			}

			// Decimal logic
			if (action === 'decimal') {
				if (
					calculator.dataset.previousButtonType === 'operator' ||
					previousButtonType === 'calculate'
				) {
					currentValue.textContent = '0.';
				} else if (!currentValue.textContent.includes('.')) {
					currentValue.textContent = currentValue.textContent + '.';
				}

				calculator.dataset.previousButtonType = 'decimal';
			}
			if (action === 'clear') {
				if (button.textContent === 'AC') {
					calculator.dataset.firstValue = '';
					calculator.dataset.modValue = '';
					calculator.dataset.operator = '';
					calculator.dataset.previousKeyType = '';
					removeAllHighlightedOperators();
				} else {
					button.textContent = 'AC';
				}

				currentValue.textContent = 0;
				calculator.dataset.previousButtonType = 'clear';
			}
			if (action !== 'clear') {
				const clearButton = calculator.querySelector('[data-action=clear]');
				clearButton.textContent = 'CE';
			}
			if (action === 'calculate') {
				let firstValue = calculator.dataset.firstValue;
				const operator = calculator.dataset.operator;
				let secondValue = currentValue.textContent;

				if (firstValue) {
					if (previousButtonType === 'calculate') {
						firstValue = currentValue.textContent;
						secondValue = calculator.dataset.modValue;
					}

					currentValue.textContent = calculateAnswer(
						firstValue,
						operator,
						secondValue
					);
				}

				// Set modValue attribute
				calculator.dataset.modValue = secondValue;
				calculator.dataset.previousButtonType = 'calculate';
			}

			function calculateAnswer(n1, operator, n2) {
				// Perform calculation and return calculated value
				let result = '';
				n1 = parseFloat(n1);
				n2 = parseFloat(n2);
				if (operator === 'plus') {
					result = n1 + n2;
				} else if (operator === 'minus') {
					result = n1 - n2;
				} else if (operator === 'multiply') {
					result = n1 * n2;
				} else if (operator === 'divide') {
					result = n1 / n2;
				}

				return result;
			}
		}
	}

	function removeAllHighlightedOperators() {
		let highlightedButtons = [
			...document.querySelectorAll('.operator-wrap button.is-pressed')
		];

		console.log(highlightedButtons.length);

		highlightedButtons.map(button => {
			button.classList.remove('is-pressed');
		});
	}
});
