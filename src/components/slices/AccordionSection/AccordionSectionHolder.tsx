import Accordion from "@/components/general/Accordion/Accordion";
import styles from "./AccordionSectionHolder.module.scss";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { AccordionSectionProps } from "@/slices/AccordionSection";
import classNames from "classnames";
import { isFilled } from "@prismicio/client";
import { bgNameToClass } from "@/utils/helpers";

const AccordionSectionHolder = ({
                                  title,
                                  items,
                                  heading_2,
                                  background_colour,
                                }: AccordionSectionProps["slice"]["primary"]) => {
  const HolderClasses = classNames(styles.Holder, bgNameToClass(background_colour));
  return (
    <div className={HolderClasses}>
      <div className={styles.Inner}>
        <div className={styles.TextHolder}>
          {isFilled.richText(heading_2) &&
            <div className={styles.Subheading}><PrismicRichText field={heading_2} /></div>}
          {!isFilled.richText(heading_2) && isFilled.richText(title) &&
            <h2 className={styles.Title}><PrismicText field={title} /></h2>}
          {isFilled.richText(heading_2) && isFilled.richText(title) &&
            <p className={styles.Title}><PrismicText field={title} /></p>}
          <p>Description needs to be added to Prismic.</p>
        </div>
        <div className={styles.Items}>
          <Accordion items={items} />
        </div>
      </div>
    </div>
  );
};

export default AccordionSectionHolder;
