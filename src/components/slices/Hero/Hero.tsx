// WHO CAN EDIT:
// Logo / Audio controls (line 41): Junior, Mid, Senior
// Other: Senior

import { PrismicRichText, PrismicText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from "./Hero.module.scss";
import { HeroProps } from "@/slices/Hero";
import VimeoBackground from "@/components/general/VimeoBackground/VimeoBackground";
import classNames from "classnames";

const Hero = ({
                heading_1,
                background_image,
                background_video,
                background_video_from_media_library,
                video_ratio,
                details,
                inset_image,
                subheading,
                mobile_image,
                mobile_video,
                mobile_video_from_media_library,
              }: HeroProps["slice"]["primary"]) => {

  const mediaClasses = classNames(styles.Media, {
    [styles.IsInset]: inset_image,
  });
  const holderClasses = classNames(styles.Holder, {
    [styles.HasMobileMedia]: isFilled.image(mobile_image) || isFilled.embed(mobile_video) || isFilled.linkToMedia(mobile_video_from_media_library),
  });
  return (
    <div className={holderClasses}>
      <div className={styles.Inner}>
        <div className={styles.Titles}>
          {subheading && <p className={styles.SubHeading}>{subheading}</p>}
          {isFilled.richText(heading_1) && <PrismicRichText field={heading_1} />}
        </div>
        <div className={mediaClasses}>
          {isFilled.linkToMedia(background_video_from_media_library) && (
            <video
              className={styles.LibraryVideo}
              autoPlay
              loop
              muted
              playsInline
              poster={background_image?.url || undefined}
            >
              <source
                src={background_video_from_media_library?.url || undefined}
                type="video/mp4"
              />
            </video>
          )}
          {isFilled.linkToMedia(mobile_video_from_media_library) && (
            <video
              className={styles.LibraryVideoMobile}
              autoPlay
              loop
              muted
              playsInline
              poster={mobile_image?.url || undefined}
            >
              <source
                src={mobile_video_from_media_library?.url || undefined}
                type="video/mp4"
              />
            </video>
          )}
          {isFilled.embed(background_video) &&
            !isFilled.linkToMedia(background_video_from_media_library) && (
              <div className={styles.VimeoVideo}><VimeoBackground
                videoId={background_video.video_id as number}
                autoplay={true}
                zIndex={2}
                audioControls={false}
                aspectRatio={video_ratio || 16 / 9}
              /></div>
            )}
          {isFilled.embed(mobile_video) &&
            !isFilled.linkToMedia(mobile_video_from_media_library) && (
              <div className={styles.VimeoVideoMobile}><VimeoBackground
                videoId={mobile_video.video_id as number}
                autoplay={true}
                zIndex={2}
                audioControls={false}
                aspectRatio={video_ratio || 16 / 9}
              /></div>
            )}
          {isFilled.image(background_image) &&
            !isFilled.linkToMedia(background_video_from_media_library) &&
            !isFilled.embed(background_video) && (
              <PrismicNextImage className={styles.Image} field={background_image} fallbackAlt="" />
            )}
          {isFilled.image(mobile_image) &&
            !isFilled.linkToMedia(mobile_video_from_media_library) &&
            !isFilled.embed(mobile_video) && (
              <PrismicNextImage className={styles.ImageMobile} field={mobile_image} fallbackAlt="" />
            )}
        </div>
        {details && details.length > 0 && (
          <div className={styles.Details}>
            {details.map((detail, index) => {
              if (!isFilled.richText(detail.text)) return null;
              return <PrismicRichText key={index} field={detail.text} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
