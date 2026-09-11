SHA := $(shell git rev-parse HEAD)
CONTAINER := jdevries3133/website:$(SHA)
CONTAINER_NAME := jdv-website
content: $(patsubst markdown/%.md,public/post/%.html,$(wildcard markdown/*.md))

define check-bin
	@which $(1) > /dev/null || { \
		echo 'fatal: install $(1)' ; \
		exit 1; \
	}
endef

.PHONY: check-cmark check-python check-terraform setup-terraform start container release dbg-container apply-terraform clean help

check-cmark:
	$(call check-bin,cmark)
	$(call mark,cmark)

check-python:
	$(call check-bin,python3)
	$(call mark-python)

check-terraform:
	$(call check-bin,terraform)

setup-terraform: .terraform.lock.hcl
	terraform init -reconfigure

public/post/%.html: markdown/%.md
	mkdir -p public/post
	cp before_post.html $@
	cmark --unsafe $< >> $@
	cat after_post.html >> $@

start: content check-python
	python3 -m http.server --directory public

container:
	docker buildx build --push --platform linux/amd64 --tag  $(CONTAINER) .

release: content container apply-terraform

dbg-container: content
	docker rm -f $(CONTAINER_NAME)
	docker run --rm --name $(CONTAINER_NAME) -p 8000:80 -d $(CONTAINER)

apply-terraform: setup-terraform release
	terraform apply

clean:
	rm -rf public/post .terraform

help:
	@echo "Available rules:"
	@echo
	@echo "    clean: delete build output"
	@echo "    content: convert markdown into html"
	@echo "    dbg-container: run the prod container locally"
	@echo "    release: build, push, and terraform apply"
	@echo "    start: run the development server once; no live-reloading"
