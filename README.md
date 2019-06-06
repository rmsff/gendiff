# project-lvl1-s475

<a href="https://codeclimate.com/github/serikoff/project-lvl2-s475/maintainability"><img src="https://api.codeclimate.com/v1/badges/f9c52808aa4310e5db39/maintainability" /></a>
[![Build Status](https://travis-ci.org/serikoff/project-lvl2-s475.svg?branch=master)](https://travis-ci.org/serikoff/project-lvl2-s475)

##
[![Hexlet Ltd. logo](https://raw.githubusercontent.com/Hexlet/hexletguides.github.io/master/images/hexlet_logo128.png)](https://ru.hexlet.io/pages/about?utm_source=github&utm_medium=link&utm_campaign=nodejs-package)

This repository is created and maintained by a student of the Hexlet educational project community. Is a utility for finding differences in configuration files. [Read more about Hexlet (in Russian)](https://ru.hexlet.io/pages/about?utm_source=github&utm_medium=link&utm_campaign=nodejs-package).

##

# Difference calculator
step 1

[![asciicast](https://asciinema.org/a/Sbx6g1k1cr1AtvIKjxQRQyvQd.png)](https://asciinema.org/a/Sbx6g1k1cr1AtvIKjxQRQyvQd)

step 2

[![asciicast](https://asciinema.org/a/7m6lM4bEcIXi10RchalqAHkwg.png)](https://asciinema.org/a/7m6lM4bEcIXi10RchalqAHkwg)

step 3 

[![asciicast](https://asciinema.org/a/Hijdg8YQtV6eHmeK7v8HvVJii.png)](https://asciinema.org/a/Hijdg8YQtV6eHmeK7v8HvVJii)

step 4

[![asciicast](https://asciinema.org/a/1SaFcR5v0ULY4ejaQl05v3Unq.png)](https://asciinema.org/a/1SaFcR5v0ULY4ejaQl05v3Unq)

step 5 

[![asciicast](https://asciinema.org/a/7ycCL4pBj8xXTGjvHSAlc7ZPl.png)](https://asciinema.org/a/7ycCL4pBj8xXTGjvHSAlc7ZPl)

step 6 

[![asciicast](https://asciinema.org/a/NC2yM83oGGzCcsLyMUQne8KLO.png)](https://asciinema.org/a/NC2yM83oGGzCcsLyMUQne8KLO)

step 7

[![asciicast](https://asciinema.org/a/3g6lAThyFivGXIv7shjheVDt1.png)](https://asciinema.org/a/3g6lAThyFivGXIv7shjheVDt1)



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
* `$ gendiff before.yml after.yml --format json` get full diff tree with JSON output
* `-f | --format [type]` formating output to tree, json or plain, default is tree
* `-h | --help` help page
* `-V | --version` program version