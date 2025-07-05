export const ProductCard = ({ img, title, price }) => {
  return (
    <>
        <div className="card-container  me-2">
          <img src="../../public/img/Miaurket.png" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p><strong>${price}</strong></p>
            <p className="small">Disponible en 3 cuotas</p>
          </div>
        </div>
    </>
  )
}
