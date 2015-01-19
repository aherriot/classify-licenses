# classify-licenses

I was inspired by a job interviewer to programmatically determine if a text file a software license agreement file or something else.  This is my solution to the problem: using a Bayes classifier to categorize files.

## Installation and running

Install Node and NPM, then run:

```
npm install
node main.js
```

## Output
```
Processing training data...
classifying: ./data/license/CPL1.txt
classifying: ./data/license/GPLv3.txt
classifying: ./data/license/LPPL.txt
classifying: ./data/license/appache2.txt
classifying: ./data/license/LGPL3.txt
classifying: ./data/license/boost.txt
classifying: ./data/license/php.txt
classifying: ./data/license/MIT.txt
classifying: ./data/license/readme1.txt
classifying: ./data/license/readme2.txt
classifying: ./data/license/readme3.txt
classifying: ./data/license/changelog1.txt
classifying: ./data/license/readme4.txt
classifying: ./data/license/darwin-wiki-excerpt.txt

Testing classifier:
./data/test/darwin-wiki-non-license.txt classified as: not license
./data/test/python-socket-license.txt classified as: license
./data/test/readme1-non-license.txt classified as: not license
./data/test/BSD-license.txt classified as: license
```
