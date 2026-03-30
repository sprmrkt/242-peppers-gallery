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
                   title,
                   text,
                   image,
                   video,
                   video_ratio,
                   link,
                   heading_2,
                   background_colour,
                   no_padding,
                   is_hero,
                   image_position,
                 }: FeatureProps["slice"]["primary"]) => {
  const HolderClasses = classNames(styles.Holder, bgNameToClass(background_colour), {
    [styles.NoPadding]: no_padding,
    [styles.IsHero]: is_hero,
    [styles.ImageRight]: image_position === "Right",
    [styles.ImageLeft]: image_position === "Left",
  });
  return (
    <div className={HolderClasses}>
      <div className={styles.Inner}>
        <div className={styles.Content}>

          {!is_hero && <>
            {isFilled.richText(heading_2) &&
              <div className={styles.Subheading}><PrismicRichText field={heading_2} /></div>}
            {!isFilled.richText(heading_2) && isFilled.keyText(title) && <h2 className={styles.Title}>{title}</h2>}
          </>}

          {is_hero && <>
            {isFilled.richText(heading_2) &&
              <div className={styles.Subheading}><h1><PrismicText field={heading_2} /></h1></div>}
            {!isFilled.richText(heading_2) && isFilled.keyText(title) && <h1 className={styles.Title}>{title}</h1>}
          </>}

          {isFilled.richText(heading_2) && isFilled.keyText(title) && <p className={styles.Title}>{title}</p>}

          {isFilled.richText(text) && (
            <div className={styles.Text}>
              <PrismicRichText field={text} />
            </div>
          )}
          {isFilled.link(link) && (
            <PrismicNextLink field={link} className="button" />
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
