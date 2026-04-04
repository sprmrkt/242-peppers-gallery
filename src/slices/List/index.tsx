import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ListComponent from "@/components/slices/List/List";

/**
 * Props for `List`.
 */
export type ListProps = SliceComponentProps<Content.ListSlice>;

/**
 * Component for "List" Slices.
 */
const List: FC<ListProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ListComponent {...slice.primary} />
    </section>
  );
};

export default List;
