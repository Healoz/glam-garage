import Button from "../../components/Button/Button";
import SizeSelect from "../../components/Select/SizeSelect";
import Accordion from "../../components/Accordion/Accordion";
import ColourScheme from "../../enums/ColourScheme";
import styles from "./ProductPage.module.css";
import purpleDressImg from "../../assets/images/purple-dress.jpg";
import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  RefObject,
} from "react";
import { Product } from "../../data/types";
import { useParams } from "react-router-dom";
import { CartContext } from "../../App";
import { Size } from "../../data/types";
import { motion } from "framer-motion";
import { useAnimationControls } from "framer-motion";

const ProductImageCarousel: React.FC<ProductProps> = ({ product }) => {
  return (
    <div>
      <div className={styles.carouselContainer}>
        <motion.div drag="x" className={styles.carousel}>
          {product.imageUrls.map((imageUrl, index) => (
            <div
              className={styles.productImage}
              key={index}
              style={{
                backgroundImage: `url(${imageUrl})`,
              }}
            />
          ))}
        </motion.div>

        {/* <div className={styles.carouselArrows}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </div> */}
        {/* <CarouselIndicators /> */}
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
        style={{ backgroundImage: `url(${product.imageUrls[1]})` }}
      ></div>
      <div
        className={`${styles.desktopGalleryImg}`}
        style={{ backgroundImage: `url(${product.imageUrls[2]})` }}
      ></div>
    </div>
  );
};

const ProductInfo: React.FC<ProductProps> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState<Size>(Size.XS);

  const controls = useAnimationControls();

  const addToCartAnimationDiv = useRef<HTMLDivElement>(null);

  const [addToCartAnimationPosition, setAddToCartAnimationPosition] =
    useState<DOMRect | null>(null);

  // this will run once since addToCartAnimationDiv is a consistent ref
  // needs to run this everytime the window changes size
  useEffect(() => {
    updateCartBtnPosition();

    window.addEventListener("resize", updateCartBtnPosition);
    window.addEventListener("scroll", updateCartBtnPosition);

    return () => {
      window.removeEventListener("resize", updateCartBtnPosition);
      window.removeEventListener("scroll", updateCartBtnPosition);
    };
  }, []);

  const updateCartBtnPosition = () => {
    if (addToCartAnimationDiv.current) {
      setAddToCartAnimationPosition(
        addToCartAnimationDiv.current.getBoundingClientRect()
      );
    }
  };

  useEffect(() => {
    console.log(addToCartAnimationPosition);
  }, [addToCartAnimationPosition]);

  const handleAddToCart = () => {
    // complete functionality
    addProductToCart(product, selectedSize);

    updateCartBtnPosition();

    // play animation. DOM object might not exist but will do nothing if so
    controls.start("addToCartAnimation");
  };

  const baseVariants = {
    initial: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 0,
    },
  };

  const variants = {
    ...baseVariants,
    ...(addToCartAnimationPosition && {
      addToCartAnimation: {
        x: [
          0,
          window.innerWidth - addToCartAnimationPosition.right - 50,
          window.innerWidth - addToCartAnimationPosition.right - 50,
          0,
        ],
        y: [
          0,
          -addToCartAnimationPosition.top + 20,
          -addToCartAnimationPosition.top + 20,
          0,
        ],
        opacity: [0.5, 1, 0, 0],
        scale: [1, 0.3, 0.3, 1],
        transition: {
          ease: "easeInOut",
          duration: 1,
          times: [0, 0.8, 0.999, 1],
        },
      },
    }),
  };

  return (
    <div className={styles.productInfo}>
      <h3>{product.name}</h3>
      <h3>${product.price}</h3>
      <p>{product.description}</p>
      <div className={styles.size}>
        <p>Size:</p>
        <SizeSelect setSelectedSize={setSelectedSize} />
      </div>
      <div className={styles.buttons}>
        <div className={styles.addToCartBtn}>
          <Button
            buttonText="Add to cart"
            colourScheme={ColourScheme.Primary}
            iconCode="add"
            onClickFunction={handleAddToCart}
            isCircle={false}
            fillsSpace={true}
          />
          <motion.div
            className={styles.cartGraphic}
            animate={controls}
            variants={variants}
            initial={variants.initial}
            style={{ position: "absolute", zIndex: 1000 }}
            ref={addToCartAnimationDiv}
          ></motion.div>
        </div>
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
