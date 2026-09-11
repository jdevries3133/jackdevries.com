SHA := $(shell git rev-parse HEAD)
CONTAINER := jdevries3133/website:$(SHA)
CONTAINER_NAME := jdv-website
MARKER_DIR := .make-markers
PORT := 8000

MD_STEMS := $(basename $(notdir $(wildcard markdown/*.md)))

# Reads the `created: YYYY-MM-DD` date out of markdown/<stem>.yml
post-date = $(strip $(shell yq -r '.created' markdown/$1.yml | tr -d '\r'))

# Build target: date-prefixed HTML file
define post-html
public/post/$(call post-date,$(1))-$(1).html
endef

content: $(foreach s,$(MD_STEMS),$(call post-html,$(s)))

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

check_bin_rules = cmark python terraform yq
define check_bin_rule_template
check-$(1):
	@which $(1) > /dev/null || { \
		echo 'fatal: install $(1)' ; \
		exit 1; \
	}
endef
$(foreach bin,$(check_bin_rules),$(eval $(call check_bin_rule_template,$(bin))))

$(MARKER_DIR)/terraform-init: .terraform.lock.hcl
	terraform init -reconfigure
	$(call touch-marker,terraform-init)

define POST_RULE
$(call post-html,$(1)): markdown/$(1).md
	@mkdir -p public/post
	cp before_post.html $$@
	cmark --unsafe $$< >> $$@
	cat after_post.html >> $$@
endef

$(foreach s,$(MD_STEMS),$(eval $(call POST_RULE,$(s))))

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
