import { PropsWithChildren } from "react";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

const AboutUsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      {children}
      &copy; Next JS is great!
    </div>
  );
};

export default AboutUsLayout;
