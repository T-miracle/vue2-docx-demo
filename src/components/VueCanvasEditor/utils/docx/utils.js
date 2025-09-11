import { convertInchesToTwip } from 'docx';

export function saveAs(blob, name) {
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(a.href);
}

export function convertPxToSize(pxSize) {
    const inches = trunk((pxSize / 96), 2);
    return trunk(convertInchesToTwip(inches), 2);
}

export function trunk(valor, casas) {
    if (!valor) {
        return valor;
    }
    let valorString;
    if (valor.toString().indexOf('.') !== -1) {
        let decimais = valor.toString().substring(valor.toString().indexOf('.') + 1);
        casas = casas > decimais.length ? decimais.length : casas;
        decimais = decimais.substring(0, casas);
        valorString = valor.toString().substring(0, valor.toString().indexOf('.')) + '.' + decimais;
    } else {
        valorString = valor.toString();
    }
    return parseFloat(valorString);
}
