import { useState } from "react";

// I'll show the source code for the card on this page as a little fun treat
const source = `
<!--
  Thanks for visiting!
  Here's my business card :)
-->
<div
  class="p-2 aspect-[3/2] bg-mineral-600 max-w-[400px] rounded-xl text-clay-400"
>
  <h1 class="py-3 text-primary-300 text-2xl text-center flex-shrink">
    Hello there!
  </h1>
  <div class="flex items-center px-6 gap-4">
    <div class="text-right">
      <h3 class="text-md sm:text-3xl">Jack DeVries</h3>
      <h4 class="text-sm sm:text-base">Web &amp; Software Developer</h4>
    </div>
    <div class="w-24 p-2 bg-primary-100 rounded-full shadow">
      <img class="rounded-full" src="/static/me.webp" />
    </div>
  </div>
  <div class="border-2 border-primary-100 p-2 rounded-xl my-2">
    <p class="text-xs"><b>Email:</b> jdevries3133@gmail.com</p>
    <p class="text-xs"><b>GitHub:</b> github.com/jdevries3133</p>
    <p class="text-xs">
      <b>LinkedIn:</b> linkedin.com/in/jack-devrieswq/<span
        class="block sm:inline ml-4 text-[0.5rem] italic"
        >(yes, that's a vim joke)</span
      >
    </p>
  </div>
</div>
`;

export default function BusinessCardPage() {
  const [viewOpt, setViewOpt] = useState<"source" | "card">("source");
  return (
    <div className="md:grid md:grid-cols-2 gap-4 items-center justify-center">
      <div className="flex flex-col gap-4 p-2 bg-secondary-700 min-h-[100vh] min-w-[100vw]">
        <a href="/blog">
          <button className="border border-primary-300 p-2 transition rounded inline text-primary-300 hover:text-secondary-700 hover:bg-clay-300">
            Read my Blog
          </button>
        </a>
        <a href="/">
          <button className="border border-primary-300 p-2 transition rounded inline text-primary-300 hover:text-secondary-700 hover:bg-clay-300">
            Visit the Homepage
          </button>
        </a>
        <div>
          <button
            onClick={() => {
              if (viewOpt === "card") {
                setViewOpt("source");
              } else {
                setViewOpt("card");
              }
            }}
            className="border border-primary-300 p-2 transition rounded inline text-primary-300 hover:text-secondary-700 hover:bg-clay-300"
          >
            View {viewOpt === "card" ? "Source" : "Card"}
          </button>
        </div>
        {viewOpt === "card" && (
          <div className="p-2 aspect-[3/2] bg-mineral-600 max-w-[400px] rounded-xl text-clay-400">
            <h1 className="py-3 text-primary-300 text-2xl text-center flex-shrink">
              Hello there!
            </h1>
            <div className="flex items-center px-6 gap-4">
              <div className="text-right">
                <h3 className="text-md sm:text-3xl">Jack DeVries</h3>
                <h4 className="text-sm sm:text-base">
                  Web & Software Developer
                </h4>
              </div>
              <div className="w-24 p-2 bg-primary-100 rounded-full shadow">
                <img className="rounded-full" src="/static/me.webp" />
              </div>
            </div>
            <div className="border-2 border-primary-100 p-2 rounded-xl my-2">
              <p className="text-xs">
                <b>Email:</b> jdevries3133@gmail.com
              </p>
              <p className="text-xs">
                <b>GitHub:</b> github.com/jdevries3133
              </p>
              <p className="text-xs">
                <b>LinkedIn:</b> linkedin.com/in/jack-devrieswq/
                <span className="block sm:inline ml-4 text-[0.5rem] italic">
                  (yes, that's a vim joke)
                </span>
              </p>
            </div>
          </div>
        )}
        {viewOpt === "source" && (
          <pre className="p-2 rounded-xl bg-gray-100 row-span-2 text-xs overflow-y-scroll">
            {source}
          </pre>
        )}
      </div>
    </div>
  );
}
