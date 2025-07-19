import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../../component/ProductCard";
import { ProductSidebar } from "../../component/ProductSidebar";
import img from "../../../public/img/Miaurket.png";

export const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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
    },
    {
      id: 9,
      title: "Florera En Combo Con Accesorios222",
      price: 29000,
      img: img,
      category: "Florera"
    },
    {
      id: 10,
      title: "Morral Bando Ceniza22",
      price: 36000,
      img: img,
      category: "Morral"
    },
    {
      id: 11,
      title: "Sabal Messi22",
      price: 28000,
      img: img,
      category: "Tabaquera"
    },
    {
      id: 12,
      title: "Tote Bag Negra Actitud22",
      price: 32000,
      img: img,
      category: "Tote"
    },
    {
      id: 13,
      title: "Tote Bag Roja Actitud22",
      price: 32000,
      img: img,
      category: "Tote"
    },
    {
      id: 14,
      title: "Tote Bag Azul Actitud22",
      price: 32000,
      img: img,
      category: "Tote"
    },
    {
      id: 15,
      title: "Florera Decorativa22",
      price: 25000,
      img: img,
      category: "Florera"
    },
    {
      id: 16,
      title: "Florera Premium22",
      price: 35000,
      img: img,
      category: "Florera"
    },
    {
      id: 17,
      title: "Florera En Combo Con Accesorios222",
      price: 29000,
      img: img,
      category: "Florera"
    },
    {
      id: 18,
      title: "Morral Bando Ceniza22",
      price: 36000,
      img: img,
      category: "Morral"
    },
    {
      id: 19,
      title: "Sabal Messi22",
      price: 28000,
      img: img,
      category: "Tabaquera"
    },
    {
      id: 20,
      title: "Tote Bag Negra Actitud22",
      price: 32000,
      img: img,
      category: "Tote"
    },
    {
      id: 21,
      title: "Tote Bag Roja Actitud22",
      price: 32000,
      img: img,
      category: "Tote"
    },
    {
      id: 22,
      title: "Tote Bag Azul Actitud22",
      price: 32000,
      img: img,
      category: "Tote"
    },
    {
      id: 23,
      title: "Florera Decorativa22",
      price: 25000,
      img: img,
      category: "Florera"
    },
    {
      id: 24,
      title: "Florera Premium22",
      price: 35000,
      img: img,
      category: "Florera"
    }
    
  ];

  const categories = [...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    console.log("Añadido al carrito:", product);
    // Aquí implementarías la lógica del carrito
  };

  const handleViewProduct = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="products-page">
      <div className="products-container">
        <ProductSidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <div className="products-grid-container">
          <div className="products-header">
            <h2>Nuestros productos</h2>
          </div>
          
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewProduct={handleViewProduct}
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="no-products">
              <p>No se encontraron productos que coincidan con los filtros seleccionados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
