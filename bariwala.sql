-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 30, 2022 at 07:41 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bariwala`
--

-- --------------------------------------------------------

--
-- Table structure for table `businesses`
--

CREATE TABLE `businesses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `gas_single` varchar(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gas_double` varchar(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `electricity` varchar(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `water` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `garbage` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `security` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `internet` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dish_antenna` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_charge` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `others` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` smallint(6) NOT NULL,
  `house_id` smallint(6) DEFAULT NULL,
  `flat_id` smallint(6) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `businesses`
--

INSERT INTO `businesses` (`id`, `gas_single`, `gas_double`, `electricity`, `water`, `garbage`, `security`, `internet`, `dish_antenna`, `service_charge`, `others`, `type`, `house_id`, `flat_id`, `created_at`, `updated_at`) VALUES
(1, '700', '800', '5', '100', '100', '500', '0', '0', '500', '0', 2, 1, NULL, '2022-06-27 05:03:47', '2022-06-27 05:03:47'),
(2, '700', '800', '0', '100', '100', '500', '0', '0', '500', '0', 1, 2, NULL, '2022-06-27 05:04:10', '2022-06-27 05:04:10');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `flats`
--

CREATE TABLE `flats` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `flat_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` decimal(8,2) NOT NULL,
  `booked` smallint(6) NOT NULL,
  `status` smallint(6) NOT NULL,
  `house_id` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `flats`
--

INSERT INTO `flats` (`id`, `flat_name`, `size`, `booked`, `status`, `house_id`, `created_at`, `updated_at`) VALUES
(1, 'Happy Home Flat 1', '1200.00', 1, 1, 1, '2022-06-27 03:35:05', '2022-06-27 03:36:06'),
(2, 'Khushi Villa Flat 1', '1200.00', 1, 1, 2, '2022-06-27 04:21:20', '2022-06-27 04:22:13'),
(3, 'Happy Home Flat 2', '1200.00', 1, 1, 1, '2022-06-27 04:55:04', '2022-06-27 04:55:53'),
(4, 'Khushi Villa Flat 2', '1200.00', 1, 1, 2, '2022-06-27 04:57:36', '2022-06-27 04:58:05');

-- --------------------------------------------------------

--
-- Table structure for table `houses`
--

CREATE TABLE `houses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `house_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `flat_numbers` smallint(6) NOT NULL,
  `user_id` smallint(6) NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `houses`
--

INSERT INTO `houses` (`id`, `house_name`, `address`, `flat_numbers`, `user_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Happy Home', 'Baridhara,Dhaka', 10, 1, 1, '2022-06-26 23:15:26', '2022-06-26 23:15:26'),
(2, 'Khushi Villa', 'Baridhara,Dhaka', 10, 1, 1, '2022-06-27 02:36:12', '2022-06-27 02:36:12');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tenant_id` smallint(6) NOT NULL,
  `gas` decimal(8,2) NOT NULL,
  `electricity` decimal(8,2) NOT NULL,
  `meter_reading` double(8,2) NOT NULL,
  `water` decimal(8,2) NOT NULL,
  `garbage` decimal(8,2) NOT NULL,
  `security` decimal(8,2) NOT NULL,
  `internet` decimal(8,2) NOT NULL,
  `dish_antenna` decimal(8,2) NOT NULL,
  `service` decimal(8,2) NOT NULL,
  `others` decimal(8,2) NOT NULL,
  `rent` decimal(8,2) NOT NULL,
  `total` decimal(8,2) NOT NULL,
  `paid` decimal(8,2) NOT NULL,
  `due` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `tenant_id`, `gas`, `electricity`, `meter_reading`, `water`, `garbage`, `security`, `internet`, `dish_antenna`, `service`, `others`, `rent`, `total`, `paid`, `due`, `created_at`, `updated_at`) VALUES
(1, 1, '700.00', '500.00', 200.00, '100.00', '100.00', '500.00', '0.00', '0.00', '500.00', '0.00', '12000.00', '14400.00', '14400.00', '0.00', '2022-05-27 06:27:52', '2022-05-27 06:27:52');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tenants`
--

CREATE TABLE `tenants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `flat_id` smallint(6) NOT NULL,
  `rent` decimal(8,2) NOT NULL,
  `rent_start_date` date NOT NULL,
  `rent_end_date` date DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `billing_type` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tenants`
--

INSERT INTO `tenants` (`id`, `first_name`, `last_name`, `email`, `phone`, `flat_id`, `rent`, `rent_start_date`, `rent_end_date`, `status`, `billing_type`, `created_at`, `updated_at`) VALUES
(1, 'Happy Home', 'Tenant 1', 'happyhome1@gmail.com', '01738157543', 1, '12000.00', '2022-06-01', NULL, 1, 0, '2022-06-27 03:36:06', '2022-06-27 03:36:06'),
(2, 'Khushi villa', 'Tenant', 'kushivilla1@gmail.com', '01738157543', 2, '12000.00', '2022-06-01', NULL, 1, 0, '2022-06-27 04:22:13', '2022-06-27 04:22:13'),
(3, 'Mostakim', 'Rahman', 'mostakimrahman@gmail.com', '01738157543', 3, '12000.00', '2022-06-01', NULL, 1, 1, '2022-06-27 04:55:53', '2022-06-27 04:55:53'),
(4, 'Mostak', 'Rahman', 'mostakimrahman@gmail.com', '01738157543', 4, '12000.00', '2022-06-01', NULL, 1, 1, '2022-06-27 04:58:05', '2022-06-27 04:58:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `verified` smallint(6) NOT NULL,
  `status` smallint(6) NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `phone`, `email`, `email_verified_at`, `password`, `verified`, `status`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin1', '01738157543', 'admin1@gmail.com', NULL, '$2y$10$/UZN9xZs7/Ce7xSWQH9Sr.nRBNz6h2vUdMHptATBPCA1Ee6lDbySK', 1, 1, NULL, '2022-06-06 02:19:21', '2022-06-06 02:19:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `businesses`
--
ALTER TABLE `businesses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `flats`
--
ALTER TABLE `flats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `houses`
--
ALTER TABLE `houses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `tenants`
--
ALTER TABLE `tenants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `businesses`
--
ALTER TABLE `businesses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `flats`
--
ALTER TABLE `flats`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `houses`
--
ALTER TABLE `houses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tenants`
--
ALTER TABLE `tenants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
