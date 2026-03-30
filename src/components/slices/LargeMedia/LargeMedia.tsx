// WHO CAN EDIT: Senior

import styles from "./LargeMedia.module.scss";
import { LargeMediaProps } from "@/slices/LargeMedia";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import ResponsiveVimeo from "@/components/general/ResponsiveVimeo/ResponsiveVimeo";
import classNames from "classnames";
import { bgNameToClass } from "@/utils/helpers";

const LargeMedia = ({
  image,
  video,
  caption,
  cropped,
  mobile_image,
  background_colour,
  no_padding
}: LargeMediaProps["slice"]["primary"]) => {
  if (!isFilled.image(image) && !isFilled.embed(video)) return null;

  const imageHolderClasses = classNames(styles.ImageHolder, {
    [styles.Cropped]: cropped,
    [styles.DesktopOnly]: isFilled.image(mobile_image),
  });

  const mobileImageHolderClasses = classNames(styles.ImageHolder, {
    [styles.Cropped]: cropped,
    [styles.MobileOnly]: !isFilled.embed(video) && isFilled.image(mobile_image),
  });
  const HolderClasses = classNames(styles.Holder, bgNameToClass(background_colour), {
    [styles.NoPadding]: no_padding,
  });

  return (
    <div className={HolderClasses}>
      <div className={styles.Inner}>
        {!isFilled.embed(video) && (
          <div className={imageHolderClasses}>
            <PrismicNextImage field={image} fallbackAlt="" />
          </div>
        )}
        {!isFilled.embed(video) && isFilled.image(mobile_image) && (
          <div className={mobileImageHolderClasses}>
            <PrismicNextImage field={mobile_image} fallbackAlt="" />
          </div>
        )}
        {isFilled.embed(video) && (
          <ResponsiveVimeo
            videoId={video.video_id as number}
            autoplay
            audioControls={false}
          />
        )}
        {caption && (
          <div className={styles.Caption}>
            <p>{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LargeMedia;
