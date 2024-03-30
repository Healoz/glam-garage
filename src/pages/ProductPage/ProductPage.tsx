import Button from "../../components/Button/Button";
import ColourScheme from "../../enums/ColourScheme";
import styles from "./ProductPage.module.css";
import purpleDressImg from "../../assets/images/purple-dress.jpg";
import React from "react";

interface ProductPageProps {}

const ProductImageCarousel = () => {
  return (
    <div
      className={styles.productImageCarousel}
      style={{ backgroundImage: `url(${purpleDressImg})` }}
    >
      <div className={styles.carouselArrows}>
        <span className="material-symbols-outlined">arrow_back_ios</span>
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </div>
      <CarouselIndicators />
    </div>
  );
};

const CarouselIndicators = () => {
  return (
    <div className={styles.carouselIndicators}>
      <div
        className={`${styles.carouselIndicator} ${styles.filledIndicator}`}
      ></div>
      <div className={`${styles.carouselIndicator}`}></div>
      <div className={`${styles.carouselIndicator}`}></div>
    </div>
  );
};

const ProductInfo = () => {
  return (
    <div className={styles.productInfo}>
      <h3>Pretty Purple Dress</h3>
      <h3>$27</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur. Eget egestas ante etiam eu a
        auctor. Nulla et amet ultricies sed velit risus faucibus eget. Aliquam
        pretium elit vitae egestas mauris condimentum.
      </p>
      <div className={styles.size}>
        <p>Size:</p>
        <select>
          <option>XS</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>
      </div>
      <div className={styles.buttons}>
        <Button
          buttonText="Add to cart"
          colourScheme={ColourScheme.Primary}
          iconCode="add"
          buttonLink="/"
          isCircle={false}
          fillsSpace={true}
        />
        <Button
          colourScheme={ColourScheme.Secondary}
          iconCode="favorite"
          buttonLink="/"
          isCircle={true}
          fillsSpace={false}
        />
      </div>
    </div>
  );
};

const Accordion = () => {
  return (
    <div className={styles.accordionContainer}>
      <div className={styles.accordion}>
        <button className={styles.accordionButton}>Details</button>
        <div className={styles.panel}>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
      </div>
      <div className={styles.accordion}>
        <button className={styles.accordionButton}>Shipping & Returns</button>
        <div className={styles.panel}>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
      </div>
      <div className={styles.accordion}>
        <button className={styles.accordionButton}>Menu 3</button>
        <div className={styles.panel}>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
      </div>
    </div>
  );
};

const ProductPage: React.FC<ProductPageProps> = ({}) => {
  return (
    <section className={styles.productPage}>
      <Button
        colourScheme={ColourScheme.Secondary}
        iconCode="arrow_back"
        buttonLink="/"
        isCircle={true}
        fillsSpace={false}
      />
      <ProductImageCarousel />
      <ProductInfo />
      <div className={styles.divider}></div>
      <Accordion />
    </section>
  );
};

export default ProductPage;
