import { RgbPercentDetector } from "../../../src/detector/rgb-percent-detector.js";

// rgb-percent
// アルファ値を含まない%指定RGB表現(例: rgb(0%, 0%, 0%) )に関するテスト

describe("RgbPercentDetector.detect - rgb-percent_", () => {
    // rgb-percent_1:
    it("1: 値が整数", () => {
        // テスト対象の正規表現を作成
        const detector = new RgbPercentDetector();

        // 結果を検証
        const values = [ "1%", " 2%", "3% " ];
        const expressions = values.map(x => `rgb(${[...Array(3)].map(y => x).join(",")})`);
        const result = detector.detect(expressions.join(" "));
        expect(result).toEqual(expressions);
    });

    // rgb-percent_2:
    it("2: 値が小数", () => {
        // テスト対象の正規表現を作成
        const detector = new RgbPercentDetector();

        // 結果を検証
        const values = [ "0.1%", " 0.2%", "0.3% " ];
        const expressions = values.map(x => `rgb(${[...Array(3)].map(y => x).join(",")})`);
        const result = detector.detect(expressions.join(" "));
        expect(result).toEqual(expressions);
    });

    // rgb-percent_3:
    it("3: 値がマイナス", () => {
        // テスト対象の正規表現を作成
        const detector = new RgbPercentDetector();

        // 結果を検証
        const expressions = [
            "rgb(-0%,-0%,-0%)",
            "rgb(-1%,-1%,-1%)",
            "rgb(-2%,-2%,-2%)"
        ];
        const result = detector.detect(expressions.join(" "));
        expect(result).toEqual(expressions);
    });

    // rgb-percent_4:
    it("4: ドット始まりの小数", () => {
        // テスト対象の正規表現を作成
        const detector = new RgbPercentDetector();

        // 結果を検証
        const expressions = [
            "rgb(.0%,.0%,.0%)",
            "rgb(.1%,.1%,.1%)",
            "rgb(.2%,.2%,.2%)"
        ];
        const result = detector.detect(expressions.join(" "));
        expect(result).toEqual(expressions);
    });

    // rgb-percent_5:
    it("5: その他", () => {
        // テスト対象の正規表現を作成
        const detector = new RgbPercentDetector();

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
        expect(result).toEqual(expressionSet.rgbPercent);
    });
});