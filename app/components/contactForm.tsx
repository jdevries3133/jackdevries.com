import { PrimaryButton } from "./buttons";

export const ContactForm = () => {
  return (
    <a href="mailto:jdevries3133@gmail.com">
      <PrimaryButton data-testid="contactMeFormOpener">
        Contact Me (jdevries3133@gmail.com)
      </PrimaryButton>
    </a>
  );
};
