import { useEffect, useState } from 'react';
import { OrderCard } from '../../components/OrderCard'
import Searchbar from '../../components/Searchbar'
import axios from 'axios';
import { SearchComp } from '../../components/SearchComp';

function OrderAccept() {
  const [orderAcceptdata, setOrderAccept] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/orderaccepted')
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
    axios.put(`http://localhost:8081/orderstatuspaid/${orderID}`)
      .then(() => {
        window.location.reload();
        // setOrderPending((prevOrders) => prevOrders.filter(order => order.orderID !== orderID));
      })
      .catch(err => console.log(err));
  };
  return (
    
    <div className=' w-full   flex flex-col  mt-8 p-4 '>
      <div className="searchbar ">
        {/* <Searchbar /> */}
        <SearchComp/>
      </div>
      <div className='flex flex-col gap-6 w-full lg:w-full'>
        {Array.isArray(orderAcceptdata) && orderAcceptdata.map((orderacceptdata, index) => (
          <OrderCard key={index} data={orderacceptdata} onDelete={handleDeleteOrder} onAccept={handleAcceptOrder} title={orderacceptdata.status === 'accept' ? 'PAID' : ''}/>
        ))}
        
      </div>
    </div>
  )
}

export default OrderAccept