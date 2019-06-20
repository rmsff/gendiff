# project-lvl1-s475

<a href="https://codeclimate.com/github/serikoff/project-lvl2-s475/maintainability"><img src="https://api.codeclimate.com/v1/badges/f9c52808aa4310e5db39/maintainability" /></a>
[![Build Status](https://travis-ci.org/serikoff/project-lvl2-s475.svg?branch=master)](https://travis-ci.org/serikoff/project-lvl2-s475)

##
[![Hexlet Ltd. logo](https://raw.githubusercontent.com/Hexlet/hexletguides.github.io/master/images/hexlet_logo128.png)](https://ru.hexlet.io/pages/about?utm_source=github&utm_medium=link&utm_campaign=nodejs-package)

This repository is created and maintained by a student of the Hexlet educational project community. Is a utility for finding differences in configuration files. [Read more about Hexlet (in Russian)](https://ru.hexlet.io/pages/about?utm_source=github&utm_medium=link&utm_campaign=nodejs-package).

##

# Difference calculator
step 1

[![asciicast](https://asciinema.org/a/kUBAYadyYcnTCvUNBc1jmWINj.png)](https://asciinema.org/a/kUBAYadyYcnTCvUNBc1jmWINj)

step 2

[![asciicast](https://asciinema.org/a/aFbfPeO2RfEHu8Jld8jF4Bi4g.png)](https://asciinema.org/a/aFbfPeO2RfEHu8Jld8jF4Bi4g)

step 3 

[![asciicast](https://asciinema.org/a/BvFbN7cJtLtiU1OSFebeh4DOr.png)](https://asciinema.org/a/BvFbN7cJtLtiU1OSFebeh4DOr)

step 4

[![asciicast](https://asciinema.org/a/EZ1nDm98JAbRCPnnAT6z4rBof.png)](https://asciinema.org/a/EZ1nDm98JAbRCPnnAT6z4rBof)

step 5 

[![asciicast](https://asciinema.org/a/fuvntLEWGaV77taYGZ6i52k0D.png)](https://asciinema.org/a/fuvntLEWGaV77taYGZ6i52k0D)

step 6 

[![asciicast](https://asciinema.org/a/RVjWrCKzY1tg4aKUTfcufLGh7.png)](https://asciinema.org/a/RVjWrCKzY1tg4aKUTfcufLGh7)

step 7

[![asciicast](https://asciinema.org/a/eJkpXG8VAtffrLY88iW1yNCXx.png)](https://asciinema.org/a/eJkpXG8VAtffrLY88iW1yNCXx)



## Setup

clone git and npm install

```sh
$ npm install
```

## If you are using Linux and you have the error 
```sh
$ gendiff
/usr/bin/env: 'node': No such file or directory
```
then enter the command 
```sh
$ sudo ln -s $(which nodejs) /usr/local/bin/node
```
This should solve the problem.

## Usage

* program supports four input file types: `.yml` `.yaml` `.ini` `.json`
* program supports three output types: `plain` `diff` `json`
* `$ gendiff before.json after.json` get diff with default output
* `$ gendiff --format json before.yml after.yml ` get full diff tree with JSON output
* `-f | --format [type]` formating output to tree, json or plain, default is tree
* `-h | --help` help page
* `-V | --version` program version


## Example

### Tree output
`$ gendiff before.json after.json`
```
{
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}
```
### Plain output
`$ gendiff --format plain before.json after.json `
```
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From complex value to 'str'
Property 'group2' was removed
Property 'group3' was added with [complex value]
```
### JSON output
`$ gendiff --format json before.json after.json`
```json
[
  {
    "key": "group1",
    "type": "nest",
    "children": [
      {
        "key": "baz",
        "type": "updated",
        "valueBefore": "bas",
        "valueAfter": "bars"
      },
      {
        "key": "foo",
        "value": "bar",
        "type": "current"
      },
      {
        "key": "nest",
        "type": "updated",
        "valueBefore": {
          "key": "value"
        },
        "valueAfter": "str"
      }
    ]
  },
  {
    "key": "group2",
    "type": "deleted",
    "value": {
      "abc": "12345"
    }
  },
  {
    "key": "group3",
    "type": "added",
    "value": {
      "fee": "100500"
    }
  }
]
```
