import styles from './Home.module.css';
import React from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import CatalogueItem from '../../components/CatalogueItem/CatalogueItem';
import purpleDressImg from '../../assets/images/purple-dress.jpg';
import ColourScheme from '../../enums/ColourScheme';
import womanImg from '../../assets/images/kalea-morgan-ZmcHE6c7-7U-unsplash.jpg';
import glassesImg from '../../assets/images/carlos-vaz-KP4bxnxAilU-unsplash.jpg';
import shirtImg from '../../assets/images/nimble-made-kMGX6UK06Ps-unsplash.jpg';
import circleText from '../../assets/images/circle-text.svg';


interface HomeProps {
    
}

const ImageCollage = () => {

    return (
        <div className={styles.imageCollageContainer}>
            <CircleSticker />
            <div className={styles.imageCollage}>
                <div 
                    className={styles.img} 
                    style={{backgroundImage: `url(${womanImg})`}}>
                </div>
                <div 
                    className={styles.img} 
                    style={{backgroundImage: `url(${glassesImg})`}}>
                </div>
                <div 
                    className={styles.img} 
                    style={{backgroundImage: `url(${shirtImg})`}}>
                </div>  
            </div>
        </div>
    )
}

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
                    buttonLink="#"
                />
            </div>
        </div>
    )
}

const CircleSticker = () => {
    return (
        <div className={styles.circleSticker}>
            <img src={circleText} className={`${styles.circleTextSvg} ${styles.rotateForever}`}></img>
            <span className={`material-symbols-outlined ${styles.icon}`}>garage_home</span>
        </div>
    )
}

const CatalogueGrid = () => {
    return (
        <div className={styles.catalogueGrid}>
            <CatalogueItem
                productImageUrl={purpleDressImg}
            />
            <CatalogueItem
                productImageUrl={purpleDressImg}
            />
            <CatalogueItem
                productImageUrl={purpleDressImg}
            />
            <CatalogueItem
                productImageUrl={purpleDressImg}
            />
        </div>
    )
}

const Home: React.FC<HomeProps> = ({}) => {

    return (
        <main className={styles.homeMain}>
            <section className={styles.navAndHero}>
                <Header />
                <section className={styles.hero}>
                    <ImageCollage />
                    <HeroContent />
                </section>
            </section>
            <section className={styles.catalogue}>
                <h3>View our new range</h3>
                <CatalogueGrid />
            </section>
        </main>
        
    )
}

export default Home;

