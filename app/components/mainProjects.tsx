export const MainProjects: React.FC = () => (
  <div className="py-6 bg-secondary-700">
    <h1 className="text-primary-400 text-center">Projects</h1>
    <div
      className="
          lg:grid lg:grid-cols-3 lg:items-start
          m-auto
          container
          flex flex-col
          items-center
          p-4
          gap-4
        "
    >
      {/* begin fast grader card */}
      <div className="prose bg-clay-100 w-full rounded-md">
        <div>
          <div className="rounded-t-md sticky p-2 bg-clay-400 top-0 shadow-xl">
            <div className="rounded-b-md">
              <h3 className="text-mineral inline xl:text-3xl">Notion Clone</h3>{" "}
            </div>
            <video
              muted
              controls
              loop
              aria-label="demo video"
              autoPlay
              className="border-2 border-mineral-700 border-opacity-50"
            >
              <source src="./static/nc.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="px-3 sm:text-justify text-gray-600">
            I made a dynamic data-table inspired by Notion, using Rust
            (Axum web), HTMX, and PostgreSQL.
          </p>
        </div>

        <div className="py-3 flex flex-row justify-center gap-10">
          <a
            href="https://github.com/jdevries3133/nc"
            rel="noopener noreferrer"
            target="_blank"
          >
            <button
              className="
                  bg-secondary-300
                  transition
                  text-xl text-mineral text-bold
                  hover:bg-secondary-400
                  rounded
                  p-1
                  shadow-md
                  hover:shadow-none
                "
            >
              View on GitHub
            </button>
          </a>
        </div>
      </div>
      {/* end fast grader card */}
      {/* begin song maker card */}
      <div className="prose bg-clay-100 w-full rounded-md">
        <div>
          <div className="rounded-t-md sticky p-2 bg-clay-400 top-0 shadow-xl">
            <div className="rounded-b-md">
              {/* I don't know why this needs m-0 but it does... */}
              <h3 className="m-0 xl:text-3xl text-mineral">
                Song Maker Gallery
              </h3>
            </div>
            <video
              muted
              controls
              loop
              aria-label="demo video"
              autoPlay
              className="border-2 border-mineral-700 border-opacity-50"
            >
              <source src="./static/songmaker.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="px-3 sm:text-justify text-gray-600">
            The Song Maker Gallery is a dynamic web application used by music
            teachers to present galleries of student compositions made in the{" "}
            <a href="https://musiclab.chromeexperiments.com/Song-Maker/">
              Chrome Music Lab.
            </a>
          </p>
          <p className="px-3 sm:text-justify text-gray-600">
            It currently has 708 active users, 729 galleries created, and over
            34,000 student songs uploaded! It was built with{" "}
            <a href="https://www.djangoproject.com/">Django</a>,{" "}
            <a href="https://www.django-rest-framework.org/">
              Django REST Framework
            </a>
            , and <a href="https://www.postgresql.org/">PostgreSQL</a> on the
            backend, and <a href="https://reactjs.org/">React</a> on the
            frontend.
          </p>
          <p className="px-3 sm:text-justify text-gray-600">
            Visit the site and inspect the song thumbnails in your browser –
            they are all dynamically generated SVG on the frontend, with the
            backend serving representations of the song in the MIDI file format!
            The application uses roughly 20 times less storage and bandwith as a
            result of this optimization.
          </p>
        </div>
        <div className="py-3 flex flex-row justify-center gap-10">
          <a
            href="https://github.com/jdevries3133/song_maker_gallery"
            rel="noopener noreferrer"
            target="_blank"
          >
            <button
              className="
                  bg-secondary-300
                  transition
                  text-xl text-mineral text-bold
                  hover:bg-secondary-400
                  rounded
                  p-1
                  shadow-md
                  hover:shadow-none
                "
            >
              View on GitHub
            </button>
          </a>
        </div>
      </div>
      {/* end songmaker card */}
      {/* end open source card */}
      <div className="prose bg-clay-100 w-full rounded-md">
        <div>
          <div className="rounded-t-md sticky p-2 bg-clay-400 top-0 shadow-xl">
            <div className="rounded-b-md">
              <h3 className="xl:text-3xl inline text-mineral">cpython</h3>{" "}
              <h4 className="inline font-light text-mineral inline">
                Open Source Contributing
              </h4>
            </div>
            <video
              muted
              controls
              loop
              aria-label="demo video"
              autoPlay
              className="border-2 border-mineral-700 border-opacity-50"
            >
              <source src="./static/py_contrib.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="px-3 sm:text-justify text-gray-600">
            In June, July, and August of 2021, I committed myself to
            contributing to{" "}
            <a href="https://github.com/python/cpython">CPython</a> full-time.
            CPython is the reference implementation and most commonly used
            implementation of the Python programming language, and it contains
            the Python interpreter, standard library, and official
            documentation.
          </p>
          <p className="px-3 sm:text-justify text-gray-600">
            Many of my contributions were towards documentation, the most
            significant of which was my rewrite of the new documentation for{" "}
            <a href="https://docs.python.org/3/library/__main__.html">
              <span className="font-mono">__main__.</span>
            </a>{" "}
          </p>
          <p className="px-3 sm:text-justify text-gray-600">
            Eventually, I became more familiar with the huge CPython codebase,
            and I am extremely proud to say that my code contributions were
            eventually merged into Python standard library modules, including{" "}
            <code>rlcompleter</code>, <code>tarfile</code>, and{" "}
            <code>argparse</code>. I also wrote an interpreter patch in{" "}
            <code>C</code>, which became part of the implementation of the{" "}
            <a href="https://docs.python.org/3/whatsnew/3.10.html#pep-634-structural-pattern-matching">
              structural pattern matching feature
            </a>{" "}
            introduced in Python 3.10.
          </p>
        </div>
        <div className="py-3 flex flex-row justify-center gap-10">
          <a
            href="https://github.com/python/cpython/commits/main?author=jdevries3133"
            rel="noopener noreferrer"
            target="_blank"
          >
            <button
              className="
                  text-xl
                  bg-primary-300
                  rounded
                  p-2
                  text-mineral text-bold
                  hover:bg-primary-400
                  transition
                  shadow-md
                  hover:shadow-none
                "
            >
              <p className="p-0 text-mineral text-bold text-xl">
                View My Contributions
              </p>
              <p className="p-0 m-0 text-sm text-mineral">on GitHub</p>
            </button>
          </a>
        </div>
      </div>
      {/* end open source card */}
    </div>
  </div>
);
