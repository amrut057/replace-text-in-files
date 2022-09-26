import { promises as fs } from "fs";
import { replaceTextWithText } from "../src/replace";

describe("basic functionality", () => {
    beforeEach(async () => {
        await fs.writeFile("test.txt", "This is SEARCHSTRING", "utf8");
        await fs.writeFile("test2.txt", "This is second SEARCHSTRING", "utf8");
    })

    afterEach(async () => {
        await fs.unlink("test.txt");
        await fs.unlink("test2.txt");
    })

    test("replaces strings in all file specified with glob", async () => {
        await replaceTextWithText("SEARCHSTRING", "the replaced string", ["*.txt"]);

        const content = await fs.readFile('test.txt', 'utf8');
        expect(content).toBe("This is replaced string")

        const content2 = await fs.readFile('test2.txt', 'utf8');
        expect(content2).toBe("This is second replaced string")
    });

    test("returns list of changed files", async () => {
        const result = await replaceTextWithText("SEARCHSTRING", "the replaced string", ["*.txt"]);

        expect(result).toEqual([
            "test.txt", "test2.txt"
        ]);
    });

    test("returns only list of changed files", async () => {
        const result = await replaceTextWithText("SEARCHSTRING", "the replaced string", ["test.txt"]);

        expect(result).toEqual([
            "test.txt"
        ]);
    });

    test("does not throw when no match", async () => {
        const result = await replaceTextWithText("SEARCHSTRING", "the replaced string", [""]);

        expect(result).toEqual([]);
    });
});