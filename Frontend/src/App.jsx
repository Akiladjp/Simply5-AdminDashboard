import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	useNavigate,
	useLocation,
	Navigate,
} from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Login from "./pages/loginSystem/Login";

import OrderPending from "./pages/orders/OrderPending";
import OrderAccept from "./pages/orders/OrderAccept";
import OrderDelivered from "./pages/orders/OrderDelivered";
import OrderPaid from "./pages/orders/OrderPaid";

import ItemsMeals from "./pages/items/ItemsMeals";
import ItemsDrinks from "./pages/items/ItemsDrinks";
import ItemsDesserts from "./pages/items/ItemsDesserts";

import AnalysisItemToday from "./pages/analysis/AnalysisItemToday";
import AnalysisTimeToday from "./pages/analysis/AnalysisTimeToday";
import AnalysisItemWeek from "./pages/analysis/AnalysisItemWeek";
import AnalysisTimeWeek from "./pages/analysis/AnalysisTimeWeek";
import AnalysisItemMonth from "./pages/analysis/AnalysisItemMonth";
import AnalysisTimeMonth from "./pages/analysis/AnalysisTimeMonth";

import Employee from "./pages/employers/Employee";
import EmployeeForm from "./pages/employers/EmployeeForm";
import UpdateEmployee from "./pages/employers/UpdateEmployee";
import EmployeeSummary from "./pages/employers/EployeeSummary";
import EmpAdmin from "./pages/employers/EmpAdmin";

import MealsForm from "./pages/items/MealsForm";
import UpdateItem from "./pages/items/UpdateItem";

import Offers from "./pages/offers/Offers";

import "./App.css";


import ForgotPassword from "./pages/loginSystem/ForgotPassword";
import OTPInput from "./pages/loginSystem/OTPInput";
import ResetPassword from "./pages/loginSystem/ResetPassword";

import PendingOrders from "./Waiter/pages/PendingOrders";
import AcceptedOrders from "./Waiter/pages/AcceptedOrders";
import Profile from "./Waiter/pages/Profile";
import DeliveredOreders from "./Waiter/pages/DeliveredOreders.jsx";

import MainLayout from "./Layout/MainLayout.jsx";
import WaiterLayOut from "./Layout/WaiterLayout.jsx";




const router = createBrowserRouter([
	{
		path: "/app",
		element: <MainLayout />,
		children: [
			{ path: "/app/order/pending", element: <OrderPending /> },
			{ path: "/app/order/accept", element: <OrderAccept /> },
			{ path: "/app/order/delivered", element: <OrderDelivered /> },
			{ path: "/app/order/paid", element: <OrderPaid /> },

			{ path: "/app/items/meals", element: <ItemsMeals /> },
			{ path: "/app/items/drinks", element: <ItemsDrinks /> },
			{ path: "/app/items/desserts", element: <ItemsDesserts /> },

			{ path: "/app/analysis/todaytime", element: <AnalysisTimeToday /> },
			{ path: "/app/analysis/todayitem", element: <AnalysisItemToday /> },
			{ path: "/app/analysis/weektime", element: <AnalysisTimeWeek /> },
			{ path: "/app/analysis/weekitem", element: <AnalysisItemWeek /> },
			{ path: "/app/analysis/monthtime", element: <AnalysisTimeMonth /> },
			{ path: "/app/analysis/monthitem", element: <AnalysisItemMonth /> },

			{ path: "/app/employers/employee", element: <Employee /> },
			{ path: "/app/employers/admin", element: <EmpAdmin /> },
			{ path: "/app/employers/summaryemployee", element: <EmployeeSummary /> },
			{ path: "/app/employers/employeeform", element: <EmployeeForm /> },
			{
				path: "/app/employers/updateEmployee/:empID",
				element: <UpdateEmployee />,
			},

			{ path: "/app/items/updateitem/:itemID", element: <UpdateItem /> },
			{ path: "/app/items/add/:category", element: <MealsForm /> },

			{ path: "/app/offers", element: <Offers /> },
		],
	},
	//try this url::-- /Waiter/pending-orders
	{
		path: "/Waiter",
		element: <WaiterLayOut />,
		children: [
			{ path: "pending-orders", element: <PendingOrders /> },
			{ path: "accepted-orders", element: <AcceptedOrders /> },
			{ path: "delevered-orders", element: <DeliveredOreders /> },
			{ path: "profile", element: <Profile /> },
		],
	},
	{ path: "/", element: <Login /> },
	{ path: "/forgotpassword", element: <ForgotPassword /> },
	{ path: "/api/otp", element: <OTPInput /> },
	{ path: "/resetpassword", element: <ResetPassword /> },
]);

function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;
