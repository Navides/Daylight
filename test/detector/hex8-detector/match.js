import { Hex8Detector } from "../../../src/detector/hex8-detector.js";

// hex8
// 8桁の16進数表現(例: #00000000 )に関するテスト

describe("Hex8Detector.match - ", () => {
    // 1:
    it("1: 数字8桁", () => {
        // テスト対象のインスタンスを作成
        const detector = new Hex8Detector();

        // 結果を検証
        for (const expression of [
            "#00000000",
            "#12345678",
            "#98765432"
        ]) {
            const result = detector.match(expression);
            expect(result).toBe(true);
        }
    });

    // 2:
    it("2: アルファベット大文字8桁", () => {
        // テスト対象のインスタンスを作成
        const detector = new Hex8Detector();

        // 結果を検証
        for (const expression of [
            "#AAAAAAAA",
            "#ABCDEFAB",
            "#FEDCBAFE"
        ]) {
            const result = detector.match(expression);
            expect(result).toBe(true);
        }
    });

    // 3:
    it("3: アルファベット小文字8桁", () => {
        // テスト対象のインスタンスを作成
        const detector = new Hex8Detector();

        // 結果を検証
        for (const expression of [
            "#aaaaaaaa",
            "#abcdefab",
            "#fedcbafe"
        ]) {
            const result = detector.match(expression);
            expect(result).toBe(true);
        }
    });

    // 4:
    it("4: 前後に空白あり", () => {
        // テスト対象のインスタンスを作成
        const detector = new Hex8Detector();

        // 結果を検証
        for (const expression of [
            " #00000000 ",
            " #aaaaaaaa",
            "#AAAAAAAA "
        ]) {
            const result = detector.match(expression);
            expect(result).toBe(true);
        }
    });

    // 5:
    it("5: その他アンマッチ", () => {
        // テスト対象のインスタンスを作成
        const detector = new Hex8Detector();

        // 結果を検証
        for (const expression of [
            "abc",
            "#000",
            "#0000",
            "#000000",
            "rgb(0,0,0)",
            "rgb(0%,0%,0%)",
            "rgb(0,0,0,0)",
            "rgb(0%,0%,0%,0)",
            "rgba(0,0,0,0)",
            "rgba(0%,0%,0%,0)",
            "hsl(0,0%,0%)",
            "hsl(0,0%,0%,0)",
            "hsla(0,0%,0%,0)"
        ]) {
            const result = detector.match(expression);
            expect(result).toBe(false);
        }
    });
});