import { Link } from "@remix-run/react";

export const HeroSection = () => (
  <div
    className="
        text-clay-400 
        min-h-screen
        pb-6
        bg-mineral-600
        flex
        flex-col
        items-center
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
            text-primary-300
            text-2xl text-center
            flex-shrink
            lg:flex-shrink-0 lg:text-4xl
          "
      >
        Hello there!
      </h1>
      <div className="text-center">
        <a href="/blog">
          <span className="border border-primary-300 p-2 transition rounded inline text-primary-300 hover:text-secondary-700 hover:bg-clay-300">
            Read my Blog
          </span>
        </a>
      </div>
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
          <img className="rounded-full" src="/static/me@400px.jpg" />
        </div>
      </div>
    </div>

    {/* tech icons */}
    <div
      className="
        flex-shrink
        max-w-lg
        m-2
        p-2
        bg-coffee
        border-2
        border-primary-200
        lg:flex-shrink-0
        lg:col-span-3
        lg:m-4
        lg:p-4
        lg:rounded
      "
    >
      <h2 className="text-center text-primary-400 text-xl pb-2">My Toolbox</h2>
      <div
        className="
              grid
              grid-cols-4
              mx-3
              gap-4
              items-center
              justify-items-center
            "
      >
        {/* react */}
        <a href="https://reactjs.org/">
          <div data-tooltip="React" className="tooltip">
            <img alt="react.js icon" src="/static/react.webp" />
          </div>
        </a>
        <a href="https://www.djangoproject.com/" className="col-span-2">
          {/* django */}
          <div data-tooltip="Django" className="tooltip">
            <img alt="django icon" src="/static/django.svg" />
          </div>
        </a>
        {/* javascript */}
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
          <div data-tooltip="Javascript" className="tooltip">
            <img
              className="rounded-md"
              alt="javascript icon"
              src="/static/js.webp"
            />
          </div>
        </a>
        {/* tailwind */}
        <a href="https://tailwindcss.com/" className="col-span-2">
          <div
            data-tooltip="Tailwind CSS"
            className="tooltip-wide tooltip flex items-center"
          >
            <img
              alt="Tailwind CSS icon"
              src="/static/tailwind.svg"
              className="w-full h-full"
            />
          </div>
        </a>
        {/* git */}
        <a href="https://git-scm.com/">
          <div
            data-tooltip="Git"
            className="tooltip p-2 flex items-center bg-clay-100 rounded-md"
          >
            <img alt="git icon" src="/static/git.webp" />
          </div>
        </a>
        {/* PostgreSQL */}
        <a href="https://www.postgresql.org/">
          <div data-tooltip="PostgreSQL" className="tooltip-left-0 tooltip">
            <img alt="postgreSQL icon" src="/static/psql.webp" />
          </div>
        </a>
        {/* python */}
        <a href="https://www.python.org/" className="col-span-2">
          <div data-tooltip="Python" className="tooltip-wide tooltip ">
            <img alt="python icon" src="/static/python.svg" />
          </div>
        </a>
        {/* typescript */}
        <a href="https://www.typescriptlang.org/">
          <div data-tooltip="Typescript" className="tooltip-left-0 tooltip">
            <img
              className="rounded-md"
              alt="typescript icon"
              src="/static/ts.webp"
            />
          </div>
        </a>
        {/* Docker */}
        <a href="https://www.docker.com/">
          <div data-tooltip="Docker" className="tooltip-left-0 tooltip">
            <img alt="docker logo" src="/static/docker.webp" />
          </div>
        </a>
        {/* Kubernetes */}
        <a href="https://kubernetes.io/">
          <div data-tooltip="Kubernetes" className="tooltip-left-0 tooltip">
            <img alt="kubernetes logo" src="/static/kubernetes.webp" />
          </div>
        </a>
        {/* Terraform */}
        <a href="https://www.terraform.io/">
          <div data-tooltip="Terraform" className="tooltip">
            <img alt="terraform logo" src="/static/terraform.webp" />
          </div>
        </a>
        {/* Rust */}
        <a href="https://www.rust-lang.org/">
          <div data-tooltip="Rust" className="tooltip">
            <img
              alt="rust logo (the free crab, not the cursed and litigious R)"
              src="/static/rust.webp"
            />
          </div>
        </a>
        {/* RabbitMQ */}
        <a href="https://www.rabbitmq.com/">
          <div data-tooltip="RabbitMQ" className="tooltip">
            <img alt="RabbitMQ" src="/static/rmq.svg" />
          </div>
        </a>
      </div>
    </div>
  </div>
);
