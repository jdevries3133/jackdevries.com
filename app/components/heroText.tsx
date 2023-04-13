import type { ReactNode } from "react";

export const HeroText = ({ children }: { children: ReactNode }) => (
  <h2
    className="
    font-extrabold
    text-transparent
    text-3xl
    bg-clip-text
    bg-gradient-to-tr
    from-red-600
    to-secondary-600
    rounded
    "
  >
    {children}
  </h2>
);

/**
 * Background for the above hero text, if desired
 */
export const HeroBg = ({ children }: { children: ReactNode }) => (
  <div
    className="
      hover:bg-red-100
      hover:shadow-none
      transition
      rounded
      m-2
      p-2
      bg-yellow-100
      shadow
    "
  >
    {children}
  </div>
);
