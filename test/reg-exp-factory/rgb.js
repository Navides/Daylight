import { RgbRegExpFactory } from "../../src/reg-exp-factory/rgb-reg-exp-factory.js";

// rgb
// RGB表現(例: rgb(0, 0, 0) )に関するテスト

describe("RgbRegExpFactory - rgb_", () => {
    // rgb_1:
    it("1: 値が整数", () => {
        // テスト対象の正規表現を作成
        const factory = new RgbRegExpFactory();
        const regExp = factory.create();

        // 結果を検証
        const values = [ "1", " 2", "3 " ];
        const expressions = values.map(x => `rgb(${[1,2,3].map(y => x).join(",")})`);
        for (const expression of expressions) {
            const result = regExp.test(expression);
            expect(result).toBe(true);
        }
    });

    // rgb_2:
    it("2: 値が小数", () => {
        // テスト対象の正規表現を作成
        const factory = new RgbRegExpFactory();
        const regExp = factory.create();

        // 結果を検証
        const values = [ "0.1", " 0.2", "0.3 " ];
        const expressions = values.map(x => `rgb(${[1,2,3].map(y => x).join(",")})`);
        for (const expression of expressions) {
            const result = regExp.test(expression);
            expect(result).toBe(true);
        }
    });

    // rgb_3:
    it("3: その他アンマッチ", () => {
        // テスト対象の正規表現を作成
        const factory = new RgbRegExpFactory();
        const regExp = factory.create();

        // 結果を検証
        for (const expression of [
            "abc",
            "#000",
            "#0000",
            "#000000",
            "#00000000",
            "rgb(0%,0%,0%)",
            "rgb(0,0,0,0)",
            "rgba(0,0,0,0)"
        ]) {
            const result = regExp.test(expression);
            expect(result).toBe(false);
        }
    });
});