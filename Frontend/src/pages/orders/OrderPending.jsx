import { useEffect, useState } from "react";
import { OrderCard } from "../../components/OrderCard";
import axios from "axios";
import { selectToken } from "../../Redux/Slices/LogiinSlice";
import { useSelector } from "react-redux";

function OrderPending() {
  const [orderPendingdata, setOrderPending] = useState([]);
const isSetToken = useSelector(selectToken)
  useEffect(() => {
    const fetchOrder= async()=>{

      axios.get('http://localhost:8081/orderpending',{withCredentials:true})
      .then(res => {
        setOrderPending(res.data.data);
        
        console.log(res);
      })
      .catch(err => console.log(err));
    }
    if(isSetToken){
      fetchOrder()
    }
  }, []);


  const handleDeleteOrder = (orderID) => {
    console.log(orderID)
    axios.delete(`http://localhost:8081/orderdelete/${orderID}`,{withCredentials:true})
      .then(() => {
        setOrderPending((prevOrders) => prevOrders.filter(order => order.orderID !== orderID));
      })
      .catch(err => console.log(err));
  };

  const handleAcceptOrder = (orderID) => {
    console.log("in handleAcceptOrder");
    axios.put(`http://localhost:8081/orderaccept/${orderID}`,{},{withCredentials:true})
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
          <OrderCard key={index} data={orderpendingdata} onDelete={handleDeleteOrder} onAccept={handleAcceptOrder} title={orderpendingdata.status === 'pending' ? 'ACCEPT' : ''} buttontextColor={orderpendingdata.status === "pending" ? "text-[rgb(255,255,255)]": ""} borderColor={orderpendingdata.status === "pending" ? "border-[rgb(0,127,168)]": ""} buttonColor={orderpendingdata.status === "pending" ? "bg-[rgb(0,127,168)]": ""}/>
        ))}
      </div>
    </div>
  );
}

export default OrderPending;
