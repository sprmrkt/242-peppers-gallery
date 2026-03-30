import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import SimpleHeroComponent from "@/components/slices/SimpleHero/SimpleHero";

/**
 * Props for `SimpleHero`.
 */
export type SimpleHeroProps = SliceComponentProps<Content.SimpleHeroSlice>;

/**
 * Component for "SimpleHero" Slices.
 */
const SimpleHero = ({ slice }: SimpleHeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <SimpleHeroComponent {...slice.primary} />
    </section>
  );
};

export default SimpleHero;
