// BEGIN
export default () => {
    const initializeCalculator = () => {

        const calculatorForm = document.forms.calculator || document.querySelector('.form-inline');
        const numberInput = calculatorForm.elements.number || calculatorForm.querySelector('input[name="number"]');
        const resultDisplay = document.getElementById('result');
        const resetBtn = calculatorForm.querySelector('button[type="button"]');


        let currentSum = 0;


        const updateDisplay = () => {
            resultDisplay.textContent = currentSum;
        };

        const handleAddition = (event) => {
            event.preventDefault();

            const numericValue = Number(numberInput.value);
            if (Number.isFinite(numericValue)) {
                currentSum += numericValue;
                updateDisplay();
            }

            calculatorForm.reset();
            setTimeout(() => numberInput.focus(), 10);
        };

        const handleReset = () => {
            currentSum = 0;
            updateDisplay();
            calculatorForm.reset();
            numberInput.focus();
        };

        const setupEventListeners = () => {
            calculatorForm.addEventListener('submit', handleAddition);
            resetBtn.addEventListener('click', handleReset);
             numberInput.focus();
        };

        updateDisplay();
        setupEventListeners();


    };

    return initializeCalculator();
}
// END