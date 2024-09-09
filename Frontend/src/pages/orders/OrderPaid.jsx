import { useEffect, useState } from 'react';
import { OrderCard } from '../../components/OrderCard'
// import Searchbar from '../../components/Searchbar'
import {SearchComp} from '../../components/SearchComp'
import axios from 'axios';

function OrderPaid() {
  const [orderPaiddata, setOrderPaid] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/orderpaid')
      .then(res => {
        setOrderPaid(res.data.data);
        console.log(res.data.data);
      })
      .catch(err => console.log(err));
  }, []);



  // const handleDeleteOrder = (orderID) => {
  //   console.log(orderID)
  //   axios.delete(`http://localhost:8081/orderdelete/${orderID}`)
  //     .then(() => {
  //       setOrderPending((prevOrders) => prevOrders.filter(order => order.orderID !== orderID));
  //     })
  //     .catch(err => console.log(err));
  // };

  const handleAcceptOrder = (orderID) => {
    axios.delete(`http://localhost:8081/orderpaiddelete/${orderID}`)
      .then(() => {
        //setOrderPaid((prevOrders) => prevOrders.filter(order => order.orderID !== orderID));
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
        {Array.isArray(orderPaiddata) && orderPaiddata.map((orderpaiddata, index) => (
          <OrderCard key={index} data={orderpaiddata} onAccept={handleAcceptOrder} title={orderpaiddata.status === 'paid' ? 'DELETE' : ''} />
        ))}

      </div>
    </div>
  )
}


export default OrderPaid