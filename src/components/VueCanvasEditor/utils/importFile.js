export function importFile({ instance }) {
    const { command } = instance;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.docx';
    input.style.display = 'none';
    document.body.appendChild(input);

    input.addEventListener('change', (event) => {
        const file = event.target?.files[0];
        if (!file) {
            return;
        }
        command.executeImportDocx(file);
    });

    input.click();
    document.body.removeChild(input);
}