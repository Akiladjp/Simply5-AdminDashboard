-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2024 at 02:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simply5`
--

-- --------------------------------------------------------

--
-- Table structure for table `add_cart`
--

CREATE TABLE `add_cart` (
  `mobileno` int(10) NOT NULL,
  `itemID` int(10) NOT NULL,
  `quantity` int(5) NOT NULL,
  `feedback_state` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `date` date DEFAULT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `add_cart`
--

INSERT INTO `add_cart` (`mobileno`, `itemID`, `quantity`, `feedback_state`, `state`, `date`, `time`) VALUES
(224577878, 5, 1, '', 'accept', '2024-12-19', '15:26:56'),
(312547865, 5, 2, '', 'accept', '2024-12-19', '12:10:02'),
(312547865, 5, 2, '', 'accept', '2024-12-19', '12:21:02'),
(312547865, 5, 2, '', 'accept', '2024-12-19', '12:21:49'),
(312547865, 5, 2, '', 'accept', '2024-12-19', '12:23:41'),
(312547865, 5, 2, '', 'accept', '2024-12-19', '13:27:36'),
(312547865, 6, 1, '', 'accept', '2024-12-19', '12:24:20'),
(312547865, 10, 1, '', 'accept', '2024-12-19', '12:24:24'),
(375759569, 4, 1, '', 'accept', '2024-12-19', '07:48:50'),
(375759569, 4, 1, '', 'accept', '2024-12-19', '07:53:25'),
(375759569, 4, 3, '', 'accept', '2024-12-19', '07:53:38'),
(375759569, 4, 1, '', 'accept', '2024-12-19', '08:03:39'),
(375759569, 5, 1, '', 'accept', '2024-12-19', '07:49:09'),
(711115856, 4, 1, '', 'accept', '2024-12-19', '23:44:18'),
(711115856, 6, 1, '', 'accept', '2024-12-19', '23:45:21'),
(711115856, 18, 1, '', 'accept', '2024-12-19', '23:45:14'),
(711115856, 27, 1, '', 'accept', '2024-12-19', '23:44:16'),
(748512354, 20, 1, '', 'placeOrder', '2024-12-20', '06:55:59'),
(748512354, 27, 1, '', 'placeOrder', '2024-12-20', '06:55:49'),
(767450489, 10, 2, '', 'placeOrder', '2024-12-20', '06:51:53'),
(767450489, 18, 1, '', 'placeOrder', '2024-12-20', '06:51:55'),
(767450489, 21, 1, '', 'placeOrder', '2024-12-20', '06:52:00'),
(768302810, 18, 1, '', 'accept', '2024-12-19', '23:49:34'),
(768302810, 20, 1, '', 'accept', '2024-12-19', '23:49:37'),
(768302810, 22, 1, '', 'accept', '2024-12-19', '23:49:04'),
(768302810, 24, 1, '', 'accept', '2024-12-19', '23:49:10'),
(768302810, 25, 1, '', 'accept', '2024-12-19', '23:49:14'),
(769685654, 19, 1, '', 'placeOrder', '2024-12-20', '06:55:06'),
(773189716, 4, 1, '', 'add', '2024-12-20', '06:50:01'),
(773189716, 4, 1, '', 'accept', '2024-12-19', '21:53:21'),
(773189716, 4, 1, '', 'accept', '2024-12-19', '21:54:21'),
(773189716, 4, 1, '', 'accept', '2024-12-19', '21:56:06'),
(773189716, 4, 1, '', 'accept', '2024-12-19', '21:59:07'),
(773189716, 4, 1, '', 'accept', '2024-12-19', '21:59:44'),
(773189716, 4, 1, '', 'accept', '2024-12-19', '22:03:29'),
(773189716, 4, 1, '', 'accept', '2024-12-19', '22:05:04'),
(773189716, 4, 1, '', 'accept', '2024-12-19', '22:06:14'),
(773189716, 4, 1, '', 'accept', '2024-12-19', '22:11:48'),
(773189716, 4, 1, '', 'accept', '2024-12-19', '22:25:26'),
(773189716, 4, 1, '', 'accept', '2024-12-19', '22:26:04'),
(773189716, 4, 1, '', 'accept', '2024-12-19', '22:28:43'),
(773189716, 4, 1, '', 'accept', '2024-12-19', '23:17:33'),
(773189716, 5, 1, '', 'accept', '2024-12-19', '22:24:58'),
(773189716, 5, 1, '', 'accept', '2024-12-19', '22:26:12'),
(773189716, 5, 1, '', 'accept', '2024-12-19', '22:27:13'),
(773189716, 5, 1, '', 'accept', '2024-12-19', '22:29:35'),
(773189716, 5, 2, '', 'accept', '2024-12-19', '23:17:39'),
(773189716, 6, 1, '', 'accept', '2024-12-19', '23:17:43'),
(773189716, 8, 1, '', 'placeOrder', '2024-12-19', '22:14:15'),
(773189716, 10, 1, '', 'placeOrder', '2024-12-19', '22:12:46'),
(773189716, 21, 1, '', 'accept', '2024-12-19', '20:38:28'),
(773189716, 21, 1, '', 'accept', '2024-12-19', '23:36:12'),
(773189716, 27, 1, '', 'accept', '2024-12-19', '23:36:08'),
(774512587, 6, 1, '', 'accept', '2024-12-19', '17:11:17'),
(774512587, 8, 1, '', 'accept', '2024-12-19', '17:11:07'),
(774512587, 18, 1, '', 'accept', '2024-12-19', '17:10:40'),
(784512545, 6, 1, '', 'placeOrder', '2024-12-20', '06:54:03'),
(784512545, 18, 1, '', 'placeOrder', '2024-12-20', '06:54:09'),
(784512545, 23, 1, '', 'placeOrder', '2024-12-20', '06:53:46'),
(784512545, 24, 1, '', 'placeOrder', '2024-12-20', '06:53:49');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `empID` int(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `otp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`empID`, `email`, `password`, `otp`) VALUES
(1000, 'nisaladeshan5@gmail.com', '$2b$10$65fRglvJYCdNQ52NztBbZOQDn2a4psfHsKpLZiKyNjvHgJx1mHILa', 0),
(1001, 'k9185.dhanuska@gmail.com', '$2b$10$WOXJbYd6JpvGHjuJgC.7q.KaEn/byY0.LpqSfqvi2K2H.kVpVc3Xu', 0),
(1006, 'thisaruniroshan300@gmail.com', '$2b$10$5qQmJIiR.BuzV37JfQ1wa.wwpA1zxuYMLsIr/9qPwgawHzFfmfp3y', 0),
(1007, 'nisaladeshan10@gmail.com', '$2b$10$.LLQVxADpayGbbWINuefau7E/mcTwPll4t8eoKfPHPxVjIbAhvfeS', 0);

