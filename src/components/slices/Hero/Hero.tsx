// WHO CAN EDIT:
// Logo / Audio controls (line 41): Junior, Mid, Senior
// Other: Senior

import { PrismicRichText, PrismicText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from "./Hero.module.scss";
import { HeroProps } from "@/slices/Hero";
import VimeoBackground from "@/components/general/VimeoBackground/VimeoBackground";

const Hero = ({
                heading_1,
                background_image,
                background_video,
                background_video_from_media_library,
                video_ratio,
                details,
              }: HeroProps["slice"]["primary"]) => {
  return (
    <div className={styles.Holder}>
      <div className={styles.Inner}>
        <div className={styles.Title}>
            {isFilled.richText(heading_1) && <PrismicRichText field={heading_1} />}
        </div>
        <div className={styles.Media}>
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
          {isFilled.embed(background_video) &&
            !isFilled.linkToMedia(background_video_from_media_library) && (
              <VimeoBackground
                videoId={background_video.video_id as number}
                autoplay={true}
                zIndex={2}
                audioControls={false}
                aspectRatio={video_ratio || 16 / 9}
              />
            )}
          {isFilled.image(background_image) &&
            !isFilled.linkToMedia(background_video_from_media_library) &&
            !isFilled.embed(background_video) && (
              <PrismicNextImage field={background_image} fallbackAlt="" />
            )}
        </div>
        <div className={styles.Details}>
          {details && details.length > 0 && details.map((detail, index) => {
            if ( !isFilled.richText(detail.text) ) return null;
            return <PrismicRichText key={index} field={detail.text} />
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero;
