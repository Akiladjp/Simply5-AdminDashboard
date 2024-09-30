import { useEffect, useState } from 'react';
import { OrderCard } from '../../components/OrderCard';
import { SearchComp } from '../../components/SearchComp';
import axios from 'axios';

function OrderPaid() {
  const [orderPaiddata, setOrderPaid] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let url = 'http://localhost:8081/orderpaid';
    
    if (searchTerm) {
      url += `?mobileNo=${searchTerm}`;
    }

    axios.get(url)
      .then(res => {
        setOrderPaid(res.data.data);
        console.log(res.data.data);
      })
      .catch(err => console.log(err));
  }, [searchTerm]);

  const handleAcceptOrder = (orderID) => {
    axios.delete(`http://localhost:8081/orderpaiddelete/${orderID}`)
      .then(() => {
        setOrderPaid((prevOrders) => prevOrders.filter(order => order.orderID !== orderID));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='w-full flex flex-col mt-8 p-4'>
      <div className="searchbar">
        <SearchComp setSearchTerm={setSearchTerm} />
      </div>
      <div className='flex flex-col gap-6 w-full lg:w-full'>
        {Array.isArray(orderPaiddata) && orderPaiddata.length > 0 ? (
          orderPaiddata.map((orderpaiddata, index) => (
            <OrderCard 
              key={index} 
              data={orderpaiddata} 
              onAccept={handleAcceptOrder} 
              title={orderpaiddata.status === 'paid' ? 'DELETE' : ''} 
            />
          ))
        ) : (
          <div className='text-center text-gray-500'>
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderPaid;
