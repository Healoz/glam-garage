import styles from "./Home.module.css";
import React from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import CatalogueItem from "../../components/CatalogueItem/CatalogueItem";
import purpleDressImg from "../../assets/images/purple-dress.jpg";
import ColourScheme from "../../enums/ColourScheme";
import womanImg from "../../assets/images/kalea-morgan-ZmcHE6c7-7U-unsplash.jpg";
import glassesImg from "../../assets/images/carlos-vaz-KP4bxnxAilU-unsplash.jpg";
import shirtImg from "../../assets/images/nimble-made-kMGX6UK06Ps-unsplash.jpg";
import circleText from "../../assets/images/circle-text.svg";
import { Product } from "../../data/types";
import { motion } from "framer-motion";

const ImageCollage = () => {
  const collageImages = [{}];

  return (
    <motion.div
      className={styles.imageCollageContainer}
    >
      <CircleSticker />
      <div className={styles.imageCollage}>
        <div className={styles.imageContainer}>
          <motion.img
            className={styles.img}
            src={womanImg}
            role="presentation"
            loading="lazy"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", delay: 0.5 }}
          ></motion.img>
        </div>
        <div className={styles.imageContainer}>
          <motion.img
            className={styles.img}
            src={glassesImg}
            role="presentation"
            loading="lazy"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
          ></motion.img>
        </div>
        <div className={styles.imageContainer}>
          <motion.img
            className={styles.img}
            src={shirtImg}
            role="presentation"
            loading="lazy"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1, type: "spring" }}
          ></motion.img>
        </div>
      </div>
    </motion.div>
  );
};

const HeroContent = () => {
  return (
    <div className={styles.heroContent}>
      <div className={styles.heroText}>
        <div className={styles.titleText}>
          <motion.h1
            initial={{ opacity: 0, x: -500 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", duration: 0.5, delay: 1 }}
          >
            ALL NEW
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: 500 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", duration: 0.5, delay: 1.5 }}
          >
            RANGES
          </motion.h1>
        </div>
        <motion.h4
          initial={{ opacity: 0, y: 300 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1, delay: 2 }}
        >
          Lorem ipsum dolor sit amet consect etur.
        </motion.h4>
        <div>
          <Button
            buttonText="Shop now"
            colourScheme={ColourScheme.Primary}
            iconCode="arrow_forward"
            isCircle={false}
            fillsSpace={false}
          />
        </div>
      </div>
    </div>
  );
};

const CircleSticker = () => {
  return (
    <motion.div
      className={styles.circleSticker}
      initial={{ opacity: 0, x: -100, y: -100 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 2, duration: 1.5, type: "spring" }}
    >
      <img
        src={circleText}
        className={`${styles.circleTextSvg} ${styles.rotateForever}`}
      ></img>
      <span className={`material-symbols-outlined ${styles.icon}`}>
        garage_home
      </span>
    </motion.div>
  );
};

interface CatalogueGridProps {
  products: Product[];
}

const CatalogueGrid: React.FC<CatalogueGridProps> = ({ products }) => {
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1 * index
      }
    }),
  };

  const catalogueItems = products.map((product, index) => (
    <motion.div
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      custom={index}
    >
      <CatalogueItem key={product.id} product={product} />
    </motion.div>
  ));

  return <div className={styles.catalogueGrid}>{catalogueItems}</div>;
};

interface HomeProps {
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ products }) => {
  return (
    <main className={styles.homeMain}>
      <section className={styles.navAndHero}>
        <section className={styles.hero}>
          <ImageCollage />
          <HeroContent />
        </section>
      </section>
      <section className={styles.catalogue}>
        <h3>View our new range</h3>
        <CatalogueGrid products={products} />
      </section>
    </main>
  );
};

export default Home;
