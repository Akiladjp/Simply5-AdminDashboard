import OrderCard from "../components/OrderCard"

function AcceptedOrders() {
  return (
    <div className="pt-20 md:pt-28">
      <OrderCard status="accepted" />
    </div>
  )
}

export default AcceptedOrders
