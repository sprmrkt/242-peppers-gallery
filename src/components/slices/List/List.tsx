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
                description,
                is_two_column,
                sub_heading,
              }: ListProps["slice"]["primary"]) => {

  const InnerClasses = classNames(styles.Inner, bgNameToClass(background_colour), {
    [styles.InnerBg]: background_colour !== "Default",
  });
  const HolderClasses = classNames(styles.Holder, {
    [styles.HasBg]: background_colour !== "Default",
    [styles.TwoColumn]: is_two_column,
  });
  return (
    <div className={HolderClasses}>
      <div className={InnerClasses}>
        {is_two_column && <div className={styles.ColumnOne}>
          {isFilled.keyText(heading_2) && <div className={styles.ColOneTitle}>{heading_2}</div>}
          {isFilled.richText(description) && <div className={styles.Description}><PrismicRichText field={description}/></div>}
          {Array.isArray(cta) && cta.length > 0 && isFilled.link(cta[0]) && (
            <div className={styles.CtaListHolder}>
              {cta.map(
                (link, index) =>
                  isFilled.link(link) && (
                    <PrismicNextLink
                      className={`${link.variant ?? ""} button`}
                      field={link}
                      key={index}
                    />
                  ),
              )}
            </div>
          )}
        </div>}
        <div className={styles.ListHolder}>
          {isFilled.keyText(heading_2) && !is_two_column && <div className={styles.Heading}>{heading_2}</div>}
          {isFilled.keyText(sub_heading) && is_two_column && <div className={styles.Heading}>{sub_heading}</div>}
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
          {Array.isArray(cta) && cta.length > 0 && !is_two_column && isFilled.link(cta[0]) && (
            <div className={styles.CtaListHolder}>
              {cta.map(
                (link, index) =>
                  isFilled.link(link) && (
                    <PrismicNextLink
                      className={`${link.variant ?? ""} button`}
                      field={link}
                      key={index}
                    />
                  ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
