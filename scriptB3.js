"use strict";



function extractTextFromURL() {
    const inputBox = document.getElementById('inputBox');
    const url = inputBox.value.trim();

    if (url === '') {
        alert('Please enter a valid URL.');
        return;
    }

    // Use a proxy URL to bypass CORS restrictions
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const fullUrl = proxyUrl + url;

    fetch(fullUrl)
        .then(response => response.text())
        .then(html => {
            // Use DOMParser to parse the HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Extract the visible text content
            const textContent = extractText(doc.body);

            // Display the extracted text in the #wc_document element
            const wcDocument = document.getElementById('wc_document');
            wcDocument.innerText = textContent;

            // Pass the extracted text to wordCloud function 
            wordCloud(textContent);
        })
        .catch(error => {
            console.error('Error fetching the URL:', error);
            alert('Error fetching the URL. Please check if the URL is valid and accessible.');
        });
}

//function to extract visible text content from the DOM
function extractText(element) {
    let textContent = '';

    for (const node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            textContent += node.textContent.trim() + ' ';
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
                textContent += extractText(node);
            }
        }
    }

    return textContent;
}

//called fuction extractTextFromURL when button the button was clicked
document.getElementById('extractButton').addEventListener('click', extractTextFromURL);



function wordCloud(sourceText) {
   

    function removeHtmlTags(text) {
        text.replace(/<.*?>/g, ' ');
        return text.replace(/[^a-zA-Z]+/g, ' ');
    }   
     var cleanText = removeHtmlTags(sourceText);
     console.log("CleanText",cleanText);
    
     //convert to lowercase
    sourceText = cleanText.toLowerCase();
    console.log("smallcaps",sourceText);

    // and remove leading and trailing whitespace
    sourceText = sourceText.trim();
     console.log("TRIM" , sourceText)   


      let count = 0;
      let deletedWords = [];

    for (let i = 0; i < stopWords.length; i++) {
    let stopRegx = new RegExp("\\b" + stopWords[i] + "\\b", "gi");
     let deleted = sourceText.match(stopRegx);
         if (deleted) {
             deletedWords = deletedWords.concat(deleted.map(word => word.toLowerCase()));
          }
     sourceText = sourceText.replace(stopRegx, (match) => {
    count++;
    return ' '; 
     });
    }
    console.log("Number of stopwords in the text: " + count);
    console.log("Deleted stopwords: " + deletedWords.join(", "));
    console.log("Processed text: " + sourceText);
   

    //Place remaining worlds 
    let words =sourceText.split(/\s+/g);

    console.log("Split",words);
    words.sort();

    console.log("SortedWords", words);

    // find unque ones first
    let unique = [[words[0],1]]
    let uniqueIndex =0;
    console.log(words);

    for (let i = 1; i < words.length; i++ ) {
        if (words[i] === words[i-1] ) {
        // Increase the duplicate count by 1
        unique[uniqueIndex][1]++;
        } else {
        // Add a new word to the unique array
        uniqueIndex++;
        unique[uniqueIndex] = [words[i], 1];
        }
    }

    // Sort by descending order of duplicate count
     unique.sort(byDuplicate);
     function byDuplicate(a, b) {
     return b[1]-a[1];
    }
     unique = unique.slice(0,100);
     let maxCount =unique[0][1];

      
    // Sort the word list in alphabetic order
    unique.sort();
    console.log("Unique",unique,maxCount);

    //write in word cloud
     let cloudBox = document.getElementById("wc_cloud");
     cloudBox.innerHTML = "";

  
    // Size each word based on its usage
    for (let i = 0; i < unique.length; i++) {
     let word = document.createElement("span");
     word.textContent = unique[i][0];
    word.style.fontSize = unique[i][1]/maxCount   + "em";
    cloudBox.appendChild(word);
    }
    console.log("WordCloud",cloudBox);
    




}




























/*--- ----------------------------------------------*/
/* Array of words to NOT include in the word cloud */
/*-------------------------------------------------*/

let stopWords = ["a", "about", "above", "across", "after", "afterwards", "again", "against","ab","aaa","aarxiv",
                 "ago", "all", "almost", "alone", "along", "already", "also", "although","aatifishal","abbr", 
                 "always", "am", "among", "amongst", "amoungst", "amount", "an", "and", "a","b","c","d",
                 "another", "any", "anyhow", "anyone", "anything", "anyway", "anywhere", "e","f","g","h",
                 "are", "around", "as", "at", "back", "be", "became", "because", "become","rft","cmw","lua",
                 "becomes", "becoming", "been", "before", "beforehand", "behind", "being", "mw","aan","aancia",
                 "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom", "amp",
                 "but", "by", "call", "came", "can", "cannot", "cant", "case","cases","cause", "n",
                 "co", "computer", "con", "could", "couldnt", "cry", "de", "describe", "detail", 
                 "do", "does", "doing", "done", "down", "due", "during", "each", "eg", "eight", 
                 "either", "eleven", "else", "elsewhere", "empty", "enough", "etc", "even", 
                 "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fie",
                 "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", 
                 "formerly", "forty", "found", "four", "from", "front", "full", "further", 
                 "get", "give", "go", "had", "has", "hasnt", "have", "he", "held", "having", 
                 "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", 
                 "herself", "him", "himself", "his", "how", "however", "hundred", "i", "ie", 
                 "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", 
                 "keep", "know", "knows", "knew", "last", "latter", "latterly", "least", "less", 
                 "let", "ltd", "made", "make","many", "may", "me", "meanwhile", "might", "mill", 
                 "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", 
                 "myself", "name", "namely", "neither", "never", "nevertheless", "next", 
                 "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", 
                 "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", 
                 "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", 
                 "own", "part", "per", "perhaps", "plainly", "please", "precisely", "put", 
                 "rather", "re", "same", "said", "say", "says", "see", "seem", "seemed", 
                 "seeming", "seems", "serious", "several", "shall", "she", "should", "show", 
                 "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", 
                 "something", "sometime", "sometimes", "somewhere", "st", "sts", "still", "such", 
                 "system", "take", "ten", "th", "ths", "thx", "than", "that", "the", "their", 
                 "them", "themselves", "then", "thence", "there", "thereafter", "thereby", 
                 "therefore", "therein", "thereupon", "these", "they", "thick", "thin", 
                 "third", "this", "those", "though", "three", "through", "throughout", 
                 "thru", "thus", "to", "together", "too", "top", "toward", "towards", 
                 "twelve", "twenty", "two", "un", "unless", "under", "until", "up", 
                 "upon", "us", "very", "via", "was", "we", "well", "were", "weve", "what", 
                 "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", 
                 "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", 
                 "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", 
                 "with", "within", "without", "would", "year", "years", "yet", "you", 
                 "your", "yours", "yourself","yourselves","aa","aaai","aartificial",
                "df", "ed", "d","ff", "a", "f", "dd"];
