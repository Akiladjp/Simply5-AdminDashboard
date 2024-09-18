import axios from 'axios';
import React, { useEffect, useState } from 'react'
import OrderCard from '../components/OrderCard';

function DeliveredOreders() {
  const [orderAcceptdata, setOrderAccept] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/orderdelivered')
      .then(res => {
        setOrderAccept(res.data.data); // Update to set the data array
        console.log(res.data.data); // Log the response data
      })
      .catch(err => console.log(err));
  }, []);

  const handleDeleteOrder = (orderID) => {
    console.log(orderID)
    axios.delete(`http://localhost:8081/orderdelete/${orderID}`)
      .then(() => {
        setOrderAccept((prevOrders) => prevOrders.filter(order => order.orderID !== orderID));
      })
      .catch(err => console.log(err));
  };

  const handleAcceptOrder = (orderID) => {
    axios.put(`http://localhost:8081/orderstatusdelivered/${orderID}`)
      .then(() => {
        window.location.reload();
        // setOrderPending((prevOrders) => prevOrders.filter(order => order.orderID !== orderID));
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="pt-20 md:pt-28 flex flex-col gap-y-4">
      

      {Array.isArray(orderAcceptdata) && orderAcceptdata.map((orderacceptdata, index) => (
          <OrderCard key={index} data={orderacceptdata} onDelete={handleDeleteOrder} onAccept={handleAcceptOrder} title={orderacceptdata.status === 'accept' ? 'PAID' : ''}/>
          
        ))}
    </div>
  )
}

export default DeliveredOreders
