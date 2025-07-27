import { useNavigate } from "react-router-dom"

export const ModelProductCard = () => {
  const navigate = useNavigate();

  const models = [
    {
      id: 1,
      title: "Floreras",
      description: "Hermosas floreras para decorar tu hogar",
      category: "Florera",
      image: "../../public/img/Miaurket.png"
    },
    {
      id: 2,
      title: "Morrales",
      description: "Morrales cómodos y resistentes para el día a día",
      category: "Morral",
      image: "../../public/img/Miaurket.png"
    },
    {
      id: 3,
      title: "Tote Bags",
      description: "Bolsos tote elegantes y funcionales",
      category: "Tote",
      image: "../../public/img/Miaurket.png"
    }
  ];

  const handleModelClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <>
      {models.map((model) => (
        <div
          key={model.id}
          className="modelCard-container"
          onClick={() => handleModelClick(model.category)}
          style={{ cursor: 'pointer' }}
        >
          <img src={model.image} className="modelImg" alt={model.title} />
          <div className="modelCard-body">
            <h2 className="modelCard-title"><strong>{model.title}</strong></h2>
            <p><strong>{model.description}</strong></p>
          </div>
        </div>
      ))}
    </>
  )
}
