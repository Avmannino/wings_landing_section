import { useEffect, useLayoutEffect, useRef, useState } from "react";

import "./App.css";

const backgroundImages = [
  "assets/background-01",
  "assets/background-02",
  "assets/background-03",
  "assets/background-04",
  "assets/background-05",
];

const CAROUSEL_INTERVAL = 4500;

const LEARN_TO_PLAY_URL =
  "https://www.wingsarena.com/learntoplay";

const LEARN_TO_SKATE_URL =
  "https://www.wingsarena.com/learntoskate";

const ADULT_HOCKEY_URL =
  "https://www.wingsarena.com/adult-hockey-classes";

const CATCHCORNER_URL =
  "https://www.catchcorner.com/facility-page/embedded/rental/wings-arena";

// Asks the parent (Wix) page to scroll to the schedule section.
// The Wix page needs a matching listener:
//   $w("#htmlXX").onMessage((e) => {
//     if (e.data?.type === "wings:scrollTo") $w("#section56").scrollTo();
//   });
function requestScheduleScroll() {
  window.parent.postMessage(
    { type: "wings:scrollTo", target: "section56" },
    "*",
  );
}

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
  webpSrc = null,
  alt = "",
  className = "",
  fallback = null,
  loading,
  decoding,
  fetchPriority,
}) {
  const [failed, setFailed] = useState(false);

  if (failed && fallback) {
    return fallback;
  }

  if (failed) {
    return null;
  }

  const base = import.meta.env.BASE_URL;

  const img = (
    <img
      className={className}
      src={`${base}${src}`}
      alt={alt}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      onError={() => {
        setFailed(true);
      }}
    />
  );

  if (!webpSrc) {
    return img;
  }

  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${base}${webpSrc}`}
      />

      {img}
    </picture>
  );
}

function PumpkinIcon({
  flip = false,
}) {
  return (
    <svg
      className={`promo-icon ${
        flip ? "promo-icon-flip" : ""
      }`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M12 6c.7-2 2.6-2.6 3.3-1.6.6.9-.3 2.2-1.6 2.8"
        fill="none"
        stroke="#5f7d3a"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <ellipse
        cx="8.6"
        cy="14.5"
        rx="3.5"
        ry="5.7"
        fill="#d9741c"
      />
      <ellipse
        cx="15.4"
        cy="14.5"
        rx="3.5"
        ry="5.7"
        fill="#d9741c"
      />
      <ellipse
        cx="12"
        cy="14.7"
        rx="4.3"
        ry="6.3"
        fill="#ef8a22"
      />
    </svg>
  );
}

function BackgroundCarousel({
  activeBackground,
  loadedSlides,
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
            {loadedSlides.includes(index) && (
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${import.meta.env.BASE_URL}${image}.webp`}
                />

                <img
                  className="background-image"
                  src={`${import.meta.env.BASE_URL}${image}.jpg`}
                  alt=""
                  loading="eager"
                  fetchPriority={
                    index === 0
                      ? "high"
                      : "low"
                  }
                  decoding="async"
                />
              </picture>
            )}
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
      href="http://eepurl.com/jpMhqI"
      target="_top"
    >
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
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const card = cardRef.current;

    if (!card) {
      return undefined;
    }

    const desktopQuery = window.matchMedia(
      "(min-width: 1101px)",
    );
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (
      !desktopQuery.matches ||
      reducedMotionQuery.matches
    ) {
      return undefined;
    }

    // Measure the card at its natural size, then hand that height to a
    // keyframe animation that unrolls it from 0. A @keyframes animation
    // (vs a height transition) replays the same way on every mount and
    // every refresh — it doesn't hinge on the browser painting an
    // intermediate collapsed frame first, which is what made the
    // transition version skip on reload.
    const fullHeight = card.scrollHeight;

    // Bail rather than risk leaving the card collapsed if we somehow
    // can't get a real measurement.
    if (!fullHeight || fullHeight < 80) {
      return undefined;
    }

    card.style.setProperty(
      "--promo-unroll-height",
      `${fullHeight}px`,
    );
    card.classList.add(
      "promo-card-unroll",
    );

    let fallbackTimer = 0;

    const finishUnroll = (event) => {
      if (
        event &&
        (event.target !== card ||
          event.animationName !==
            "promo-card-unroll")
      ) {
        return;
      }

      // Swap the fixed measured height for `auto` so the card can still
      // reflow (late webfont, resize) after the entrance.
      card.classList.add(
        "promo-card-unroll-complete",
      );
      card.classList.remove(
        "promo-card-unroll",
      );
      window.clearTimeout(fallbackTimer);
    };

    card.addEventListener(
      "animationend",
      finishUnroll,
    );

    // Safety net if animationend never lands (tab hidden mid-run, etc).
    fallbackTimer = window.setTimeout(
      finishUnroll,
      1400,
    );

    return () => {
      window.clearTimeout(fallbackTimer);

      card.removeEventListener(
        "animationend",
        finishUnroll,
      );

      card.classList.remove(
        "promo-card-unroll",
        "promo-card-unroll-complete",
      );
      card.style.removeProperty(
        "--promo-unroll-height",
      );
    };
  }, []);

  return (
    <main className="promo-page">
      <article
        ref={cardRef}
        className="promo-card"
      >
        <div className="promo-topbar">
          <PumpkinIcon />

          <span className="promo-topbar-label">
            Fall{" "}
            <span className="promo-topbar-sep">
              |
            </span>{" "}
            Open Registrations
          </span>

          <PumpkinIcon flip />
        </div>

        <div className="promo-content">
          <div className="promo-program">
            <div className="promo-heading">
              <span className="promo-heading-red">
                LEARN TO PLAY
              </span>

              <span className="promo-heading-amp">
                &amp;
              </span>

              <span className="promo-heading-skate">
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

        <div className="promo-footer">
          <a
            className="promo-footer-link"
            href="http://eepurl.com/jpMhqI"
            target="_top"
            rel="noopener noreferrer"
          >
            <span className="promo-footer-text">
              Subscribe to Wings Weekly
            </span>
          </a>

          <a
            className="promo-footer-link promo-footer-merch"
            href="https://shop.gearupwithus.com/wings-arena"
            target="_top"
            rel="noopener noreferrer"
          >
            <span className="promo-footer-text">
              Wings Merch
            </span>
          </a>
        </div>

        <span
          className="promo-roll-edge"
          aria-hidden="true"
        />
      </article>
    </main>
  );
}

