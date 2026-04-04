// WHO CAN EDIT:
// Link href: Junior
// Duplicate and use for another instance: Mid
// Adding search highlighting for a search hit instance: Mid
// Structure: Senior
"use client";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from "./Card.module.scss";
import {
  ContentListSliceDefaultPrimaryContentItem,
} from "../../../../prismicio-types";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

interface PrismicCardProps {
  item: ContentListSliceDefaultPrimaryContentItem;
}

const hasBg = false;

const PrismicCard: React.FC<PrismicCardProps> = ({ item }) => {
  const [showFallback, setShowFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.log("Autoplay was prevented by the browser.");
        // Autoplay was blocked, show fallback image
        setShowFallback(true);
      });
    } else {
      console.log("Autoplay was allowed by the browser.");
      setShowFallback(false);
    }
  }, []);

  const contentField = item.room;
  // --------------
  // Below is an example of how to handle when the content list has more than one page type available (ie. you add POST to it)
  // const contentField = isFilled.contentRelationship(item.post) ? item.post : item.room;
  // --------------
  if (!isFilled.contentRelationship(contentField)) {
    return null;
  }
  const { title, preview_image, preview_video, video_poster_image, beds, guests, bath, type } = contentField.data as any;

  const HolderClasses = classNames(styles.Holder, `is-${type.toLowerCase()}`, {
    [styles.HasBg]: hasBg,
  });

  return (
    <PrismicNextLink field={contentField} className={HolderClasses}>
      <div className={styles.Inner}>
        <div className={styles.Image}>
          {isFilled.linkToMedia(preview_video) && !showFallback && (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              poster={video_poster_image?.url || undefined}
            >
              <source
                src={preview_video?.url || undefined}
                type="video/mp4"
              />
            </video>
          )}
          {isFilled.image(video_poster_image) && showFallback && (
            <PrismicNextImage
              className={styles.VideoFallbackImage}
              field={video_poster_image}
              loading="lazy"
              priority={false}
              fallbackAlt=""
            />
          )}
          {isFilled.image(preview_image) && !isFilled.linkToMedia(preview_video) && (
            <PrismicNextImage
              className={styles.StandardImage}
              field={preview_image}
              loading="lazy"
              priority={false}
              fallbackAlt=""
            />
          )}
        </div>
        {(isFilled.keyText(title) && (
          <div className={styles.Content}>
            {isFilled.keyText(title) && (
              <h3 className={styles.Title}>{title}</h3>
            )}
            <div className={styles.Details}>
              <div className={styles.Detail}>
                <p>Bed</p>
                {isFilled.keyText(beds) && <p>{beds}</p>}
              </div>
              <div className={styles.Detail}>
                <p>Guests</p>
                {isFilled.keyText(guests) && <p>{guests}</p>}
              </div>
              <div className={styles.Detail}>
                <p>Bathroom</p>
                {isFilled.keyText(bath) && <p>{bath}</p>}
              </div>
            </div>
          </div>
        ))}
        <p className="button">More Info</p>
      </div>
    </PrismicNextLink>
  );
};

export default PrismicCard;
