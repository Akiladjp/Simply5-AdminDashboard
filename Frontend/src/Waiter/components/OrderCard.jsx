function OrderCard({ status }) {
  // Function to render buttons based on the status
  const renderButtons = () => {
    switch (status) {
      case 'pending':
        return (
          <>
          <div className="">
            <button className="px-1 py-1 text-sm font-medium text-[#007FA8]  rounded-none  border-[#007FA8] border-[1px] bg-white md:text-lg md:p-1 md:px-4">
              ACCEPT
            </button>
            <button className="px-[8px] py-1 text-sm font-medium text-white  rounded-none  border-[#007FA8] border-[1px] bg-[#007FA8]  md:text-lg md:ml-4  md:px-5 ml-2">
              DELETE
            </button>
          </div>     
          </>
        );
      case 'accepted':
        return (
          <button className="px-[12px] py-1 text-sm font-medium text-white  rounded-none  border-[#007FA8] border-[1px] bg-[#007FA8]  md:text-lg md:ml-4  md:px-6 ml-2">
            DONE
          </button>
        );
      case 'allOrders':
        return (
          <button className="px-[8px] py-1 text-sm font-medium text-white  rounded-none  border-[#007FA8] border-[1px] bg-[#007FA8]  md:text-lg md:ml-4  md:px-5 ml-2">
            DELETE
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-11/12 h-auto pt-4 pb-4 pl-4 pr-2 md:pt-6 md:pl-6 md:pb-6 md:pr-[17px] rounded-none border-[#007FA8] border-[1px] md:w-10/12 relative">
        <div className="flex ">
          <div className="flex gap-4 md:gap-8 ">
            <div className="bg-[#007FA8] rounded-full item-center justify-center w-6 h-6  md:w-8 md:h-8">
              <p className="items-center justify-center ml-[6px] text-xs md:text-sm font-medium text-white place-items-center mt-[4px] md:ml-[8px] md:mt-[6px]">
                01
              </p>
            </div>
            <div className="text-sm font-semibold md:text-lg mt-[3px]">
              <p>John Doe</p>
            </div>
          </div>
          <div className="ml-auto ">
            {renderButtons()}
          </div>
        </div>
        <div className="flex mt-4 ml-[4px] md:mt-6 ">
          <div className="flex gap-4 md:gap-8">
            <p className=" text-xs md:text-lg place-items-center mt-[2px] text-black font-semibold">
              01.
            </p>
            <p className="text-sm font-semibold md:text-lg">
              Chicken kottu
            </p>
          </div>
         <div className="flex gap-8 ml-auto mr-8 md:gap-10 md:mr-36">
          <p className="text-sm font-semibold md:text-lg">x</p>
            <p className="text-sm font-semibold md:text-lg">
              2
            </p>
          </div>
         </div>
      </div>
    </div>
  );
}

export default OrderCard;
