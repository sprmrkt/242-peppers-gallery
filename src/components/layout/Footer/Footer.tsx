// WHO CAN EDIT: Senior

import { LayoutDocumentData } from "../../../../prismicio-types";
import styles from "@/components/layout/Footer/Footer.module.scss";
import Link from "next/link";
import Logo from "@/assets/logo/Logo_Linen.png";
import AllLogo from "@/assets/logo/All_Accor.png";
import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Image from "next/image";

interface FooterProps {
  layoutData: LayoutDocumentData;
}

export default async function Footer({ layoutData }: FooterProps) {
  const { text, social_links, links_1, links_title_1, cta_text, cta_title, cta_link, links_2 } = layoutData;

  return (
    <>
      <div className={styles.PreFooter}>
        <div className={styles.PreFooterInner}>
          <div>
            <h2>{isFilled.keyText(cta_title) && cta_title}</h2>
            {isFilled.richText(cta_text) && <PrismicRichText field={cta_text} />}
          </div>
          {isFilled.link(cta_link) && <PrismicNextLink field={cta_link} className="button color-variation-1" />}
        </div>
      </div>
      <footer className={styles.Holder}>
        <div className={styles.Inner}>
          <div className={styles.Branding}>
            <Link href="/" className={styles.Logo}>
              <Image src={Logo} alt="Logo" />
            </Link>
            {isFilled.richText(text) && (
              <div className={styles.Copy}>
                <PrismicRichText field={text} />
              </div>
            )}
            <div className={styles.Logo}>
              <Image src={AllLogo} alt="All Logo" />
            </div>
          </div>
          {links_1.length > 0 && (
            <nav className={styles.Nav}>
              {isFilled.keyText(links_title_1) && <p>{links_title_1}</p>}
              <ul>
                {links_1.map(({ link }, index) => (
                  <li key={index}>
                    <PrismicNextLink field={link}>{link.text}</PrismicNextLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {links_2.length > 0 && (
            <nav className={styles.Nav}>
              <p>Title Field to be added</p>
              <ul>
                {links_2.map(({ link }, index) => (
                  <li key={index}>
                    <PrismicNextLink field={link}>{link.text}</PrismicNextLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {/* <nav className={styles.Nav}>
            <ul>
              {social_links.map((link, index) => (
                <li key={index}>
                  <PrismicNextLink field={link.link}>
                    {isFilled.image(link.icon) ? (
                      <PrismicNextImage field={link.icon} fallbackAlt="" />
                    ) : link.link.text ? (
                      link.link.text
                    ) : (
                      "Link"
                    )}
                  </PrismicNextLink>
                </li>
              ))}
            </ul>
          </nav> */}
          <div className={styles.Copyright}>
            <p>&copy; 2026 Peppers Gallery Hotel Canberra</p>
            <div className={styles.CopyrightLinks}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms and Conditions</Link>
            </div>
          </div>
        </div>
        <p className={styles.Attribution}>
          Designed by{" "}
          <a href="https://u-p.co/" target="_blank">
            U-P
          </a>
          , built by{" "}
          <a href="https://supermarket.london/" target="_blank">
            Supermarket
          </a>
        </p>
      </footer>
    </>
  );
}
