import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import HeroComponent from "@/components/slices/Hero/Hero";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <HeroComponent {...slice.primary} />
    </section>
  );
};

export default Hero;
