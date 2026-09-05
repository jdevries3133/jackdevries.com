#!/bin/bash

set -euxo pipefail

restore() {
    git checkout -- .
    git clean -df
}

nuke_trash() {
    mkdir -p markdown
    mv app/mdx/*.mdx markdown
    ls -a | grep -v migrate.bash \
        | grep -v '^\.\.\?$' \
        | grep -v \.git \
        | grep -v markdown \
        | grep -v public \
        | xargs rm -rf
    ls public | grep -v static | xargs -I{} rm -rf public/{}
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

remove_code_sample_component() {
    file="$1"
    cat "$file" | sed '/CodeSample/d' > tmp
    mv tmp "$file"
}

rewrite_image_component() {
    file="$1"
    cat "$file" \
        | sed 's/\<Image/\<img/g; /^import.*Image.*/d ' \
        > tmp
    mv tmp "$file"
}

rename_mdx_to_md() {
    file="$1"
    markdown_name="$(echo "$file" | sed 's/\.mdx$/\.md/g')"
    mv "$file" "$markdown_name"
}

main() {
    restore
    nuke_trash

    cd markdown
    for file in $(ls *.mdx)
    do
            rip_out_yaml_frontmatter "$file"
            remove_code_sample_component "$file"
            rewrite_image_component "$file"
            rename_mdx_to_md "$file"
    done
}

main
