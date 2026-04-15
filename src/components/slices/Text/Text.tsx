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
                background_color,
                is_centered,
                detail_1,
                detail_2,
              }: TextProps["slice"]["primary"]) => {
  const InnerClasses = classNames(styles.Inner, bgNameToClass(background_color), {
    [styles.InnerBg]: background_color !== "Default",
    [styles.Centered]: is_centered,
    [styles.HasDetails]: isFilled.keyText(detail_1) || isFilled.keyText(detail_2),
  });
  const TextHolderClasses = classNames(
    styles.TextHolder,
    "rich-text",
  );
  const HolderClasses = classNames(styles.Holder, {
    [styles.HasBg]: background_color !== "Default",
  });

  return (
    <>
      {(isFilled.richText(text) || isFilled.richText(heading_2)) && (
        <div
          className={HolderClasses}
          id={anchor_link_id ? convertToId(anchor_link_id) : ""}
        >
          <div className={InnerClasses}>
            {(isFilled.keyText(detail_1) || isFilled.keyText(detail_2)) && <div className={styles.Details}>
              {isFilled.keyText(detail_1) && <p>{detail_1}</p>}
              {isFilled.keyText(detail_2) && <p>{detail_2}</p>}
            </div>}
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
                        ),
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
