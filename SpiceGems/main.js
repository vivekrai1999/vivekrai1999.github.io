//Sort String in alphabet order
// function sortAlphabets(str){
//     let strArr = str.split("")
//     let sortArr = strArr.sort()
//     let sortStr = sortArr.join("")
//     console.log(sortStr);
// }
// sortAlphabets("webmaster")

// convert first letter to uppercase
// function convertUppercase(str){
//     let strArr = str.split(" ")
//     let upperArr = [];
//     strArr.forEach((x)=>{
//         let strArr = x.split("")
//         strArr[0] = strArr[0].toUpperCase()
//         let newStr = strArr.join("")
//         upperArr.push(newStr)
//     })
//     let finalStr = upperArr.join(" ")
//     console.log(finalStr);
// }
// convertUppercase("the quick brown fox")

// find the longest word within string
// function findLongest(str){
//     let strArr = str.split(" ");
//     let longest = 0, idx = 0;
//     // console.log(strArr);
//     strArr.forEach((x, index)=>{
//         let strLen = x.length
//         if(strLen > longest) {
//             longest = strLen
//             idx = index
//         }
//     })
//     console.log(strArr[idx]);
// }
// findLongest('Web Development Tutorial')

// count vowel
// function countVowel(str){
//     let countVowels = 0;
//     let strArr = str.split("")
//     console.log(strArr);
//     strArr.forEach((x)=>{
//         if(x == 'a'||x == 'e'||x == 'i'||x == 'o'||x == 'u'||x == 'A'||x == 'E'||x == 'I'||x == 'O'||x == 'U'){
//             countVowels += 1;
//         }
//         else{
//             console.log("not vowel");
//         }
//     })
//     console.log(countVowels);
// }
// countVowel("The quick brown fox")