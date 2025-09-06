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
        <h3 className="bold">Buscar Productos</h3>
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
        {/* Desktop - Radio buttons */}
        <div className="filter-options d-none d-md-block">
          <label className="filter-option">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ""}
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
            <span className="bold">Todas las categorías</span>
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
              <span className="bold">{category}</span>
            </label>
          ))}
        </div>
        
        {/* Mobile - Select dropdown */}
        <div className="d-md-none">
          <select
            className="category-select-mobile"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="sidebar-section">
        <button 
          className="clear-filters-btn"
          onClick={() => {
            setSearchTerm("")
            setSelectedCategory("");
          }}
        >
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
};