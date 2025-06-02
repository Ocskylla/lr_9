// BEGIN

const displayLaptops = (filteredLaptops) => {
    const resultDiv = document.querySelector('.result');
    resultDiv.innerHTML = ''; // Очищаем контейнер

    if (filteredLaptops.length === 0) {
        return;
    }

    const ul = document.createElement('ul');
    filteredLaptops.forEach((laptop) => {
        const li = document.createElement('li');
        li.textContent = laptop.model;
        ul.appendChild(li);
    });
    resultDiv.appendChild(ul);
};


const getFilters = (form) => {
    const formData = new FormData(form);
    return {
        processor_eq: formData.get('processor_eq') || '',
        memory_eq: formData.get('memory_eq') || '',
        frequency_gte: formData.get('frequency_gte') || '',
        frequency_lte: formData.get('frequency_lte') || '',
    };
};


const isFilterEmpty = (filters) => {
    return Object.values(filters).every((value) => value === '');
};


const filterLaptops = (laptops, filters) => {
    return laptops.filter((laptop) => {
        return Object.entries(filters).every(([key, value]) => {
            if (value === '') return true;

            if (key === 'processor_eq') {
                return laptop.processor.toLowerCase() === value.toLowerCase();
            }
            if (key === 'memory_eq') {
                return laptop.memory === parseInt(value, 10);
            }
            if (key === 'frequency_gte') {
                return laptop.frequency >= parseFloat(value);
            }
            if (key === 'frequency_lte') {
                return laptop.frequency <= parseFloat(value);
            }
            return true;
        });
    });
};


const initializeFilter = (laptops) => {
    const form = document.querySelector('form');


    const updateFilteredList = () => {
        const filters = getFilters(form);
        if (isFilterEmpty(filters)) {
            displayLaptops(laptops);
        } else {
            const filtered = filterLaptops(laptops, filters);
            displayLaptops(filtered);
        }
    };


    displayLaptops(laptops);


    const numberInputs = form.querySelectorAll('input[type="number"]');
    numberInputs.forEach((input) => {
        input.addEventListener('input', updateFilteredList);
    });

    const selectInputs = form.querySelectorAll('select');
    selectInputs.forEach((select) => {
        select.addEventListener('change', updateFilteredList);
    });
};

export default initializeFilter;
// END