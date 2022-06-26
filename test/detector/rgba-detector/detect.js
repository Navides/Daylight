import { RgbaDetector } from "../../../src/detector/rgba-detector.js";

// rgba
// RGBA表現(例: rgba(0, 0, 0, 0%) )に関するテスト

describe("RgbaDetector.detect - rgba_", () => {
    // rgba_1:
    it("1: 値が整数", () => {
        // テスト対象の正規表現を作成
        const detector = new RgbaDetector();

        // 結果を検証
        const values = [ "1", " 2", "3 " ];
        const expressions = values.map(x => `rgba(${[...Array(4)].map(y => x).join(",")})`);
        const result = detector.detect(expressions.join(" "));
        expect(result).toEqual(expressions);
    });

    // rgba_2:
    it("2: 値が小数", () => {
        // テスト対象の正規表現を作成
        const detector = new RgbaDetector();

        // 結果を検証
        const values = [ "0.1", " 0.2", "0.3 " ];
        const expressions = values.map(x => `rgba(${[...Array(4)].map(y => x).join(",")})`);
        const result = detector.detect(expressions.join(" "));
        expect(result).toEqual(expressions);
    });

    // rgba_3:
    it("3: アルファ値が整数パーセント", () => {
        // テスト対象の正規表現を作成
        const detector = new RgbaDetector();

        // 結果を検証
        const values = [ "1", " 2", "3 " ];
        const getAlpha = x => x != x.trimEnd() ? `${x.trimEnd()}% ` : `${x}%`;
        const expressions = values.map(x => `rgba(${[...Array(3)].map(y => x).join(",")},${getAlpha(x)})`);
        const result = detector.detect(expressions.join(" "));
        expect(result).toEqual(expressions);
    });

    // rgba_4:
    it("4: アルファ値が小数パーセント", () => {
        // テスト対象の正規表現を作成
        const detector = new RgbaDetector();

        // 結果を検証
        const values = [ "0.1", " 0.2", "0.3 " ];
        const getAlpha = x => x != x.trimEnd() ? `${x.trimEnd()}% ` : `${x}%`;
        const expressions = values.map(x => `rgba(${[...Array(3)].map(y => x).join(",")},${getAlpha(x)})`);
        const result = detector.detect(expressions.join(" "));
        expect(result).toEqual(expressions);
    });

    // rgba_5:
    it("5: 値がマイナス", () => {
        // テスト対象の正規表現を作成
        const detector = new RgbaDetector();

        // 結果を検証
        const expressions = [
            "rgba(-0,-0,-0,-0)",
            "rgba(-1,-1,-1,-1)",
            "rgba(-2,-2,-2,-2)"
        ];
        const result = detector.detect(expressions.join(" "));
        expect(result).toEqual(expressions);
    });

    // rgba_6:
    it("6: ドット始まりの小数", () => {
        // テスト対象の正規表現を作成
        const detector = new RgbaDetector();

        // 結果を検証
        const expressions = [
            "rgba(.0,.0,.0,.0)",
            "rgba(.1,.1,.1,.1)",
            "rgba(.2,.2,.2,.2)"
        ];
        const result = detector.detect(expressions.join(" "));
        expect(result).toEqual(expressions);
    });

    // rgba_7:
    it("7: その他", () => {
        // テスト対象の正規表現を作成
        const detector = new RgbaDetector();

        // 結果を検証
        const expressionSet = {
            none : [
                "123", 
                "abc", 
                "ABC"
            ],
            hex3 : [
                "#000", 
                "#aaa", 
                "#AAA"
            ],
            hex4 : [
                "#0000", 
                "#aaaa", 
                "#AAAA"
            ],
            hex6 : [
                "#000000", 
                "#aaaaaa", 
                "#AAAAAA"
            ],
            hex8 : [
                "#00000000", 
                "#aaaaaaaa", 
                "#AAAAAAAA"
            ],
            rgb : [
                "rgb(0,0,0)",
                "rgb( 1, 1, 1)",
                "rgb(2 ,2 ,2 )",
                "rgb( 3 , 3 , 3 )"
            ],
            rgbWithA : [
                "rgb(0,0,0,0)",
                "rgb( 1, 1, 1, 1)",
                "rgb(2 ,2 ,2 ,2 )",
                "rgb( 3 , 3 , 3 , 3 )"
            ],
            rgbPercent : [
                "rgb(0%,0%,0%)", 
                "rgb( 1%, 1%, 1%)", 
                "rgb(2% ,2% ,2% )", 
                "rgb( 3% , 3% , 3% )"
            ],
            rgbPercentWithA : [
                "rgb(0%,0%,0%,0)",
                "rgb( 1%, 1%, 1%, 1)",
                "rgb(2% ,2% ,2% ,2 )",
                "rgb( 3% , 3% , 3% , 3 )"
            ],
            rgba : [
                "rgba(0,0,0,0)",
                "rgba( 1, 1, 1, 1)",
                "rgba(2 ,2 ,2 ,2 )",
                "rgba( 3 , 3 , 3 , 3 )"
            ],
            rgbaPercent : [
                "rgba(0%,0%,0%,0)",
                "rgba( 1%, 1%, 1%, 1)",
                "rgba(2% ,2% ,2% ,2 )",
                "rgba( 3% , 3% , 3% , 3 )"
            ],
            hsl : [
                "hsl(0,0%,0%)",
                "hsl( 1, 1%, 1%)",
                "hsl(2 ,2% ,2% )",
                "hsl( 3 , 3% , 3% )"
            ],
            hslWithA : [
                "hsl(0,0%,0%,0)",
                "hsl( 1, 1%, 1%, 1)",
                "hsl(2 ,2% ,2% ,2 )",
                "hsl( 3 , 3% , 3% , 3 )"
            ],
            hsla : [
                "hsla(0,0%,0%,0)",
                "hsla( 1, 1%, 1%, 1)",
                "hsla(2 ,2% ,2% ,2 )",
                "hsla( 3 , 3% , 3% , 3 )"
            ]
        };
        const expression = Object.values(expressionSet).flat().join(" ");
        const result = detector.detect(expression);
        expect(result).toEqual(expressionSet.rgba);
    });
});