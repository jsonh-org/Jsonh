"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input = document.getElementById('input');
const output = document.getElementById('output');
const button = document.getElementById('convert');
button.addEventListener('click', () => {
    try {
        const lines = input.value.split('\n');
        const json = {};
        lines.forEach(line => {
            if (line.includes('=')) {
                const [key, value] = line.split('=').map(s => s.trim());
                json[key] = value;
            }
        });
        output.value = JSON.stringify(json, null, 2);
    }
    catch (e) {
        output.value = 'Error: ' + e.message;
    }
});
//# sourceMappingURL=main.js.map