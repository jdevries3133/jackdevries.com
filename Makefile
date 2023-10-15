SHELL=/bin/bash

DOCKER_ACCOUNT=jdevries3133
CONTAINER_NAME=jackdevries.com

TAG?=$(shell git describe --tags)
PREV_TAG=$(shell git describe --tags $(git rev-list --parents -n 1 HEAD) | tail -n 1)

# assuming the use of Docker hub, these constants need not be changed
CONTAINER=$(DOCKER_ACCOUNT)/$(CONTAINER_NAME):$(TAG)
export IMAGE=$(CONTAINER)


.PHONY: dev
dev:
	docker compose \
		-f docker-compose.yml \
		-f docker-compose.dev.yml \
		up -d --build



.PHONY: start
start:
	docker compose \
		-f docker-compose.yml \
		-f docker-compose.prod.yml \
		up --build -d


.PHONY: deploy
deploy:
ifdef CI
	terraform init -input=false
endif
	terraform apply -auto-approve


.PHONY: push
push:
ifdef CI
	# We need to specify the docker driver in CI
	docker buildx create --use
endif
	docker buildx build \
		--platform linux/amd64 \
		--cache-to type=registry,ref=$(DOCKER_ACCOUNT)/$(CONTAINER_NAME) \
		--cache-from type=registry,ref=$(DOCKER_ACCOUNT)/$(CONTAINER_NAME) \
		--push \
		-t $(CONTAINER) .


.PHONY: debug
debug:
	docker compose \
		-f docker-compose.yml \
		-f docker-compose.dev.yml \
		-f docker-compose.debug.yml \
		up -d --build


.PHONY: fmt
fmt:
	yarn fmt
	terraform fmt


.PHONY: check
check:
ifdef CI
	yarn install
	terraform init -backend=false -input=false
endif
	terraform fmt -check
	terraform validate
	yarn prettiercheck
	yarn typecheck
	yarn test run
