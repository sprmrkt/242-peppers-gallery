import React from 'react';
import { ImageField, isFilled, LinkField, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from './ContentCard.module.scss';
import classNames from "classnames";

interface Props {
  // Define the props of the component here.
  // For example, a message prop:
  title: string,
  text: RichTextField
  cta?: LinkField
  icon?: ImageField
  color?: string
}

const ContentCard: React.FC<Props> = ({ title, text, cta, icon, color }) => {
  const HolderClasses = classNames(styles.Holder, color);
  return (
    <div className={HolderClasses}>
      {isFilled.image(icon) && <div className={styles.Icon}><PrismicNextImage field={icon} alt=""/></div>}
      <h3>{title}</h3>
      {isFilled.richText(text) && <div className={styles.Description}><PrismicRichText field={text} /></div>}
      {isFilled.link(cta) && <PrismicNextLink className={`${styles.Cta} button`} field={cta}/>}
    </div>
  );
};

export default ContentCard;