-- --------------------------------------------------------

--
-- Table structure for table `contains`
--

CREATE TABLE `contains` (
  `orderID` int(11) NOT NULL,
  `itemID` int(11) NOT NULL,
  `quantity` int(10) NOT NULL,
  `feedback_state` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contains`
--

INSERT INTO `contains` (`orderID`, `itemID`, `quantity`, `feedback_state`) VALUES
(233, 4, 1, ''),
(233, 5, 2, ''),
(233, 6, 1, ''),
(234, 21, 1, ''),
(234, 27, 1, ''),
(235, 4, 1, ''),
(235, 27, 1, ''),
(236, 6, 1, ''),
(236, 18, 1, ''),
(237, 22, 1, ''),
(237, 24, 1, ''),
(237, 25, 1, ''),
(238, 18, 1, ''),
(238, 20, 1, ''),
(239, 10, 2, ''),
(239, 18, 1, ''),
(239, 21, 1, ''),
(240, 6, 1, ''),
(240, 18, 1, ''),
(240, 23, 1, ''),
(240, 24, 1, ''),
(241, 19, 1, ''),
(242, 20, 1, ''),
(242, 27, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `employer`
--

CREATE TABLE `employer` (
  `empID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `position` varchar(50) NOT NULL,
  `phoneNo` int(10) NOT NULL,
  `NIC` varchar(12) NOT NULL,
  `birthDate` date NOT NULL,
  `joinedDate` date NOT NULL,
  `address` varchar(500) NOT NULL,
  `image_link` varchar(500) NOT NULL,
  `isAdmin` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employer`
--

INSERT INTO `employer` (`empID`, `name`, `position`, `phoneNo`, `NIC`, `birthDate`, `joinedDate`, `address`, `image_link`, `isAdmin`) VALUES
(1000, 'Nisala Deshan', 'Manager', 784512456, '00000000001', '2024-07-24', '2024-06-27', 'Gampaha', 'employee_bucket/person1.png', 1),
(1001, 'dhanushka', 'Waiter', 773189716, '992431407v', '2024-10-04', '2024-10-02', 'kurunegala', 'employee_bucket/pexels-snapwire-6945.jpg', 1),
(1005, 'Akila', 'Cheff', 785462591, '789562412025', '1999-07-30', '2024-09-30', 'Badulla', 'employee_bucket/cheff.jpg', 0),
(1006, 'Thisaru', 'Cashier', 775698953, '123456789012', '2002-06-27', '2023-02-14', 'Rathnapura', 'employee_bucket/cashier.jpg', 1),
(1007, 'Akila', 'Waiter', 774512369, '000000000000', '2024-10-16', '2024-10-21', 'Badulla', 'employee_bucket/waiter_110620211.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `itemID` int(10) NOT NULL,
  `category` varchar(11) NOT NULL,
  `sub_category` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(20) NOT NULL,
  `available` varchar(20) NOT NULL,
  `prepare_time` int(5) NOT NULL,
  `description` varchar(120) NOT NULL,
  `rate` decimal(10,2) NOT NULL,
  `number_of_reviewer` int(11) NOT NULL,
  `image_link` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`itemID`, `category`, `sub_category`, `name`, `price`, `available`, `prepare_time`, `description`, `rate`, `number_of_reviewer`, `image_link`) VALUES
(4, 'Meals', 'Main Course', 'Basmati Rice', 650, 'AVAILABLE', 10, 'Aromatic long-grain rice.a', 3.60, 5, 'item_bucket/Basmati Rice.jpg'),
(5, 'Meals', 'Street Food', 'Chicken Kottu', 500, 'AVAILABLE', 10, 'Stir-fried roti with chicken.', 2.78, 9, 'item_bucket/Chicken Kottu.jpg'),
(6, 'Meals', 'Main Course', 'Egg Noodles', 300, 'AVAILABLE', 10, 'Stir-fried noodles with eggs.', 2.83, 31, 'item_bucket/Egg Noodles.jpg'),
(7, 'Meals', 'Italian', 'Spaghetti Bolognese', 600, 'AVAILABLE', 10, 'Classic Italian pasta with meat sauce.', 2.62, 8, 'item_bucket/Spaghetti Bolognese.jpg'),
(8, 'Meals', 'Fast Food', 'Beef Burger', 450, 'AVAILABLE', 10, 'Juicy beef patty with fresh toppings.', 2.72, 7, 'item_bucket/Beef Burger.jpg'),
(9, 'Meals', 'Italian', 'Margherita Pizza', 700, 'AVAILABLE', 10, 'Classic pizza with tomato, mozzarella, and basil.', 2.56, 26, 'item_bucket/Margherita Pizza.jpg'),
(10, 'Meals', 'Main Course', 'Chicken Biriyani', 550, 'AVAILABLE', 10, 'Flavorful rice with marinated chicken.', 3.19, 25, 'item_bucket/Chicken Biriyani.jpg'),
(11, 'Meals', 'Street Food', 'Fish Tacos', 400, 'AVAILABLE', 10, 'Crispy fish with fresh toppings.', 2.62, 8, 'item_bucket/Fish Tacos.jpg'),
(12, 'Meals', 'Main Course', 'Grilled Salmon', 800, 'AVAILABLE', 10, 'Grilled salmon with lemon butter sauce.', 1.55, 8, 'item_bucket/Grilled Salmon.jpg'),
(13, 'Meals', 'Main Course', 'Paneer Butter Masala', 400, 'AVAILABLE', 10, 'Cottage cheese in creamy tomato gravy.', 0.00, 0, 'item_bucket/Paneer Butter Masala.jpg'),
(14, 'Meals', 'Main Course', 'Mutton Curry', 750, 'AVAILABLE', 10, 'Tender mutton cooked in spicy gravy.', 0.00, 0, 'item_bucket/Mutton Curry.jpg'),
(15, 'Meals', 'Street Food', 'Vada Pav', 100, 'AVAILABLE', 10, 'Spicy potato fritter in a bun.', 0.00, 0, 'item_bucket/Vada Pav.jpg'),
(16, 'Meals', 'Main Course', 'Butter Chicken', 600, 'AVAILABLE', 10, 'Creamy tomato-based chicken curry.', 0.00, 0, 'item_bucket/Butter Chicken.jpg'),
(18, 'Drinks', 'Beverage', 'Mango Smoothie', 220, 'AVAILABLE', 10, 'Refreshing mango smoothie.', 2.78, 9, 'item_bucket/Mango Smoothie.jpg'),
(19, 'Drinks', 'Beverage', 'Lemon Iced Tea', 120, 'AVAILABLE', 10, 'Refreshing iced tea with lemon.', 2.67, 9, 'item_bucket/Lemon Iced Tea.webp'),
(20, 'Drinks', 'Beverage', 'Cold Coffee', 200, 'AVAILABLE', 10, 'Iced coffee with milk and sugar.', 2.67, 6, 'item_bucket/Cold Coffee.jpg'),
(21, 'Desserts', 'Cake', 'Chocolate Cake', 100, 'AVAILABLE', 10, 'Rich chocolate cake with ganache.', 3.00, 4, 'item_bucket/Chocolate Cake.jpg'),
(22, 'Desserts', 'Ice Cream', 'Vanilla Ice Cream', 200, 'AVAILABLE', 10, 'Creamy vanilla ice cream.', 0.00, 0, 'item_bucket/Vanilla Ice Cream.jpg'),
(23, 'Desserts', 'Traditional', 'Gulab Jamun', 300, 'AVAILABLE', 10, 'Soft dough balls soaked in syrup.', 0.00, 0, 'item_bucket/Gulab Jamun.jpg'),
(24, 'Desserts', 'Pastry', 'Brownie', 250, 'AVAILABLE', 10, 'Rich chocolate brownie.', 0.00, 0, 'item_bucket/Brownie.jpg'),
(25, 'Desserts', 'Sweets', 'Pani Puri', 100, 'AVAILABLE', 10, 'Crispy puris filled with tangy water.', 0.00, 0, 'item_bucket/Pani Puri.jpg'),
(26, 'Desserts', 'Traditional', 'Gajar Halwa', 300, 'AVAILABLE', 10, 'Carrot-based sweet dessert.', 0.00, 0, 'item_bucket/Gajar Halwa.jpg'),
(27, 'Desserts', 'Pastry', 'Cheesecake', 500, 'AVAILABLE', 10, 'Creamy cheesecake with a biscuit base.', 3.25, 4, 'item_bucket/Cheesecake.jpg'),
(28, 'Desserts', 'Sweets', 'Rasgulla', 250, 'AVAILABLE', 10, 'Spongy soft cheese balls in syrup.', 0.00, 0, 'item_bucket/Rasgulla.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `offers`
--

CREATE TABLE `offers` (
  `offerID` int(10) NOT NULL,
  `image_link` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `offers`
--

INSERT INTO `offers` (`offerID`, `image_link`, `status`) VALUES
(3, 'offers_bucket/Screenshot 2024-10-10 123816.png', 'enable'),
(4, 'offers_bucket/Screenshot 2024-10-10 123831.png', 'enable'),
(5, 'offers_bucket/Screenshot 2024-10-10 123902.png', 'enable'),
(6, 'offers_bucket/Screenshot 2024-10-10 123845.png', 'enable');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderID` int(11) NOT NULL,
  `mobileNo` int(10) NOT NULL,
  `tableNo` int(3) NOT NULL,
  `status` varchar(20) NOT NULL,
  `total` int(20) NOT NULL,
  `time` time NOT NULL,
  `date` date NOT NULL,
  `waiterID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderID`, `mobileNo`, `tableNo`, `status`, `total`, `time`, `date`, `waiterID`) VALUES
