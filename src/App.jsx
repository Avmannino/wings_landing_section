import { useEffect, useState } from "react";

import "./App.css";

const backgroundImages = [
  "assets/background-01.jpg",
  "assets/background-02.jpg",
  "assets/background-03.jpg",
];

const CAROUSEL_INTERVAL = 4500;

const LEARN_TO_PLAY_URL =
  "https://www.wingsarena.com/learntoplay";

const LEARN_TO_SKATE_URL =
  "https://www.wingsarena.com/learntoskate";

const MITES_LTP_URL =
  "https://www.wingsarena.com/mites-ltp-league";

const ADULT_HOCKEY_URL =
  "https://www.wingsarena.com/adult-hockey-classes";

const CATCHCORNER_URL =
  "https://www.catchcorner.com/facility-page/embedded/rental/wings-arena";

const socialLinks = [
  {
    id: "instagram",
    label: "Instagram",
    image: "assets/instagram.png",
    fallback: "IG",
    href: "https://www.instagram.com/wingsarenact?igsh=MWZ0aTlwZHdhemZyeQ%3D%3D&utm_source=qr",
  },
  {
    id: "facebook",
    label: "Facebook",
    image: "assets/facebook.png",
    fallback: "f",
    href: "https://www.facebook.com/profile.php?id=61577163134118",
  },
  {
    id: "livebarn",
    label: "LiveBarn",
    image: "assets/livebarn.png",
    fallback: "◉",
    href: "https://watch.livebarn.com/en/video/5540/live",
  },
  {
    id: "catchcorner",
    label: "CatchCorner",
    image: "assets/catchcorner.png",
    fallback: "CC",
    href: CATCHCORNER_URL,
  },
];

function AssetImage({
  src,
  alt = "",
  className = "",
  fallback = null,
}) {
  const [failed, setFailed] = useState(false);

  if (failed && fallback) {
    return fallback;
  }

  if (failed) {
    return null;
  }

  return (
    <img
      className={className}
      src={`${import.meta.env.BASE_URL}${src}`}
      alt={alt}
      onError={() => {
        setFailed(true);
      }}
    />
  );
}

function BackgroundCarousel({
  activeBackground,
}) {
  return (
    <div
      className="background-carousel"
      aria-hidden="true"
    >
      {backgroundImages.map(
        (image, index) => (
          <div
            className={`background-slide ${
              index === activeBackground
                ? "background-slide-active"
                : ""
            }`}
            key={image}
          >
            <AssetImage
              src={image}
              alt=""
              className="background-image"
            />
          </div>
        ),
      )}

      <div className="background-blue-wash" />

      <div className="background-top-shade" />

      <div className="background-edge-vignette" />
    </div>
  );
}

function StoreButton() {
  return (
    <a
      className="store-button"
      href="https://shop.gearupwithus.com/wings-arena"
      target="_top"
    >
      <span
        className="store-wing store-wing-left"
        aria-hidden="true"
      >
        <span className="store-wing-feathers">
          <i />
          <i />
          <i />
        </span>
      </span>

      <span className="store-button-face">
        <span>WINGS</span>
        <span>STORE</span>
      </span>

      <span
        className="store-wing store-wing-right"
        aria-hidden="true"
      >
        <span className="store-wing-feathers">
          <i />
          <i />
          <i />
        </span>
      </span>
    </a>
  );
}

function NewsletterButton() {
  return (
    <a
      className="newsletter-button"
      href="https://www.wingsarena.com/"
      target="_top"
    >
      <span>WINGS</span>
      <span>NEWSLETTER</span>
    </a>
  );
}

function SocialButton({
  item,
}) {
  return (
    <a
      className={`social-button social-button-${item.id}`}
      href={item.href}
      target="_blank"
      rel="noreferrer"
      aria-label={item.label}
    >
      <AssetImage
        src={item.image}
        alt={item.label}
        className="social-image"
        fallback={
          <span className="social-fallback">
            {item.fallback}
          </span>
        }
      />
    </a>
  );
}

