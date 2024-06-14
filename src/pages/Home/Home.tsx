import styles from "./Home.module.css";
import React, { useEffect, useRef } from "react";
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
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import CatalogueGrid from "../../components/CatalogueGrid/CatalogueGrid";

const ImageCollage = () => {
  const collageImages = [{}];

  return (
    <motion.div className={styles.imageCollageContainer}>
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

interface CategoryCallToActionProps {
  categoryNames: string[];
}

const CategoryCallToAction: React.FC<CategoryCallToActionProps> = ({
  categoryNames,
}) => {
  return (
    <section className={`${styles.catalogue} ${styles.categories}`}>
      <h3>Categories</h3>
      <div className={styles.categoryGridContainer}>
        <div className={styles.categoryGrid}>
          {categoryNames.map((category) => {
            return (
              <div className={styles.categoryItem} key={category}>
                <div className={styles.categoryImgContainer}>
                  <img className={styles.categoryImg} src={glassesImg} />
                </div>
                <p>{category}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface HomeProps {
  products: Product[];
  addProductToFavourites: (newProduct: Product) => void;
  removeProductFromFavourites: (removedProduct: Product) => void;
  checkIfProductInFavourites: (product: Product) => boolean;
  categoryNames: string[];
}

const Home: React.FC<HomeProps> = ({
  products,
  addProductToFavourites,
  removeProductFromFavourites,
  checkIfProductInFavourites,
  categoryNames,
}) => {
  const heroContainerRef = useRef(null);
  const homeMainRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: homeMainRef,
    offset: ["start end", "end start"],
  });

  const smallParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const mediumParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const largeParallax = useTransform(scrollYProgress, [0, 1], [0, -250]);

  const retrieveCategoryImg = (categoryName: string): string | void => {

  }

  return (
    <main className={styles.homeMain} ref={homeMainRef}>
      <section className={styles.navAndHero}>
        <section className={styles.hero} ref={heroContainerRef}>
          <ImageCollage />
          <HeroContent />
        </section>
      </section>
      <section className={styles.categoriesAndCatalogue}>
        <CategoryCallToAction categoryNames={categoryNames} />
        <section className={styles.catalogue}>
          <h3>View our new range</h3>
          <CatalogueGrid
            products={products}
            addProductToFavourites={addProductToFavourites}
            removeProductFromFavourites={removeProductFromFavourites}
            checkIfProductInFavourites={checkIfProductInFavourites}
          />
        </section>
      </section>
    </main>
  );
};

export default Home;
