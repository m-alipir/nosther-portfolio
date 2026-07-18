import type { Dictionary } from "@/content/dictionaries";
import { services } from "@/content/services";
import type { Locale } from "@/content/types";
import styles from "./services.module.css";

interface ServicesProps {
  dictionary: Dictionary;
  locale: Locale;
}

export function Services({ dictionary, locale }: ServicesProps) {
  return (
    <section
      id="services"
      className={styles.section}
      aria-labelledby="services-title"
      data-motion-section="services"
    >
      <div className={"container " + styles.layout}>
        <div className={styles.heading} data-services-heading>
          <p className="eyebrow" data-services-eyebrow>
            {dictionary.services.eyebrow}
          </p>
          <h2 id="services-title" className="section-title" data-services-title>
            {dictionary.services.title}
          </h2>
        </div>

        <ol className={styles.list}>
          {services.map((service, index) => (
            <li key={service.id} className={styles.item} data-service-row>
              <span className={styles.number} data-service-number>
                0{index + 1}
              </span>
              <div data-service-copy>
                <h3>{service.title[locale]}</h3>
                <p>{service.description[locale]}</p>
              </div>
              <span className={styles.rule} data-service-rule aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
