CREATE DATABASE TRANSPAIS;

USE TRANSPAIS;

CREATE TABLE `usuarios` (
  `id_usuario` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `correo` VARCHAR(100) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `puntos` INT NOT NULL DEFAULT 0
);

CREATE TABLE `autobuses` (
  `id_autobus` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `numero_autobus` VARCHAR(20) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `capacidad` INT NOT NULL
);

CREATE TABLE `asientos` (
  `id_asiento` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_autobus` INT NOT NULL,
  `numero_asiento` INT NOT NULL,
  `tipo_asiento` ENUM("normal", "rosa", "mascota") NOT NULL
);

CREATE TABLE `rutas` (
  `id_ruta` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_autobus` INT NOT NULL,
  `origen` VARCHAR(100) NOT NULL,
  `destino` VARCHAR(100) NOT NULL,
  `fecha_salida` DATE NOT NULL,
  `hora_salida` TIME NOT NULL,
  `hora_llegada` TIME NOT NULL,
  `precio` DECIMAL(10,2) NOT NULL
);

CREATE TABLE `estado_asientos_ruta` (
  `id_estado_asiento` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_ruta` INT NOT NULL,
  `id_asiento` INT NOT NULL,
  `ocupado` BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE `paradas` (
  `id_parada` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_ruta` INT NOT NULL,
  `nombre_parada` VARCHAR(100) NOT NULL,
  `orden` INT NOT NULL,
  `hora_aproximada` TIME NOT NULL
);

