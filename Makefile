SHA := $(shell git rev-parse HEAD)
CONTAINER := jdevries3133/website:$(SHA)
CONTAINER_NAME := jdv-website
MARKER_DIR := .make-markers
PORT := 8000
content: $(patsubst markdown/%.md,public/post/%.html,$(wildcard markdown/*.md))

define check-bin
	@which $(1) > /dev/null || { \
		echo 'fatal: install $(1)' ; \
		exit 1; \
	}
endef

define touch-marker
	mkdir -p $(MARKER_DIR)
	touch $(MARKER_DIR)/$(1)
endef

define assert-port-free
	@lsof -i -P -n | grep LISTEN | grep -q ':$(1)' && { \
		echo "port $(1) is not free"; \
		exit 1; \
	} || true;
endef

.PHONY: track-git
track-git:
	mkdir -p $(MARKER_DIR)
	current="$$(git rev-parse HEAD)"; \
	last=$$(cat $(MARKER_DIR)/last-git-rev 2> /dev/null || echo init); \
	if [ "$$current" != "$$last" ] ; then \
		echo "$$current" > "$(MARKER_DIR)/last-git-rev"; \
	fi

.PHONY: check-cmark
check-cmark:
	$(call check-bin,cmark)
	$(call mark,cmark)

.PHONY: check-python
check-python:
	$(call check-bin,python3)
	$(call mark-python)

.PHONY: check-terraform
check-terraform:
	$(call check-bin,terraform)

$(MARKER_DIR)/terraform-init: .terraform.lock.hcl
	terraform init -reconfigure
	$(call touch-marker,terraform-init)

public/post/%.html: markdown/%.md
	mkdir -p public/post
	cp before_post.html $@
	cmark --unsafe $< >> $@
	cat after_post.html >> $@
	commit_date="$$(git log -1 --format=%cd --date=format:%Y%m%d%H%M.%S -- $<)"; \
	touch -t "$$commit_date" $@;

.PHONY: start
start: content check-python
	$(call assert-port-free,$(PORT))
	python3 -m http.server --directory public

$(MARKER_DIR)/container: Dockerfile $(MARKER_DIR)/last-git-rev
	docker buildx build --load --push --platform linux/amd64,linux/arm64 --tag  $(CONTAINER) .
	$(call touch-marker,container)

.PHONY: release
release: track-git content $(MARKER_DIR)/container apply-terraform

.PHONY: dbg-container
dbg-container: track-git content
	docker rm -f $(CONTAINER_NAME)
	$(call assert-port-free,$(PORT))
	docker run --rm --name $(CONTAINER_NAME) -p $(PORT):80 -d $(CONTAINER)

.PHONY: apply-terraform
apply-terraform: $(MARKER_DIR)/terraform-init
	terraform apply

.PHONY: clean
clean:
	rm -rf public/post .terraform $(MARKER_DIR)

.PHONY: help
help:
	@echo "Available rules:"
	@echo
	@echo "    clean: delete build output"
	@echo "    content: convert markdown into html"
	@echo "    dbg-container: run the prod container locally"
	@echo "    release: build, push, and terraform apply"
	@echo "    start: run the development server once; no live-reloading"
