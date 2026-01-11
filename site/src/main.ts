import { JsonhReader, JsonhReaderOptions } from "jsonh-ts";

const input = document.getElementById('input') as HTMLTextAreaElement;
const output = document.getElementById('output') as HTMLTextAreaElement;
const prettyPrint = document.getElementById('pretty-print') as HTMLInputElement;
const jsonhVersion = document.getElementById('jsonh-version') as HTMLSelectElement;

function convert(): void {
    if (input.value.trim().length === 0) {
        output.value = "";
        return;
    }

    let elementResult = JsonhReader.parseElementFromString(input.value, new JsonhReaderOptions({
        parseSingleElement: true,
        version: parseInt(jsonhVersion.value),
    }));
    if (elementResult.isError) {
        output.value = `Error: ${elementResult.error.message}`;
        return;
    }

    let indent: string = prettyPrint.checked ? "    " : "";

    output.value = JSON.stringify(elementResult.value, null, indent);
}

input.addEventListener('input', convert);
prettyPrint.addEventListener('input', convert);
jsonhVersion.addEventListener('input', convert);
convert();