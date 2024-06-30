-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 30, 2024 at 07:13 AM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myrt`
--

-- --------------------------------------------------------

--
-- Table structure for table `surat_pengajuan`
--

CREATE TABLE `surat_pengajuan` (
  `id_surat` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `nohp` varchar(15) NOT NULL,
  `jenis_surat` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `tanggal` date NOT NULL,
  `informasi_tambahan` text DEFAULT NULL,
  `lampiran` longblob DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `surat_pengajuan`
--

INSERT INTO `surat_pengajuan` (`id_surat`, `nama`, `nohp`, `jenis_surat`, `deskripsi`, `tanggal`, `informasi_tambahan`, `lampiran`, `status`) VALUES
(1, 'Ali sofyan', '089723457890', 'Surat Keterangan Domisili', 'Permohonan surat keterangan domisili', '2024-06-29', 'Tidak ada', 0x6c616d706972616e2d313731393438383238383131302e706466, 'Diterima'),
(2, 'al', '09839523512', 'Surat Keterangan Domisili', '-', '2024-06-30', 'tidak ada', 0x6c616d706972616e2d313731393730343836323536362e706466, 'Ditolak'),
(3, 'Salsa', '083523135316', 'Surat Keterangan Domisili', 'egea', '2024-06-30', 'e', 0x6c616d706972616e2d313731393731393234373838362e706466, 'Pending'),
(4, 'Abdulloh', '09839523512', 'Surat Keterangan Domisili', '-', '2024-06-30', 'tidak ada', NULL, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('RT','Warga') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`, `role`) VALUES
(1, 'rtuser', 'rt123', 'RT'),
(2, 'wargauser', 'warga123', 'Warga');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `surat_pengajuan`
--
ALTER TABLE `surat_pengajuan`
  ADD PRIMARY KEY (`id_surat`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `surat_pengajuan`
--
ALTER TABLE `surat_pengajuan`
  MODIFY `id_surat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
