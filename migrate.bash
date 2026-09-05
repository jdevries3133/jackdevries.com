#!/bin/bash

set -euxo pipefail

restore() {
    git checkout -- .
    git clean -df
}

nuke_trash() {
    mkdir -p markdown
    mv app/mdx/*.mdx markdown
    ls | grep -v migrate.bash \
        | grep -v \.git \
        | grep -v markdown \
        | grep -v public \
        | xargs rm -rf
    ls public | grep -v static | xargs rm -rf
}

rip_out_yaml_frontmatter() {
    file="$1"
    file_basename="$(echo "$file" | sed 's/\.mdx$//g')"
    cat "$file" \
        | sed '/^---$/,/^---$/!d' \
        | sed 's/^---$//g' \
        > "${file_basename}.yml"
    cat "$file" \
        | sed '/^---$/,/^---$/d' \
        > tmp
    mv tmp "$file"
}


main() {
    restore
    nuke_trash

    cd markdown
    for file in $(ls *.mdx)
    do
            rip_out_yaml_frontmatter "$file"
    done
}

main