function App() {
  const [
    activeBackground,
    setActiveBackground,
  ] = useState(0);

  // Only the first slide ships on load; the rest are mounted just before
  // they're needed so ~360KB of imagery stays off the critical path.
  const [
    loadedSlides,
    setLoadedSlides,
  ] = useState([0]);

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

    // Stagger the remaining slides onto the page: each is mounted one
    // carousel step before its turn, so its image has time to load but
    // never competes with the first paint.
    const warmers = backgroundImages
      .slice(1)
      .map((_, offset) =>
        window.setTimeout(
          () => {
            setLoadedSlides((slides) => [
              ...slides,
              offset + 1,
            ]);
          },
          1200 + offset * CAROUSEL_INTERVAL,
        ),
      );

    const interval =
      window.setInterval(() => {
        setActiveBackground(
          (current) =>
            (current + 1) %
            backgroundImages.length,
        );
      }, CAROUSEL_INTERVAL);

    return () => {
      warmers.forEach(window.clearTimeout);
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
          loadedSlides={
            loadedSlides
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
                webpSrc="assets/wings-logo.webp"
                alt="Wings Arena"
                className="main-logo"
                fetchPriority="high"
                decoding="async"
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

            <div className="cta-row">
              <button
                type="button"
                className="schedule-button"
                onClick={requestScheduleScroll}
              >
                Schedule
              </button>

              <a
                className="ice-rentals-button"
                href={CATCHCORNER_URL}
                target="_top"
              >
                ICE RENTALS
              </a>
            </div>

            <div
              className="center-divider"
              aria-hidden="true"
            />

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
                src="assets/livebarn-banner.jpg"
                webpSrc="assets/livebarn-banner.webp"
                alt="LiveBarn - Streaming Live and On Demand"
                className="livebarn-banner"
                loading="lazy"
                decoding="async"
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
            <div className="featured-store">
              <StoreButton />
            </div>

            <PromotionalCard />
          </aside>
        </div>
      </section>
    </main>
  );
}

export default App;