import { Link } from "@remix-run/react";

export const PostCard: React.FC<{
  title: string;
  description: string;
  created: string;
  linkTo: string;
  extraClasses?: {
    container?: string;
  };
}> = ({ title, description, created, linkTo, extraClasses }) => (
  <Link to={linkTo}>
    <div
      className={`
      m-2
      max-w-prose
      rounded
      border-primary
      bg-clay-200
      p-4
      text-mineral-700
      shadow
      ${extraClasses?.container || ""}
   `}
    >
      <h3>{title}</h3>
      <p className="text-sm font-light">{created}</p>
      <p className="border-l-4 border-zinc-200 pl-2">{description}</p>
    </div>
  </Link>
);
