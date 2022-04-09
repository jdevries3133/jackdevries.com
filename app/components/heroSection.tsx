export const HeroSection = () => (
  <div
    className="
        min-h-screen
        pb-6
        bg-mineral-600
        flex flex-col
        lg:flex-row lg:gap-12 lg:justify-center
      "
  >
    {/* name and greeting */}
    <div
      className="
          flex flex-col flex-grow
          lg:flex-grow-0 lg:justify-center lg:gap-6
        "
    >
      <h1
        className="
            py-3
            text-2xl text-center
            flex-shrink
            lg:flex-shrink-0 lg:text-4xl
          "
      >
        Hello there!
      </h1>
      <div
        className="
            flex flex-row flex-grow
            lg:flex-grow-0
            justify-center
            items-center
          "
      >
        <div className="px-6 text-right">
          <h3 className="text-sm sm:text-3xl">Jack DeVries</h3>
          <h4 className="text-sm sm:text-base">Web & Software Developer</h4>
        </div>
        <div className="w-24 lg:w-48 p-2 bg-primary-100 rounded-full shadow">
          <img className="rounded-full" src="./static/me@400px.jpg" />
        </div>
      </div>
    </div>

    {/* tech icons */}
    <div className="flex items-center">
      <div
        className="
            flex-shrink
            lg:flex-shrink-0
            max-w-lg
            m-auto
            lg:col-span-3
            lg:bg-coffee
            lg:border-2
            lg:border-primary-200
            lg:m-4
            lg:p-4
            lg:rounded
          "
      >
        <h2 className="text-center text-xl pb-2">My Toolbox</h2>
        <div
          className="
              grid grid-cols-3
              mx-3
              gap-2
              items-center
              justify-items-center
            "
        >
          {/* react */}
          <div data-tooltip="React" className="tooltip">
            <img alt="react.js icon" src="./static/react.webp" />
          </div>
          {/* redux */}
          <div data-tooltip="Redux" className="tooltip">
            <img
              className="w-full h-full"
              alt="redux icon"
              src="./static/redux.svg"
            />
          </div>
          {/* django */}
          <div data-tooltip="Django" className="tooltip">
            <img alt="django icon" src="./static/django.svg" />
          </div>
          {/* django REST framework */}
          <div
            data-tooltip="Django REST Framework"
            className="tooltip-drf tooltip"
          >
            <img
              className="rounded-md"
              alt="django REST framework icon"
              src="./static/drf.webp"
            />
          </div>
          {/* tailwind */}
          <div
            data-tooltip="Tailwind CSS"
            className="tooltip-wide tooltip flex items-center col-span-2"
          >
            <img
              alt="Tailwind CSS icon"
              src="./static/tailwind.svg"
              className="w-full h-full"
            />
          </div>
          {/* javascript */}
          <div data-tooltip="Javascript" className="tooltip">
            <img
              className="rounded-md"
              alt="javascript icon"
              src="./static/js.webp"
            />
          </div>
          {/* git */}
          <div
            data-tooltip="Git"
            className="tooltip p-2 flex items-center bg-clay-100 rounded-md"
          >
            <img alt="git icon" src="./static/git.webp" />
          </div>
          {/* typescript */}
          <div data-tooltip="Typescript" className="tooltip-left-0 tooltip">
            <img
              className="rounded-md"
              alt="typescript icon"
              src="./static/ts.webp"
            />
          </div>
          {/* python */}
          <div
            data-tooltip="Python"
            className="tooltip-wide tooltip col-span-2"
          >
            <img alt="python icon" src="./static/python.svg" />
          </div>
          {/* PostgreSQL */}
          <div data-tooltip="PostgreSQL" className="tooltip-left-0 tooltip">
            <img alt="postgreSQL icon" src="./static/psql.webp" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
