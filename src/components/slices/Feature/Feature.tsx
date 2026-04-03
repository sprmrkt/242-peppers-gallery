// WHO CAN EDIT: Senior

import { isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from "./Feature.module.scss";
import { FeatureProps } from "@/slices/Feature";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import VimeoBackground from "@/components/general/VimeoBackground/VimeoBackground";
import classNames from "classnames";
import { bgNameToClass } from "@/utils/helpers";

const Feature = ({
                   text,
                   image,
                   video,
                   video_ratio,
                   link,
                   heading_2,
                   background_colour,
                   no_padding,
                   image_position,
                   list,
                   list_title,
                 }: FeatureProps["slice"]["primary"]) => {
  const HolderClasses = classNames(styles.Holder, bgNameToClass(background_colour), {
    [styles.NoPadding]: no_padding,
    [styles.ImageRight]: image_position === "Right",
    [styles.ImageLeft]: image_position === "Left",
  });
  return (
    <div className={HolderClasses}>
      <div className={styles.Inner}>

        {isFilled.richText(heading_2) && <div className={styles.Heading}>
          <div className={styles.Subheading}><PrismicRichText field={heading_2} /></div>
        </div>}

        <div className={styles.Content}>
          {isFilled.richText(text) && (
            <div className={styles.Text}>
              <PrismicRichText field={text} />
            </div>
          )}
          {isFilled.link(link) && (
            <PrismicNextLink field={link} className="button" />
          )}
          {list.length > 0 && (
            <div className={styles.List}>
              {isFilled.keyText(list_title) && <h3>{list_title}</h3>}
              <ul>
                {list.map((item, index) => {
                  if (!isFilled.richText(item.list_item)) return null;
                  return (
                    <li key={index}><PrismicRichText field={item.list_item} /></li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <div className={styles.Image}>
          <div className={styles.ImageInner}>
            {!isFilled.embed(video) && (
              <PrismicNextImage field={image} fallbackAlt="" />
            )}
            {isFilled.embed(video) && (
              <VimeoBackground
                videoId={video.video_id as number}
                autoplay={true}
                aspectRatio={video_ratio || 16 / 9}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
