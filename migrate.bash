#!/bin/bash

set -euxo pipefail

git checkout -- .
git clean -df

mkdir -p markdown
mv app/mdx/*.mdx markdown
ls | grep -v migrate.bash \
    | grep -v \.git \
    | grep -v markdown \
    | grep -v public \
    | xargs rm -rf
ls public | grep -v static | xargs rm -rf
