// The trim() method of String values removes whitespace from both ends 
// of this string and returns a new string, without modifying the original string.

// trim() method eliminates :
// - white spaces like :
//      horizontal tabulation (\t)
//      vertical tabulation (\v)
//      page breaking control character (\f)
//      space (\s), no-break space (\u00A0), zero-width no-break space 
//      other unicode space characters
// - line terminators like :
//      new line (\n)
//      carriage return (\r)
//      line separator, paragraph separator


// ***********************************************************************
String.prototype.myTrim = function () {
    const whiteSpaces = ["", " ", "\s", "\t", "\v", "\f", "\n", "\r", "\u00A0"];

    const str = this;
    const strLength = str.length;

    let start = 0;
    let end = strLength;

    // find beginning of the valid index
    for (let i = 0; i < strLength; i++) {
        if (whiteSpaces.indexOf(str[i]) === -1) {
            start = i;
            break;
        }
    }

    // find end of the valid index
    for (let i = strLength - 1; i >= 0; i--) {
        if (whiteSpaces.indexOf(str[i]) === -1) {
            end = i;
            break;
        }
    }

    return str.slice(start, end + 1);
}

let myStr = "   qwerf sadf  ged  \t";
console.log(myStr.trim());
console.log(myStr.myTrim());