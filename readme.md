# now CLI - npm proxy

[![Build Status](https://travis-ci.org/zeit/now-cli-proxy.svg?branch=master)](https://travis-ci.org/zeit/now-cli-proxy)
[![Slack Channel](http://zeit-slackin.now.sh/badge.svg)](https://zeit.chat)

If you're looking for the source code of `now`, you need to look [here](https://github.com/zeit/now-cli).

This is a special kind of package. When you install it using `npm install -g now`, it will automatically select the latest version of the [pkg](https://github.com/zeit/pkg)-ed `now` binary from [here](https://github.com/zeit/now-cli/releases) and place it on your device.

The reason why this exists is because we want to distribute the [pkg](https://github.com/zeit/pkg)-ed version of the `now` command line interface everywhere: Via [Now Desktop](https://github.com/zeit/now-desktop), on [npm](https://www.npmjs.com) (which would otherwise install the source code of the project and run it using [Node.js](https://nodejs.org)). This not only allows us to ship `now` with the [Node.js](https://nodejs.org) version of our choice (which means that it will also run on devices with a very old instance of [Node.js](https://nodejs.org) on them), but it also leads to `now` running much faster because bytecode is being executed instead of the source code getting parsed and run.

## Caught a Bug?

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Simulate the installation step: `npm install -g .`

As always, you can use `npm test` to run the tests and see if your changes have broken anything.