(233, 773189716, 1, 'delivered', 2145, '11:17:51', '2024-12-19', 1001),
(234, 773189716, 1, 'accept', 660, '11:36:17', '2024-12-19', 1007),
(235, 711115856, 1, 'accept', 1265, '11:44:22', '2024-12-19', 1001),
(236, 711115856, 1, 'accept', 572, '11:45:26', '2024-12-19', 1001),
(237, 768302810, 1, 'accept', 605, '11:49:18', '2024-12-19', 1001),
(238, 768302810, 1, 'pending', 462, '11:49:41', '2024-12-19', 1001),
(239, 767450489, 1, 'pending', 1562, '06:52:04', '2024-12-20', 0),
(240, 784512545, 1, 'pending', 1177, '06:54:26', '2024-12-20', 0),
(241, 769685654, 1, 'pending', 132, '06:55:11', '2024-12-20', 0),
(242, 748512354, 1, 'pending', 770, '06:56:05', '2024-12-20', 0);

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `commentID` int(11) NOT NULL,
  `empID` int(11) NOT NULL,
  `date` date NOT NULL,
  `comment` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`commentID`, `empID`, `date`, `comment`) VALUES
(22, 1001, '2024-10-06', 'Excellent'),
(23, 1001, '2024-10-16', 'Over 500+ professionally designed, fully responsive, expertly crafted component '),
(24, 1007, '2024-10-15', 'good'),
(25, 0, '2024-10-22', 'Good, asdfads'),
(26, 0, '2024-12-17', ', GOOD'),
(27, 0, '2024-12-17', 'Excellent, hmmm'),
(28, 1001, '2024-12-18', 'Excellent, aaa'),
(29, 1001, '2024-12-18', ', aaa'),
(30, 1001, '2024-12-18', 'Excellent, aa');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `name` varchar(50) NOT NULL,
  `phoneNo` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`name`, `phoneNo`) VALUES
('Raveesha', 711115856),
('Ravidu', 713189716),
('Asintha', 748512354),
('channa', 767450489),
('Deeptha', 768302810),
('nipun', 769685654),
('chanuka', 773189716),
('Ravidu', 784512545);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_cart`
--
ALTER TABLE `add_cart`
  ADD PRIMARY KEY (`mobileno`,`itemID`,`time`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`empID`);

--
-- Indexes for table `contains`
--
ALTER TABLE `contains`
  ADD PRIMARY KEY (`orderID`,`itemID`);

--
-- Indexes for table `employer`
--
ALTER TABLE `employer`
  ADD PRIMARY KEY (`empID`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`itemID`);

--
-- Indexes for table `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`offerID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderID`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`commentID`,`empID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`phoneNo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `empID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1011;

--
-- AUTO_INCREMENT for table `employer`
--
ALTER TABLE `employer`
  MODIFY `empID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1008;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `itemID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `offers`
--
ALTER TABLE `offers`
  MODIFY `offerID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=243;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `commentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
