// WHO CAN EDIT: Senior

import { PrismicRichText, PrismicText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import styles from "./SimpleHero.module.scss";
import { SimpleHeroProps } from "@/slices/SimpleHero";
import classNames from "classnames";
import { bgNameToClass } from "@/utils/helpers";
import { PrismicNextImage } from "@prismicio/next";

const SimpleHero = ({
                      text,
                      title,
                      heading_1,
                      background_colour,
                      image,
                    }: SimpleHeroProps["slice"]["primary"]) => {
  const HolderClasses = classNames(styles.Holder, bgNameToClass(background_colour), {
    [styles.HasImage]: isFilled.image(image),
  });
  return (
    <div className={HolderClasses}>
      <div className={styles.Inner}>
        <div className={styles.Text}>
          <div className={styles.Headings}>
            {isFilled.richText(heading_1) &&
              <div className={styles.Subheading}><PrismicRichText field={heading_1} /></div>}
            {!isFilled.richText(heading_1) && isFilled.richText(title) &&
              <h1 className={styles.Title}><PrismicText field={title} /></h1>}
            {isFilled.richText(heading_1) && isFilled.richText(title) &&
              <p className={styles.Title}><PrismicText field={title} /></p>}
          </div>
          <div className={styles.Description}>
            {isFilled.richText(text) && <PrismicRichText field={text} />}
          </div>
        </div>
        {isFilled.image(image) && <div className={styles.ImageHolder}>
          <PrismicNextImage field={image} fallbackAlt="" />
        </div>}
      </div>
    </div>
  );
};

export default SimpleHero;
