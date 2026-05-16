import { JsonhReader, JsonhReaderOptions } from "jsonh-ts";
import { stringToBase64URL, stringFromBase64URL } from "./base64url";

const input = document.getElementById('input') as HTMLTextAreaElement;
const output = document.getElementById('output') as HTMLTextAreaElement;
const prettyPrint = document.getElementById('pretty-print') as HTMLInputElement;
const jsonhVersion = document.getElementById('jsonh-version') as HTMLSelectElement;
const shareButton = document.getElementById('share-button') as HTMLButtonElement;

function loadPrefill(): void {
    const params = new URLSearchParams(window.location.search);
    const sharedInput: string | null = params.get("jsonh");

    if (sharedInput !== null) {
        input.value = stringFromBase64URL(sharedInput);
    }
}

loadPrefill();

async function copyPrefillToClipboard(): Promise<void> {
    const url = new URL(window.location.href);
    url.searchParams.set("jsonh", stringToBase64URL(input.value));

    window.history.replaceState({}, "", url);

    try {
        await navigator.clipboard.writeText(url.toString());

        const temporaryShareButtonText: string = "Copied!";

        if (shareButton.textContent !== temporaryShareButtonText) {
            const originalShareButtonText: string = shareButton.textContent;

            shareButton.textContent = temporaryShareButtonText;
            setTimeout(() => shareButton.textContent = originalShareButtonText, 1_000);
        }
    }
    catch { }
}

shareButton.addEventListener('click', copyPrefillToClipboard);

function convert(): void {
    if (input.value.trim().length === 0) {
        output.value = "";
        return;
    }

    const indent: string | null = prettyPrint.checked ? "    " : null;

    const reader = JsonhReader.fromString(input.value, new JsonhReaderOptions({
        parseSingleElement: true,
        version: parseInt(jsonhVersion.value),
    }));
    const result = reader.parseJson(false, indent);
    if (result.isError) {
        output.value = `Error: ${result.error.message}`;
        return;
    }

    output.value = result.value;
}

input.addEventListener('input', convert);
prettyPrint.addEventListener('input', convert);
jsonhVersion.addEventListener('input', convert);
convert();