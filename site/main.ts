const input = document.getElementById('input') as HTMLTextAreaElement;
const output = document.getElementById('output') as HTMLTextAreaElement;
const button = document.getElementById('convert') as HTMLButtonElement;

button.addEventListener('click', () => {
  try {
    const lines = input.value.split('\n');
    const json: Record<string, string> = {};
    lines.forEach(line => {
      if (line.includes('=')) {
        const [key, value] = line.split('=').map(s => s.trim());
        json[key!] = value!;
      }
    });
    output.value = JSON.stringify(json, null, 2);
  } catch (e: any) {
    output.value = 'Error: ' + e.message;
  }
});
