// WHO CAN EDIT: Senior

import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import styles from "./List.module.scss";
import { ListProps } from "@/slices/List";
import { PrismicRichText } from "@prismicio/react";
import classNames from "classnames";
import { bgNameToClass } from "@/utils/helpers";

const List = ({
                heading_2,
                list_items,
                cta,
                background_colour,
              }: ListProps["slice"]["primary"]) => {

  const InnerClasses = classNames(styles.Inner, bgNameToClass(background_colour), {
    [styles.InnerBg]: background_colour !== "Default",
  });
  const HolderClasses = classNames(styles.Holder,  {
    [styles.HasBg]: background_colour !== "Default",
  });
  return (
    <div className={HolderClasses}>
      <div className={InnerClasses}>
        <div className={styles.Content}>
          {isFilled.keyText(heading_2) && <div className={styles.Heading}>{heading_2}</div>}
          {list_items.length > 0 && (
            <div className={styles.List}>
              <ul>
                {list_items.map((item, index) => {
                  return (
                    <li key={index} className={styles.ListItem}>
                      <div className={styles.MainListContent}>
                        {isFilled.keyText(item.heading_3) && <h3>{item.heading_3}</h3>}
                        {isFilled.richText(item.text) && <PrismicRichText field={item.text} />}
                      </div>
                      <div className={styles.ExtraListContent}>
                        {isFilled.richText(item.extra_text) && <PrismicRichText field={item.extra_text} />}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {isFilled.link(cta) && (
            <PrismicNextLink field={cta} className="button" />
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
