import React, { useState, useEffect } from 'react';
import { motion, AnimationProps } from 'framer-motion';


interface ImageWithAnimationProps {
    imageUrl: string;
    initial?: AnimationProps['initial'];
    animate?: AnimationProps['animate'];
    duration?: number;
    className: string;
}

const ImageWithAnimation: React.FC<ImageWithAnimationProps> = ({ imageUrl, initial, animate, className, duration }) => {

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      setImageLoaded(true);
    };
  }, [imageUrl]);

  return (
    <motion.div
      initial={initial}
      animate={imageLoaded ? animate : initial}
      transition={{ duration: duration }}
    >
      <img src={imageUrl} alt="Animated Image" />
    </motion.div>
  );
};

export default ImageWithAnimation;
