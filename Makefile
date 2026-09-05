content: $(patsubst markdown/%.md,public/post/%.html,$(wildcard markdown/*.md))

clean:
	rm -rf public/post

public/post/%.html: markdown/%.md
	mkdir -p public/post
	cp before_post.html $@
	cmark --unsafe $< >> $@
	cat after_post.html >> $@

serve: content
	python3 -m http.server --directory public

release: content
	docker buildx build -t tmp .

run-container: release
	docker rm -f tmp
	docker run --name tmp -p 80:80 -d tmp
