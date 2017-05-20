# now CLI - npm proxy

[![Build Status](https://travis-ci.org/zeit/now-cli-proxy.svg?branch=master)](https://travis-ci.org/zeit/now-cli-proxy)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![Slack Channel](http://zeit-slackin.now.sh/badge.svg)](https://zeit.chat)

If you're looking for the source code of `now`, you need to look [here](https://github.com/zeit/now-cli).

This is a special kind of package. When you install it using `npm install -g now`, it will automatically select the latest version of the [pkg](https://github.com/zeit/pkg)-ed `now` binary from [here](https://github.com/zeit/now-cli/releases) and place it on your device.

## Why Do We Ship a `pkg`-ed Binary?

- Simpler installation for non-Node users like those deploying [static files](https://zeit.co/blog/unlimited-static) or [Dockerfile](https://zeit.co/blog/now-dockerfile)s.
- Consistency across platforms and installation mechanisms (`npm`, `brew`, manual scripts)
- Parsing and evaluation optimizations: faster bootup time
- Easier installation in automation environments (like CI systems)
- Increased safety by providing a unified signature mechanism for releases

## Caught a Bug?

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Simulate the installation step: `npm install -g .`

As always, you can use `npm test` to run the tests and see if your changes have broken anything.
