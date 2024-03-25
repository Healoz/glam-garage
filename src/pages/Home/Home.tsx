import styles from './Home.module.css';
import React from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import ColourScheme from '../../enums/ColourScheme';
import womanImg from '../../assets/images/kalea-morgan-ZmcHE6c7-7U-unsplash.jpg';
import glassesImg from '../../assets/images/carlos-vaz-KP4bxnxAilU-unsplash.jpg';
import shirtImg from '../../assets/images/nimble-made-kMGX6UK06Ps-unsplash.jpg';

interface HomeProps {
    
}

const ImageCollage = () => {

    return (
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
    )
}

const Home: React.FC<HomeProps> = ({}) => {

    return (
        <main className={styles.homeMain}>
            <Header />
            <section className={styles.hero}>
                <ImageCollage />
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <div>
                            <h1>ALL NEW</h1>
                            <h1>RANGES</h1>
                        </div>
                        <h4>Lorem ipsum dolor sit amet consectetur.</h4>
                        <Button 
                            buttonText={"Button text"}
                            colourScheme={ColourScheme.Primary}
                            iconCode={"arrow_forward"}
                        />
                    </div>
                </div>
            </section>
        </main>
        
    )
}

export default Home;

