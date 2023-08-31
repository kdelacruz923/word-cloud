"use strict";
/*    JavaScript 7th Edition
      Chapter 7
      Chapter case   

      Word Cloud   Generator
      Author: 
      Date: July 13th, 2023 

      Filename:       js07.js
 */


// Get the user-provided URL and generate the Word Cloud on button click
document.getElementById("generateButton").onclick = function () {
  // Get the user-provided URL
  let userUrl = document.getElementById("urlInput").value;

  // Use the CORS proxy URL (cors-anywhere) to make the cross-origin request
  let corsProxyUrl = "https://cors-anywhere.herokuapp.com";
  let proxyUrl = corsProxyUrl + "/" + userUrl; // Append the target URL to the proxy URL

  // Fetch the content using the CORS proxy
  fetch(proxyUrl)
     .then((response) => {
        if (!response.ok) {
           throw new Error("Network response was not ok");
        }
        return response.text();
     })
     .then((sourceText) => {
        // Once the content is retrieved, generate the Word Cloud
        console.log("Source Text:", sourceText);
        generateWordCloud(sourceText);
     })
     .catch((err) => {
        // In case of an error (e.g., invalid URL or network issue), alert the user
        window.alert("Error fetching content from the provided URL: " + err.message);
     });
};



// Function to generate Word Cloud
function generateWordCloud(sourceText) {
  // Step 1: Remove HTML Tags
  function removeHtmlTags(text) {
     return text.replace(/<.*?>/g, '');
  }
    
  var cleanText = removeHtmlTags(sourceText);
  
  // Step 2: Preprocess Text
 cleanText = preprocessText(cleanText);

  // Step 3: Place remaining worlds - remove space, tabs, newline
   var tokens = cleanText.split(/\s+/);   

   console.log("Tokens",tokens);
   
  //var tokens = cleanText.split(/\b\s+\b/);
  //console.log("Word Count:", tokens.length);
  

 // Step 4: Count Frequencies
  var wordFrequencies = {};
  tokens.forEach(function(token) {
     wordFrequencies[token] = (wordFrequencies[token] || 0) + 1;
  });

  console.log("Wros Freq",wordFrequencies);
  // for (const word in wordFrequencies) {
  //   console.log(`Word: ${word}, Count: ${wordFrequencies[word]}`);
  // }
  tokens.sort()
  
  // Step 5: Generate Word Cloud
  WordCloud(document.getElementById('wc_cloud_container'), {
     list: Object.entries(wordFrequencies),
     fontFamily: 'Arial, sans-serif', // Change the font family if needed
     color: 'random-light', // Use random colors for the words
     backgroundColor: 'white', // Set the background color of the word cloud
   
  });

  function preprocessText(text) {
    // Convert text to lowercase
    text = text.toLowerCase();
    text = text.trim();

    // Remove special characters and punctuation marks using regular expressions
    text = text.replace(/[^\w\s]/g, ''); // Remove all non-word characters (excluding spaces)
    

    let alphaRegx = /[^a-zA-Z\s]/g;  //[a-zA-Z\s]/g
    text = text.replace(alphaRegx, "");

    //remove stopwords
    for (let i=0; i<stopWords.length; i++){
    let stopRegx = new RegExp("\\b" + stopWords[i] + "\\b","g")
    text= text.replace(stopRegx, "");
    }  

    console.log("text",text);
    return text;
  }
 
}






/*--- ----------------------------------------------*/
/* Array of words to NOT include in the word cloud */
/*-------------------------------------------------*/

let stopWords = ["a", "about", "above", "across", "after", "afterwards", "again", "against", 
"ago", "all", "almost", "alone", "along", "already", "also", "although", "to","for","from",
"always", "am", "among", "amongst", "amoungst", "amount", "an", "and", 
"another", "any", "anyhow", "anyone", "anything", "anyway", "anywhere", 
"are", "around", "as", "at", "back", "be", "became", "because", "become", 
"becomes", "becoming", "been", "before", "beforehand", "behind", "being", 
"below", "beside", "besides", "between", "beyond", "bill", "both", "bottom", 
"but", "by", "call", "came", "can", "cannot", "cant", "case","cases","cause", 
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
"your", "yours", "yourself","yourselves",
"vectortoclevel","classvectortoclistitem","mwparseroutput","dlmwparseroutput","dtlastchildaftermwparseroutput",
"ulmwparseroutput","olmwparseroutput"];
