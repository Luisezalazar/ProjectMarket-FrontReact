export const ProductSidebar = ({
  searchTerm,
  setSearchTerm,
  setSelectedCategory,
  selectedCategory,
  categories
}) => {
  return (
    <div className="products-sidebar">
      <div className="sidebar-section">
        <h3>Buscar Productos</h3>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="sidebar-section">
        <h3>Categorías</h3>
        <div className="filter-options">
          <label className="filter-option">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ""}
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
            <span>Todas las categorías</span>
          </label>
          {categories.map((category) => (
            <label key={category} className="filter-option">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <button 
          className="clear-filters-btn"
          onClick={() => {
            setSearchTerm("");
          }}
        >
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
};