function PromotionalCard() {
  return (
    <main className="promo-page">
      <article className="promo-card">
        <div className="promo-topbar">
          <AssetImage
            src="assets/wings-logo.png"
            alt="Wings Arena"
            className="promo-logo"
            fallback={
              <span className="promo-logo-fallback">
                W
              </span>
            }
          />

          <span className="promo-topbar-label">
            Featured Programs
          </span>
        </div>

        <div className="promo-content">
          <div className="promo-program">
            <div className="promo-heading">
              <span className="promo-heading-blue">
                FALL
              </span>

              <span className="promo-heading-red">
                LEARN TO PLAY
              </span>

              <span className="promo-heading-amp">
                &amp;
              </span>

              <span className="promo-heading-red">
                LEARN TO SKATE
              </span>
            </div>

            <a
              className="promo-button"
              href={LEARN_TO_PLAY_URL}
              target="_top"
              rel="noopener noreferrer"
            >
              Learn to Play
            </a>

            <a
              className="promo-button promo-button-blue"
              href={LEARN_TO_SKATE_URL}
              target="_top"
              rel="noopener noreferrer"
            >
              Learn to Skate
            </a>
          </div>

          <div className="promo-divider" />

          <div className="promo-program promo-program-alt">
            <div className="promo-heading">
              <span className="promo-heading-red">
                MITES
              </span>

              <span className="promo-heading-blue">
                LTP LEAGUE
              </span>
            </div>

            <a
              className="promo-button"
              href={MITES_LTP_URL}
              target="_top"
              rel="noopener noreferrer"
            >
              Registration &amp; Info
            </a>

            <div className="promo-subdivider" />

            <div className="promo-heading">
              <span className="promo-heading-red">
                ADULT
              </span>

              <span className="promo-heading-blue">
                HOCKEY CLASSES
              </span>
            </div>

            <a
              className="promo-button promo-button-red"
              href={ADULT_HOCKEY_URL}
              target="_top"
              rel="noopener noreferrer"
            >
              Registration &amp; Info
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}

function App() {
  const [
    activeBackground,
    setActiveBackground,
  ] = useState(0);

  useEffect(() => {
    if (
      backgroundImages.length <= 1
    ) {
      return undefined;
    }

    const mediaQuery =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

    if (mediaQuery.matches) {
      return undefined;
    }

    const interval =
      window.setInterval(() => {
        setActiveBackground(
          (current) =>
            (current + 1) %
            backgroundImages.length,
        );
      }, CAROUSEL_INTERVAL);

    return () => {
      window.clearInterval(
        interval,
      );
    };
  }, []);

  return (
    <main className="landing-page">
      <section className="wings-landing">
        <BackgroundCarousel
          activeBackground={
            activeBackground
          }
        />

        <div className="landing-layout">
          <div className="top-actions">
            <div className="top-action-left">
              <StoreButton />
            </div>

            <div className="top-action-right">
              <NewsletterButton />
            </div>
          </div>

          <div className="center-content">
            <div className="main-logo-wrap">
              <AssetImage
                src="assets/wings-logo.png"
                alt="Wings Arena"
                className="main-logo"
                fallback={
                  <div className="main-logo-fallback">
                    <span>WINGS</span>

                    <strong>W</strong>

                    <span>ARENA</span>
                  </div>
                }
              />
            </div>

            <h1 className="main-tagline">
              CONNECTICUT&apos;S NEWEST ICE
              ARENA
            </h1>

            <div
              className="center-divider"
              aria-hidden="true"
            />

            <a
              className="ice-rentals-button"
              href={CATCHCORNER_URL}
              target="_top"
            >
              ICE RENTALS
            </a>

            <div className="social-section">
              <p>FOLLOW US ON</p>

              <div className="social-row">
                {socialLinks.map(
                  (item) => (
                    <SocialButton
                      key={item.id}
                      item={item}
                    />
                  ),
                )}
              </div>
            </div>

            <a
              className="livebarn-link"
              href="https://livebarn.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LiveBarn"
            >
              <AssetImage
                src="assets/livebarn.jpg"
                alt="LiveBarn - Streaming Live and On Demand"
                className="livebarn-banner"
                fallback={
                  <div className="livebarn-fallback">
                    <strong>
                      LiveBarn
                    </strong>

                    <span>
                      STREAMING LIVE &amp; ON
                      DEMAND
                    </span>
                  </div>
                }
              />
            </a>
          </div>

          <aside className="featured-column">
            <PromotionalCard />
          </aside>
        </div>
      </section>
    </main>
  );
}

export default App;