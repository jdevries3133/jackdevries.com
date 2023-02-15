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
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d


.PHONY: deploy
deploy:
ifdef CI
	terraform init -input=false
endif
	terraform apply -auto-approve


.PHONY: push
push:
	docker buildx build --pull --platform linux/amd64 --push -t $(CONTAINER) .


.PHONY: debug
debug:
	docker compose \
		-f docker-compose.yml \
		-f docker-compose.dev.yml \
		-f docker-compose.debug.yml \
		up -d --build


.PHONY: fmt
fmt:
	yarn format
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
ifdef CI
	docker compose pull
	docker compose up -d
endif
	make wait
	yarn cypress


.PHONY: wait
wait:
	@# wait for the app to startup in docker-compose, as indicated by it
	@# providing a response on `localhost:8000`.
	@while true; do \
		curl --silent --output /dev/null http://localhost:8000; \
		[ $$? == 0 ] && break; \
		sleep 5; \
		echo "awaiting server readiness"; \
		docker-compose logs; \
	done
