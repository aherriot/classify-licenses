var fs = require('fs');
var natural = require('natural');
var async = require('async');

var licenseDir = './data/license/';
var nonLicenseDir = './data/not-license/';
var testDir = './data/test/';

var minWordLength = 5;
var maxWordCount = 25;

var classifier = new natural.BayesClassifier();
var tokenizer = new natural.WordTokenizer();

// using async.series to maintain the order of execution

async.series([
  //adding the licenses to the classifier
  function(callback) {
    console.log('Processing training data...');
    classifyDirectory(licenseDir, 'license', callback);
  },

  //adding the non-licenses to the classifier
  function(callback) {
    classifyDirectory(nonLicenseDir, 'not license', callback);
  },

  //train on the data
  function(callback) {
    classifier.train();
    callback();
  },
  // read our test data files and see if our classifier worked.
  function(callback) {
    console.log('\nTesting classifier:');
    classifyDirectory(testDir, 'test', callback);
  }
]);

//iterate over files in a directory dir and classify them with classification
function classifyDirectory(dir, classification, callback) {
  fs.readdir(dir, function(err, files) {
    if(err) throw err;
    var count = 0;
    files.forEach(function(file){
      count++;
      fs.readFile(dir + file, 'utf-8', function(err,data){
        if (err) throw err;

        var frequentWords = getFrequency(tokenizer.tokenize(data), minWordLength, maxWordCount);
        //console.log(frequentWords);

        //if test, output results
        if(classification === 'test') {
          console.log(dir + file + ' classified as: ' + classifier.classify(frequentWords));

        } else { //otherwise, add document.
          console.log("classifying: " + dir + file);
          classifier.addDocument(frequentWords, classification);
        }

        //finished reading last license file,
        //signal we are can move on to non-licenses
        if(--count === 0)
          callback();
      });
    });
  });
}

// Returns the list of the most common words in the array
// That are greater or equal in length to minLength
// and appear moretimes than cutoff
// Inspired by http://codereview.stackexchange.com/a/63979
function getFrequency(words, minLength, cutoff) {
  //var cleanString = string.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,""),
  //words = cleanString.split(' '),
  var frequencies = {};
  var frequency;

  for(var i=0; i < words.length; i++) {

    var word = words[i].toLowerCase();

    if(word.length < minLength)
      continue;

    frequencies[word] = frequencies[word] || 0;
    frequencies[word]++;
  }

  words = Object.keys(frequencies);
  return words.sort(function (a,b) { return frequencies[b] -frequencies[a];}).slice(0,cutoff);
}
