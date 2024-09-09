import { useEffect, useState } from "react";
import { OrderCard } from "../../components/OrderCard";
import axios from "axios";

function OrderPending() {
  const [orderPendingdata, setOrderPending] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/orderpending')
      .then(res => {
        setOrderPending(res.data.data);
        console.log(res.data.data);
      })
      .catch(err => console.log(err));
  }, []);


  const handleDeleteOrder = (orderID) => {
    console.log(orderID)
    axios.delete(`http://localhost:8081/orderdelete/${orderID}`)
      .then(() => {
        setOrderPending((prevOrders) => prevOrders.filter(order => order.orderID !== orderID));
      })
      .catch(err => console.log(err));
  };

  const handleAcceptOrder = (orderID) => {
    axios.put(`http://localhost:8081/orderaccept/${orderID}`)
      .then(() => {
        window.location.reload();
        // setOrderPending((prevOrders) => prevOrders.filter(order => order.orderID !== orderID));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex w-full p-4 mt-8 ">
      <div className="flex flex-col w-full gap-6 lg:w-full">
        {Array.isArray(orderPendingdata) && orderPendingdata.map((orderpendingdata, index) => (
          <OrderCard key={index} data={orderpendingdata} onDelete={handleDeleteOrder} onAccept={handleAcceptOrder} title={orderpendingdata.status === 'pending' ? 'ACCEPT' : 'PAID'}/>
        ))}
      </div>
    </div>
  );
}

export default OrderPending;
