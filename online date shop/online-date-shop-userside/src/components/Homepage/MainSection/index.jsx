import { Link } from 'react-router-dom';
import shopImage from '/src/assets/resources/shop.jpg';
import blogImage from '/src/assets/resources/blog.jpg';
import collectionImage from '/src/assets/resources/collection.jpg';

const MainSection = () => {
  return (
    <div className="max-w-5xl mx-auto p-5 md:p-10 space-y-5 md:space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-2">
        <div
          className="relative bg-cover bg-center bg-no-repeat flex justify-center items-center bg-opacity-25 h-80 md:h-[550px]"
          style={{ backgroundImage: `url(${shopImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50 w-full"></div>
          <h2 className="absolute text-white bg-black text-2xl md:text-5xl py-2 px-3 md:py-3 md:px-5">
            <Link to="/shop">Shop</Link>
          </h2>
        </div>
        <div
          className="relative bg-cover bg-center flex justify-center items-center bg-opacity-25 h-80 md:h-[550px]"
          style={{ backgroundImage: `url(${blogImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50 w-full"></div>
          <h2 className="absolute text-white bg-black text-2xl md:text-5xl py-2 px-3 md:py-3 md:px-5">
            <Link to="/cart">cart</Link>
          </h2>
        </div>
      </div>
      <div
        className="relative bg-cover bg-center flex justify-center items-center bg-opacity-25 h-80 md:h-[550px]"
        style={{ backgroundImage: `url(${collectionImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50 w-full"></div>
        <h2 className="absolute text-white bg-black text-2xl md:text-5xl py-2 px-3 md:py-3 md:px-5">
          <Link to="/collection">Collection</Link>
        </h2>
      </div>
    </div>
  );
};

export default MainSection;
