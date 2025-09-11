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
        const reader = new FileReader()
        reader.onload = event => {
            const buffer = event?.target?.result
            if (buffer instanceof ArrayBuffer) {
                command.executeImportDocx({
                    arrayBuffer: buffer
                })
            }
            event.target.value = ''
        }
        reader.readAsArrayBuffer(file)
    });

    input.click();
    document.body.removeChild(input);
}