// WHO CAN EDIT: Senior

import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import styles from "./Text.module.scss";
import { TextProps } from "@/slices/Text";
import { bgNameToClass, convertToId } from "@/utils/helpers";
import { PrismicNextLink } from "@prismicio/next";
import classNames from "classnames";

const background = "default"; // Set color-variation class here
const innerBackground = null; // Set color-variation class here

const Text = ({
  text,
  anchor_link_id,
  cta,
  heading_2,
  background_color
}: TextProps["slice"]["primary"]) => {
  const InnerClasses = classNames(styles.Inner, bgNameToClass(background_color), {
    [styles.InnerBg]: background_color !== "Default",
  });
  const TextHolderClasses = classNames(
    styles.TextHolder,
    "rich-text"
  );
  const HolderClasses = classNames(styles.Holder,  {
    [styles.HasBg]: background_color !== "Default",
  });
  return (
    <>
      {isFilled.richText(text) && (
        <div
          className={HolderClasses}
          id={anchor_link_id ? convertToId(anchor_link_id) : ""}
        >
          <div className={InnerClasses}>
            <div className={TextHolderClasses}>
              {isFilled.richText(heading_2) && (
                <div className={styles.Heading}>
                  <PrismicRichText field={heading_2} />
                </div>
              )}
              <PrismicRichText field={text} />
              {Array.isArray(cta) &&
                cta.length > 0 &&
                isFilled.link(cta[0]) && (
                  <div className={styles.LinkListHolder}>
                    {cta.map(
                      (link, index) =>
                        isFilled.link(link) && (
                          <PrismicNextLink
                            className={`${link.variant ?? ""} button`}
                            field={link}
                            key={index}
                          />
                        )
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Text;
