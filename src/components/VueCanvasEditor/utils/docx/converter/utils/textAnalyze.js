export function parseText(input) {
    if (!/^\n+$/.test(input) && input.startsWith("\n")) {
        input = input.slice(1);
    }
    return input.split(/(\n)/);
}