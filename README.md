# classify-licenses

I was inspired by a job interviewer to programmatically determine if a text file a software license agreement file or something else.  This is my solution to the problem: using a Bayes classifier to categorize files.

## Installation and running

Install Node and NPM, then run:

```
npm install
node main.js
```

## Usage

Simple drop files into the /data/test/ directory,
and it will output a line classifying each file in that directory.

## Output
```
Processing training data...
classifying: ./data/license/CPL1.txt
classifying: ./data/license/LGPL3.txt
classifying: ./data/license/appache2.txt
classifying: ./data/license/MIT.txt
classifying: ./data/license/boost.txt
classifying: ./data/license/GPLv3.txt
classifying: ./data/license/LPPL.txt
classifying: ./data/license/php.txt
classifying: ./data/not-license/changelog1.txt
classifying: ./data/not-license/readme2.txt
classifying: ./data/not-license/readme3.txt
classifying: ./data/not-license/darwin-wiki-excerpt.txt
classifying: ./data/not-license/readme4.txt
classifying: ./data/not-license/readme1.txt

Testing classifier:
./data/test/BSD-license.txt classified as: license
./data/test/python-socket-license.txt classified as: license
./data/test/darwin-wiki-non-license.txt classified as: not license
./data/test/readme1-non-license.txt classified as: not license
```
