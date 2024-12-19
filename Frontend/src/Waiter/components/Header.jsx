import { useEffect, useState } from "react";
import sample_profile from "../../assets/chef.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectEmail, selectToken } from "../../Redux/Slices/LogiinSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function WaiterHeader() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [image, setImage] = useState(sample_profile);
  const [error, setError] = useState(null);
  const [bannerShow, setbannerShow] = useState([]);
  const [prevOrderCount, setPrevOrderCount] = useState(0);
	const [isFirstFetch, setIsFirstFetch] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const email = useSelector(selectEmail);
const toekenValid = useSelector(selectToken);

  useEffect(() => {
		let interval;

		const fetchData = async () => {
			try {
				const response = await axios.get(`${API_URL}/get_notification`, {
					withCredentials: true,
				});

				const newOrderCount = response.data.length;

				if (!isFirstFetch && newOrderCount > prevOrderCount) {
					toast(`New orders received!`);
				}

				// Update previous count state
				setPrevOrderCount(newOrderCount);
				setIsFirstFetch(false);
			} catch (error) {
				console.error("Error fetching notifications:", error);
			}
		};

		if (toekenValid) {
			fetchData(); // Fetch immediately
			interval = setInterval(fetchData, 5000); // Fetch every 5 seconds
		}

		return () => {
			clearInterval(interval);
		};
	}, [prevOrderCount, isFirstFetch, toekenValid]);

	// Update the current time every second
	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentDate(new Date());
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/waiterpicture/${email}`,{withCredentials:true}); // Update with the correct endpoint
        if (res.data.offerBanner) {
          setbannerShow(res.data.offerBanner[0]);
          // console.log(res.data.offerBanner);
        } else {
          setbannerShow([]);
          console.log("no data");
        }
      } catch (err) {
        setError("Error fetching waiter picture");
        console.error(err);
      }
    };

    if (email) {
      fetchData();
    }
  }, [email, API_URL]); // Added API_URL as a dependency

  return (
    <div className="bg-[#056A8B] text-white flex md:pb-4 md:pt-4 fixed w-full md:h-[70px] h-[55px] font-medium z-50">
      <ToastContainer
							position="top-center"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="dark"
						/>
      <div className="flex ml-3 h-full items-center">
        <img
          src={bannerShow.image_url}
          alt="Waiter Profile"
          className="w-8 rounded-full"
        />
      </div>
      <div className="w-full">
        <p className="md:mt-[15px] text-right md:mr-5 md:text-[16px] mt-[22px] mr-2 text-[11px] z-50">
          {currentDate.toLocaleTimeString()}
        </p>
      </div>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message if there's one */}
    </div>
  );
}

export default WaiterHeader;
