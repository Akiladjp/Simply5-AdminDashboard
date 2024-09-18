
import axios from 'axios';
import OrderCard from '../components/OrderCard'
import { useEffect, useState } from 'react';


function AllOrders() {
  
    const [orderPendingdata, setOrderPending] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/orderpending')
      .then(res => {
        setOrderPending(res.data.data);
      
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
    <div className="pt-20 md:pt-28">
    {Array.isArray(orderPendingdata) && orderPendingdata.map((orderpendingdata, index) => (
          <OrderCard key={index} data={orderpendingdata} onDelete={handleDeleteOrder} onAccept={handleAcceptOrder} title={orderpendingdata.status === 'pending' ? 'ACCEPT' : 'PAID'}/>
        ))}
      
    </div>
  )
}

export default AllOrders
