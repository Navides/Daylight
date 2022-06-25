import { HslaRegExpFactory } from "../../src/reg-exp-factory/hsla-reg-exp-factory.js";

// hsla
// HSLA表現(例: hsla(0, 0%, 0%, 0) )に関するテスト

describe("HslaRegExpFactory - hsla_", () => {
    // hsla_1:
    it("1: 値が整数", () => {
        // テスト対象の正規表現を作成
        const factory = new HslaRegExpFactory();
        const regExp = factory.create();

        // 結果を検証
        const values = [ "1", " 2", "3 " ];
        const getPercent = x => x != x.trimEnd() ? `${x.trimEnd()}% ` : `${x}%`;
        const expressions = values.map(x => `hsla(${x},${[...Array(2)].map(y => getPercent(x)).join(",")},${x})`);
        for (const expression of expressions) {
            const result = regExp.test(expression);
            expect(result).toBe(true);
        }
    });

    // hsla_2:
    it("2: 値が小数", () => {
        // テスト対象の正規表現を作成
        const factory = new HslaRegExpFactory();
        const regExp = factory.create();

        // 結果を検証
        const values = [ "0.1", " 0.2", "0.3 " ];
        const getPercent = x => x != x.trimEnd() ? `${x.trimEnd()}% ` : `${x}%`;
        const expressions = values.map(x => `hsla(${x},${[...Array(2)].map(y => getPercent(x)).join(",")},${x})`);
        for (const expression of expressions) {
            const result = regExp.test(expression);
            expect(result).toBe(true);
        }
    });

    // hsla_3:
    it("3: アルファ値が整数パーセント", () => {
        // テスト対象の正規表現を作成
        const factory = new HslaRegExpFactory();
        const regExp = factory.create();

        // 結果を検証
        const values = [ "1", " 2", "3 " ];
        const getPercent = x => x != x.trimEnd() ? `${x.trimEnd()}% ` : `${x}%`;
        const expressions = values.map(x => `hsla(${x},${[...Array(2)].map(y => getPercent(x)).join(",")},${getPercent(x)})`);
        for (const expression of expressions) {
            const result = regExp.test(expression);
            expect(result).toBe(true);
        }
    });

    // hsla_4:
    it("4: アルファ値が小数パーセント", () => {
        // テスト対象の正規表現を作成
        const factory = new HslaRegExpFactory();
        const regExp = factory.create();

        // 結果を検証
        const values = [ "0.1", " 0.2", "0.3 " ];
        const getPercent = x => x != x.trimEnd() ? `${x.trimEnd()}% ` : `${x}%`;
        const expressions = values.map(x => `hsla(${x},${[...Array(2)].map(y => getPercent(x)).join(",")},${getPercent(x)})`);
        for (const expression of expressions) {
            const result = regExp.test(expression);
            expect(result).toBe(true);
        }
    });

    // hsla_5:
    it("5: 前後に空白あり", () => {
        // テスト対象の正規表現を作成
        const factory = new HslaRegExpFactory();
        const regExp = factory.create();

        // 結果を検証
        for (const expression of [
            " hsla(0,0%,0%,0) ",
            " hsla(1,1%,1%,1)",
            "hsla(2,2%,2%,2) "
        ]) {
            const result = regExp.test(expression);
            expect(result).toBe(true);
        }
    });

    // hsla_6:
    it("6: 値がマイナス", () => {
        // テスト対象の正規表現を作成
        const factory = new HslaRegExpFactory();
        const regExp = factory.create();

        // 結果を検証
        for (const expression of [
            "hsla(-0,-0%,-0%,-0)",
            "hsla(-1,-1%,-1%,-1)",
            "hsla(-2,-2%,-2%,-2)"
        ]) {
            const result = regExp.test(expression);
            expect(result).toBe(true);
        }
    });

    // hsla_7:
    it("7: その他アンマッチ", () => {
        // テスト対象の正規表現を作成
        const factory = new HslaRegExpFactory();
        const regExp = factory.create();

        // 結果を検証
        for (const expression of [
            "abc",
            "#000",
            "#0000",
            "#000000",
            "#00000000",
            "rgb(0,0,0)",
            "rgb(0%,0%,0%)",
            "rgb(0,0,0,0)",
            "rgb(0%,0%,0%,0)",
            "rgba(0,0,0,0)",
            "hsl(0,0%,0%)",
            "hsl(0,0%,0%,0)"
        ]) {
            const result = regExp.test(expression);
            expect(result).toBe(false);
        }
    });
});