CREATE TABLE `boletos` (
  `id_boleto` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_ruta` INT NOT NULL,
  `id_asiento` INT NOT NULL,
  `fecha_compra` DATE NOT NULL,
  `expirado` BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE `tarjetas` (
  `id_tarjeta` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `numero` LONG NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `cvv` VARCHAR(4) NOT NULL,
  `fecha_vencimiento` DATE NOT NULL,
  `fecha_pago` DATE NOT NULL
);

ALTER TABLE `asientos` ADD FOREIGN KEY (`id_autobus`) REFERENCES `autobuses` (`id_autobus`);

ALTER TABLE `rutas` ADD FOREIGN KEY (`id_autobus`) REFERENCES `autobuses` (`id_autobus`);

ALTER TABLE `estado_asientos_ruta` ADD FOREIGN KEY (`id_ruta`) REFERENCES `rutas` (`id_ruta`);

ALTER TABLE `estado_asientos_ruta` ADD FOREIGN KEY (`id_asiento`) REFERENCES `asientos` (`id_asiento`);

ALTER TABLE `paradas` ADD FOREIGN KEY (`id_ruta`) REFERENCES `rutas` (`id_ruta`);

ALTER TABLE `boletos` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

ALTER TABLE `boletos` ADD FOREIGN KEY (`id_ruta`) REFERENCES `rutas` (`id_ruta`);

ALTER TABLE `boletos` ADD FOREIGN KEY (`id_asiento`) REFERENCES `asientos` (`id_asiento`);

ALTER TABLE `tarjetas` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

INSERT INTO autobuses (numero_autobus, nombre, capacidad) VALUES
('TP123', 'Transpais Ejecutivo', 40),
('TP124', 'Transpais Plus', 40);

INSERT INTO usuarios (nombre, correo, password, puntos) VALUES
('admin', 'admin@admin.com', 'admin1234', 0),
('Carlos Ramírez', 'carlos@mail.com', 'pass1234', 50),
('Ana Torres', 'ana@mail.com', 'secreta123', 120);

INSERT INTO asientos (id_autobus, numero_asiento, tipo_asiento) VALUES
(1, 1, 'rosa'),
(1, 2, 'normal'),
(1, 3, 'normal'),
(1, 4, 'rosa'),
(1, 5, 'rosa'),
(1, 6, 'normal'),
(1, 7, 'normal'),
(1, 8, 'rosa'),
(1, 9, 'normal'),
(1,10, 'normal'),
(1,11, 'normal'),
(1,12, 'normal'),
(1,13, 'normal'),
(1,14, 'normal'),
(1,15, 'normal'),
(1,16, 'normal'),
(1,17, 'normal'),
(1,18, 'normal'),
(1,19, 'normal'),
(1,20, 'normal'),
(1,21, 'normal'),
(1,22, 'normal'),
(1,23, 'normal'),
(1,24, 'normal'),
(1,25, 'normal'),
(1,26, 'normal'),
(1,27, 'normal'),
(1,28, 'normal'),
(1,29, 'normal'),
(1,30, 'normal'),
(1,31, 'normal'),
(1,32, 'normal'),
(1,33, 'normal'),
(1,34, 'normal'),
(1,35, 'normal'),
(1,36, 'normal'),
(1,37, 'normal'),
(1,38, 'normal'),
(1,39, 'normal'),
(1,40, 'normal');

INSERT INTO asientos (id_autobus, numero_asiento, tipo_asiento) VALUES
(2, 1, 'mascota'),
(2, 2, 'normal'),
(2, 3, 'normal'),
(2, 4, 'mascota'),
(2, 5, 'mascota'),
(2, 6, 'normal'),
(2, 7, 'normal'),
(2, 8, 'mascota'),
(2, 9, 'normal'),
(2,10, 'normal'),
(2,11, 'normal'),
(2,12, 'normal'),
(2,13, 'normal'),
(2,14, 'normal'),
(2,15, 'normal'),
(2,16, 'normal'),
(2,17, 'normal'),
(2,18, 'normal'),
(2,19, 'normal'),
(2,20, 'normal'),
(2,21, 'normal'),
(2,22, 'normal'),
(2,23, 'normal'),
(2,24, 'normal'),
(2,25, 'normal'),
(2,26, 'normal'),
(2,27, 'normal'),
(2,28, 'normal'),
(2,29, 'normal'),
(2,30, 'normal'),
(2,31, 'normal'),
(2,32, 'normal'),
(2,33, 'normal'),
(2,34, 'normal'),
(2,35, 'normal'),
(2,36, 'normal'),
(2,37, 'normal'),
(2,38, 'normal'),
(2,39, 'normal'),
(2,40, 'normal');

INSERT INTO rutas (id_autobus, origen, destino, fecha_salida, hora_salida, hora_llegada, precio) VALUES
(1, 'Ciudad Mante', 'Monterrey', '2025-06-01', '07:00:00', '12:00:00', 580.00),
(1, 'Ciudad Mante', 'Monterrey', '2025-06-02', '07:00:00', '12:00:00', 580.00),
(2, 'Tampico', 'Reynosa', '2025-06-01', '06:30:00', '11:15:00', 620.00),
(2, 'Tampico', 'Reynosa', '2025-06-03', '06:30:00', '11:15:00', 620.00);

INSERT INTO paradas (id_ruta, nombre_parada, orden, hora_aproximada) VALUES
(1, 'Ciudad Victoria', 1, '08:30:00'),
(1, 'Linares', 2, '10:00:00');

INSERT INTO paradas (id_ruta, nombre_parada, orden, hora_aproximada) VALUES
(3, 'Altamira', 1, '07:15:00'),
(3, 'San Fernando', 2, '09:30:00');

INSERT INTO estado_asientos_ruta (id_ruta, id_asiento, ocupado) VALUES
 (1, 2, true), (1, 4, true);

INSERT INTO estado_asientos_ruta (id_ruta, id_asiento, ocupado) VALUES
(3, 5, true), (3, 8, true);

INSERT INTO boletos (id_usuario, id_ruta, id_asiento, fecha_compra, expirado) VALUES
(1, 1, 2, '2025-05-25', false);

INSERT INTO boletos (id_usuario, id_ruta, id_asiento, fecha_compra, expirado) VALUES
(2, 3, 8, '2025-05-24', false);

INSERT INTO tarjetas (id_usuario, numero, nombre, cvv, fecha_vencimiento, fecha_pago) VALUES
(1, 1234567812345678, 'Carlos Ramírez', '123', '2027-05-01', '2025-05-25'),
(2, 9876543298765432, 'Ana Torres', '456', '2026-11-30', '2025-05-24');
