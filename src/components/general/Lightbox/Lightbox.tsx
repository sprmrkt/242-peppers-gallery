"use client";
import styles from "./Lightbox.module.scss";
import OpenImage from "@/assets/icons/OpenImage";
import React from "react";
import Cross from "@/assets/icons/CloseIcon";
import { PrismicNextImage } from "@prismicio/next";
import { isFilled } from "@prismicio/client";
import type {
  EmbedField,
  ImageField,
  LinkToMediaField,
} from "@prismicio/client";
// import ResponsiveVimeo from "../ResponsiveVimeo/ResponsiveVimeo";
import VimeoBackground from "../VimeoBackground/VimeoBackground";
import ResponsiveVimeo from "@/components/general/ResponsiveVimeo/ResponsiveVimeo";

const Lightbox = ({
  children,
  image = null,
  video = null,
  poster_image = null,
  vimeo_video = null,
}: {
  children: React.ReactNode;
  image?: ImageField | null;
  video?: LinkToMediaField | null;
  poster_image?: ImageField | null;
  vimeo_video?: EmbedField | null;
}) => {
  const [showLightbox, setShowLightbox] = React.useState(false);

  return (
    <>
      <div className={styles.InitialMedia}>
        {children}
        <button
          className={styles.OpenButton}
          onClick={() => setShowLightbox(true)}
        >
          <OpenImage />
        </button>
      </div>
      {showLightbox && (
        <div className={styles.OverlayHolder}>
          <button
            onClick={() => setShowLightbox(false)}
            className={`${styles.CloseButton} button strip-styles`}
          >
            <Cross />
          </button>
          <div className={styles.Inner}>
            <div className={styles.OverlayImageHolder}>
              {!vimeo_video && children}
              {vimeo_video && (
                <ResponsiveVimeo
                  videoId={vimeo_video.video_id as number}
                  autoplay={false}
                  background={false}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Lightbox;
