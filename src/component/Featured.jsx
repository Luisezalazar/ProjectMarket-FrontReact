import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../public/img/Miaurket.png"
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useProducts } from "../hooks/useProducts";

export const Featured = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const products = useProducts();
    console.log(products)

    const maxSlides = Math.max(0, products.length - 4);

    const nextSlide = () => {
        setCurrentSlide((prev) => Math.min(prev + 1, maxSlides));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
    };

    const handleViewProduct = (product) => {
        navigate(`/product/${product.id}`, { state: { product } });
    };

    return (
        <div className="featuredCarousel-container">
            {products.length > 4 && (
                <button 
                    className="featured-arrow featured-arrow-left" 
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                >
                    <ChevronLeft />
                </button>
            )}
            
            <div className="featuredCarousel-wrapper">
                <div 
                    className="featuredCarousel"
                    style={{ transform: `translateX(-${currentSlide * 25}%)` }}
                >
                    {products.map((product) => (
                        <div 
                            className="featuredProduct-card" 
                            key={product.id}
                            onClick={() => handleViewProduct(product)}
                        >
                            <img src={product.images[0]?.url} alt={product.name} />
                            <h6>{product.name}</h6>
                            <p>${product.price.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            {products.length > 4 && (
                <button 
                    className="featured-arrow featured-arrow-right" 
                    onClick={nextSlide}
                    disabled={currentSlide >= maxSlides}
                >
                    <ChevronRight />
                </button>
            )}
        </div>
    )
}
