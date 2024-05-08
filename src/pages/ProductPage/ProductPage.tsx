import Button from "../../components/Button/Button";
import Select from "../../components/Select/Select";
import Accordion from "../../components/Accordion/Accordion";
import ColourScheme from "../../enums/ColourScheme";
import styles from "./ProductPage.module.css";
import purpleDressImg from "../../assets/images/purple-dress.jpg";
import React, { useContext } from "react";
import { Product } from "../../data/types";
import { useParams } from "react-router-dom";
import { CartContext } from "../../App";
import { Size } from "../../data/types";

const ProductImageCarousel: React.FC<ProductProps> = ({ product }) => {
  return (
    <div>
      <div
        className={styles.productImageCarousel}
        style={{ backgroundImage: `url(${product.imageUrls[0]})` }}
      >
        <div className={styles.carouselArrows}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </div>
        <CarouselIndicators />
      </div>
      <DesktopGallery product={product} />
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

const DesktopGallery: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className={styles.desktopGallery}>
      <div
        className={`${styles.desktopGalleryImg} ${styles.selectedImg}`}
        style={{ backgroundImage: `url(${product.imageUrls[0]})` }}
      ></div>
      <div
        className={`${styles.desktopGalleryImg}`}
        style={{ backgroundImage: `url(${product.imageUrls[0]})` }}
      ></div>
      <div
        className={`${styles.desktopGalleryImg}`}
        style={{ backgroundImage: `url(${product.imageUrls[0]})` }}
      ></div>
    </div>
  );
};

const ProductInfo: React.FC<ProductProps> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext);

  return (
    <div className={styles.productInfo}>
      <h3>{product.name}</h3>
      <h3>${product.price}</h3>
      <p>{product.description}</p>
      <div className={styles.size}>
        <p>Size:</p>
        <Select selectOptions={["XS", "S", "M", "L", "XL"]} />
      </div>
      <div className={styles.buttons}>
        <Button
          buttonText="Add to cart"
          colourScheme={ColourScheme.Primary}
          iconCode="add"
          onClickFunction={() => addProductToCart(product, Size.S)}
          isCircle={false}
          fillsSpace={true}
        />
        <Button
          colourScheme={ColourScheme.Secondary}
          iconCode="favorite"
          isCircle={true}
          fillsSpace={false}
        />
      </div>
    </div>
  );
};

interface ProductProps {
  product: Product;
}

const Accordions: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className={styles.accordionContainer}>
      <Accordion
        accordionTitle="Details"
        accordionContent="Lorem ipsum dolor sit amet consectetur. Eget egestas ante etiam eu a
        auctor. Nulla et amet ultricies sed velit risus faucibus eget. Aliquam
        pretium elit vitae egestas mauris condimentum."
        contentShowing={true}
      />
      <Accordion
        accordionTitle="Shipping & Returns"
        accordionContent="Lorem ipsum dolor sit amet consectetur. Eget egestas ante etiam eu a
        auctor. Nulla et amet ultricies sed velit risus faucibus eget. Aliquam
        pretium elit vitae egestas mauris condimentum."
        contentShowing={false}
      />
      <Accordion
        accordionTitle="Menu 3"
        accordionContent="Lorem ipsum dolor sit amet consectetur. Eget egestas ante etiam eu a
        auctor. Nulla et amet ultricies sed velit risus faucibus eget. Aliquam
        pretium elit vitae egestas mauris condimentum."
        contentShowing={false}
      />
    </div>
  );
};

interface ProductPageProps {
  products: Product[];
}

function getProductById(
  id: string | undefined,
  products: Product[]
): Product | undefined {
  // id in useParams is a string, need to convert to number
  // Do not do if id is undefined
  if (id === undefined) {
    console.log("No id has been defined.");
    return undefined;
  }

  const numId = parseInt(id);

  return products.find((product) => product.id === numId);
}

const ProductPage: React.FC<ProductPageProps> = ({ products }) => {
  const { id } = useParams();
  const productSelected = getProductById(id, products);
  console.log(productSelected);

  return (
    <section className={`${styles.productPage} pageContentContainerWide`}>
      <Button
        colourScheme={ColourScheme.Secondary}
        iconCode="arrow_back"
        buttonLink="/"
        isCircle={true}
        fillsSpace={false}
      />

      {productSelected ? (
        <div className={styles.productPageContent}>
          <ProductImageCarousel product={productSelected} />
          <div>
            <ProductInfo product={productSelected} />
            <div className={styles.divider}></div>
            <Accordions product={productSelected} />
          </div>
        </div>
      ) : (
        <h2>No product found</h2>
      )}
    </section>
  );
};

export default ProductPage;
