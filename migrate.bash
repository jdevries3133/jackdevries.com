#!/bin/bash

set -euxo pipefail

mkdir -p markdown
mv app/mdx/*.mdx markdown
ls | grep -v \.git | grep -v markdown | grep -v public | xargs rm -rf
ls public | grep -v static | xargs rm -rf
