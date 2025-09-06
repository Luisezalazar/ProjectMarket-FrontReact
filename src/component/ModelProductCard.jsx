
import { useNavigate } from "react-router-dom"
import img from "../../public/img/Miaurket.png"
import { useCategories } from "../hooks/useCategories";


export const ModelProductCard = () => {
  const navigate = useNavigate();

  const categories = useCategories()
  
  const models = categories.filter(c =>["Tabaquera","Jean","Dypsi"].includes(c.name))

  const handleModelClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <>
      {models.map((model) => (
        <div
          key={model.id}
          className="modelCard-container"
          onClick={() => handleModelClick(model.name)}
          style={{ cursor: 'pointer' }}
        >
          <img src={model.urlImage} className="modelImg" alt={model.name} />
          <div className="modelCard-body">
            <h2 className="modelCard-title"><strong>{model.name}</strong></h2>
            <p><strong></strong></p>
          </div>
        </div>
      ))}
    </>
  )
}
