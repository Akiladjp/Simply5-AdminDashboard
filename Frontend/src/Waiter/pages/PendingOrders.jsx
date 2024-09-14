
import OrderCard from '../components/OrderCard';

function PendingOrders() {
  return (
    <div className="pt-20 md:pt-28"> 
      <OrderCard status="pending" />
    </div>
  );
}

export default PendingOrders;
