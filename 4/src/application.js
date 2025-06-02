// BEGIN
const app = (companies) => {

    let container = document.querySelector('.container.m-3');
    if (!container) {
        container = document.createElement('div');
        container.className = 'container m-3';
        document.body.appendChild(container);
    }

    let activeCompanyId = null;

    companies.forEach((company) => {
        const button = document.createElement('button');
        button.className = 'btn btn-primary';
        button.textContent = company.name;

        button.addEventListener('click', () => {
            if (activeCompanyId === company.id) {
                const existingDesc = container.querySelector('div');
                if (existingDesc) {
                    container.removeChild(existingDesc);
                }
                activeCompanyId = null;
                return;
            }

            const existingDesc = container.querySelector('div');
            if (existingDesc) {
                container.removeChild(existingDesc);
            }

            if (company.description) {
                const descriptionDiv = document.createElement('div');
                descriptionDiv.textContent = company.description;
                container.appendChild(descriptionDiv);
                activeCompanyId = company.id;
            }
        });
        container.appendChild(button);
    });
};

export default app;
// END