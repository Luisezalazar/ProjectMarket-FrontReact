import { useCategories } from "../hooks/useCategories"
import img from "../../public/img/Miaurket.png"
import { useNavigate } from "react-router-dom";

export const OtherProducts = () => {
  const navigate = useNavigate()
  const categories = useCategories();
  const excludeCategories = ["Tabaquera", "Jean", "Dypsi"]

  const otherModels = categories.filter((c) => !excludeCategories.includes(c.name))

  const handleModelClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };
  return (
    <>
      {
        otherModels.map((model) => (
          <div
            key={model.id}
            className="otherCard-container  me-2"
            onClick={() => handleModelClick(model.name)} >
            <img src={model.urlImage} className="modelImg" alt="..." />

            <div className="otherCard-body">
              <h2>{model.name}</h2>
            </div>
          </div>
        ))
      }

    </>
  )
}
