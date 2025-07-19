import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../public/img/Miaurket.png"
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export const Featured = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const products = [
        {
            id: 1,
            title: "Florera En Combo Con Accesorios",
            price: 29000,
            img: img,
            category: "Florera"
        },
        {
            id: 2,
            title: "Morral Bando Ceniza",
            price: 36000,
            img: img,
            category: "Morral"
        },
        {
            id: 3,
            title: "Sabal Messi",
            price: 28000,
            img: img,
            category: "Tabaquera"
        },
        {
            id: 4,
            title: "Tote Bag Negra Actitud",
            price: 32000,
            img: img,
            category: "Tote"
        },
        {
            id: 5,
            title: "Tote Bag Roja Actitud",
            price: 32000,
            img: img,
            category: "Tote"
        },
        {
            id: 6,
            title: "Tote Bag Azul Actitud",
            price: 32000,
            img: img,
            category: "Tote"
        },
        {
            id: 7,
            title: "Florera Decorativa",
            price: 25000,
            img: img,
            category: "Florera"
        },
        {
            id: 8,
            title: "Florera Premium",
            price: 35000,
            img: img,
            category: "Florera"
        }
    ];

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
                            <img src={product.img} alt={product.title} />
                            <h6>{product.title}</h6>
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
