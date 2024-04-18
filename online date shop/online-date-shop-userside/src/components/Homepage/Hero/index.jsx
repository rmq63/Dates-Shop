import { Button, Image, Typography } from 'antd';
import { motion } from 'framer-motion';
import dateForHeroSec from '../../../assets/date-for-hero-sec.jpg';
import offer from '../../../assets/offer-blob.svg';

const Hero = () => {
  return (
    <div className="flex justify-start items-center my-28 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="hidden lg:block"
      >
        <TextHeroSection />
      </motion.div>

      <Image src={dateForHeroSec} width={625} className="rounded-lg hidden lg:block" />

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: -50 }}
        transition={{ delay: 0.5 }}
        className="rounded-lg overflow-hidden w-[400px] hidden lg:block"
      >
        <motion.img src={offer} width={400} className="w-full" alt="Offer" />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center text-8xl text-white font-extrabold">
          <div>50%</div>
        </div>
      </motion.div>
    </div>
  );
};

export const TextHeroSection = () => {
  return (
    <div className="px-[64px] flex flex-col lg:items-end gap-6 py-4 lg:py-0">
      <Typography.Title level={3} className="lg:text-right">
        <span className="text-black font-bold lg:text-6xl uppercase leading-snug">We Take</span>
        <br />
        <span className="text-black lg:text-6xl uppercase leading-snug">pride in</span>
        <br />
        <span className="text-black lg:text-6xl uppercase leading-snug">our food</span>
      </Typography.Title>
      <Typography.Text className="text-black tracking-wide">Original, Fresh and High quality</Typography.Text>
      <Button
        type="primary"
        shape="round"
        size="large"
        className="bg-black text-white font-bold h-10 text-xl"
        style={{
          height: 50,
          width: 150,
        }}
      >
        Learn More
      </Button>
    </div>
  );
};

export default Hero;
