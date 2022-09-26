import { replaceInFile } from "replace-in-file";

export async function replaceTextWithText(searchText: string, replaceText: string, files: string[]) {
    var fromStr = "/".concat(searchText, "/g")
    const options = {
        files: files,
        from: /${searchText}/g,
        to: replaceText,
        countMatches: true
    };
    const results = await replaceInFile(options)
    console.log('Replacement results:', results);
    return {
        result: results.filter(r => r.hasChanged).map(r=> r.file),
        replaceCount: results.filter(r => r.hasChanged).map(r=> r.numReplacements)
    }
}