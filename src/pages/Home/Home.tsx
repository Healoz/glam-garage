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
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ImageCollage = () => {
  const collageContainerVariants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const collageImageVariants = {
    hidden: { opacity: 0, y: -100 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className={styles.imageCollageContainer}>
      <CircleSticker />
      <motion.div
        variants={collageContainerVariants}
        initial="hidden"
        animate="show"
        className={styles.imageCollage}
      >
        <motion.div
          className={styles.imageContainer}
          variants={collageImageVariants}
        >
          <img className={styles.img} src={womanImg}></img>
        </motion.div>
        <motion.div
          className={styles.imageContainer}
          variants={collageImageVariants}
        >
          <img className={styles.img} src={glassesImg}></img>
        </motion.div>
        <motion.div
          className={styles.imageContainer}
          variants={collageImageVariants}
        >
          <img className={styles.img} src={shirtImg}></img>
        </motion.div>
      </motion.div>
    </div>
  );
};

const HeroContent = () => {
  return (
    <div className={styles.heroContent}>
      <div className={styles.heroText}>
        <div className={styles.titleText}>
          <h1>ALL NEW</h1>
          <h1>RANGES</h1>
        </div>
        <h4>Lorem ipsum dolor sit amet consect etur.</h4>
        <Button
          buttonText="Shop now"
          colourScheme={ColourScheme.Primary}
          iconCode="arrow_forward"
          isCircle={false}
          fillsSpace={false}
        />
      </div>
    </div>
  );
};

const CircleSticker = () => {
  return (
    <div className={styles.circleSticker}>
      <img
        src={circleText}
        className={`${styles.circleTextSvg} ${styles.rotateForever}`}
      ></img>
      <span className={`material-symbols-outlined ${styles.icon}`}>
        garage_home
      </span>
    </div>
  );
};

interface CatalogueGridProps {
  products: Product[];
}

const CatalogueGrid: React.FC<CatalogueGridProps> = ({ products }) => {
  const catalogueItems = products.map((product) => (
    <CatalogueItem key={product.id} product={product} />
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
