import { PropsWithChildren, MouseEventHandler } from "react";

export const SecondaryButton: React.FC<
  PropsWithChildren<{
    onClick?: MouseEventHandler<HTMLButtonElement>;
  }>
> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="
      bg-gradient-to-tr
      from-primary-200
      to-primary-100
      hover:from-primary-200
      hover:to-primary-300
      hover:font-bold
      transition
      text-mineral-600
      p-4
      rounded
      shadow"
  >
    {children}
  </button>
);

const BaseButton: React.FC<
  PropsWithChildren<{
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className: string;
  }>
> = ({ children, onClick, className }) => (
  <button
    className={`
      rounded
      shadow
      p-2
      m-2
      outline-none
      focus:ring-4
      bg-gray-200
      hover:bg-gray-300
      focus:bg-gray-300
      focus:ring-gray-500
      ${className}
    `}
    onClick={onClick}
  >
    {children}
  </button>
);

/**
 * Public button component api only recieves an onClick function and children.
 * Styling and DOM refs are not leaked.
 */
type ButtonComponent = React.FC<
  PropsWithChildren<{
    onClick?: MouseEventHandler<HTMLButtonElement>;
  }>
>;

export const DeleteButton: ButtonComponent = ({ children, onClick }) => (
  <BaseButton
    onClick={onClick}
    className="
      bg-red-200
      hover:bg-red-300
      focus:bg-red-300
      focus:ring-red-50
     "
  >
    {children}
  </BaseButton>
);

export const Button: ButtonComponent = ({ children, onClick }) => (
  <BaseButton
    onClick={onClick}
    className="
      bg-green-200
      hover:bg-green-300
      focus:bg-green-300
      focus:ring-green-50
    "
  >
    {children}
  </BaseButton>
);
