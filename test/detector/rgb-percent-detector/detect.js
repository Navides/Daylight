import { ExpressionSetFactory } from "../expression-set-factory.js";
import { RgbPercentDetector } from "../../../src/detector/rgb-percent-detector.js";

// rgb-percent
// アルファ値を含まない%指定RGB表現(例: rgb(0%, 0%, 0%) )に関するテスト

describe("RgbPercentDetector.detect - ", () => {
    // 1:
    it("1: 値が整数", () => {
        // テスト対象のインスタンスを作成
        const detector = new RgbPercentDetector();

        // 結果を検証
        const values = [ "1%", " 2%", "3% " ];
        const expressions = values.map(x => `rgb(${[...Array(3)].map(y => x).join(",")})`);
        const result = detector.detect(expressions.join(" "));
        expect(result).toEqual(expressions);
    });

    // 2:
    it("2: 値が小数", () => {
        // テスト対象のインスタンスを作成
        const detector = new RgbPercentDetector();

        // 結果を検証
        const values = [ "0.1%", " 0.2%", "0.3% " ];
        const expressions = values.map(x => `rgb(${[...Array(3)].map(y => x).join(",")})`);
        const result = detector.detect(expressions.join(" "));
        expect(result).toEqual(expressions);
    });

    // 3:
    it("3: 値がマイナス", () => {
        // テスト対象のインスタンスを作成
        const detector = new RgbPercentDetector();

        // 結果を検証
        const values = [ "-1%", " -2%", "-3% " ];
        const expressions = values.map(x => `rgb(${[...Array(3)].map(y => x).join(",")})`);
        const result = detector.detect(expressions.join(" "));
        expect(result).toEqual(expressions);
    });

    // 4:
    it("4: ドット始まりの小数", () => {
        // テスト対象のインスタンスを作成
        const detector = new RgbPercentDetector();

        // 結果を検証
        const values = [ ".1%", " .2%", ".3% " ];
        const expressions = values.map(x => `rgb(${[...Array(3)].map(y => x).join(",")})`);
        const result = detector.detect(expressions.join(" "));
        expect(result).toEqual(expressions);
    });

    // 5:
    it("5: その他", () => {
        // テスト対象のインスタンスを作成
        const detector = new RgbPercentDetector();

        // 結果を検証
        const expressionSet = ExpressionSetFactory.create();
        const expression = Object.values(expressionSet).flat().join(" ");
        const result = detector.detect(expression);
        expect(result).toEqual(expressionSet.rgbPercent);
    });
});