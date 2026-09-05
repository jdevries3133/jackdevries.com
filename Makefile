content: $(patsubst markdown/%.md,public/post/%.html,$(wildcard markdown/*.md))

clean:
	rm -rf public/post

public/post/%.html: markdown/%.md
	mkdir -p public/post
	cmark --unsafe $< > $@

serve: content
	python3 -m http.server --directory public
