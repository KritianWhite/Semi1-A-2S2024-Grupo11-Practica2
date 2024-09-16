-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema photobucket
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema photobucket
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `photobucket` DEFAULT CHARACTER SET utf8 ;
USE `photobucket` ;

-- -----------------------------------------------------
-- Table `photobucket`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `photobucket`.`usuario` ;

CREATE TABLE IF NOT EXISTS `photobucket`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `url_foto` VARCHAR(200) NOT NULL,
  `face_id_habilitado` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'No existe el boolean entonces usar 1 o 0',
  `fecha_creacion` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) VISIBLE,
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `photobucket`.`rostos_usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `photobucket`.`rostos_usuarios` ;

CREATE TABLE IF NOT EXISTS `photobucket`.`rostos_usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `aws_face_id` VARCHAR(255) NOT NULL COMMENT 'ID de reconocimiento facial de AWS Rekognition',
  `url_foto_s3` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_rostos_usuarios_usuario_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_rostos_usuarios_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `photobucket`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `photobucket`.`album`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `photobucket`.`album` ;

CREATE TABLE IF NOT EXISTS `photobucket`.`album` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_album_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_album_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `photobucket`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `photobucket`.`imagen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `photobucket`.`imagen` ;

CREATE TABLE IF NOT EXISTS `photobucket`.`imagen` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `album_id` INT NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `url_s3` VARCHAR(255) NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  `fecha_creacion` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_imagen_album1_idx` (`album_id` ASC) VISIBLE,
  CONSTRAINT `fk_imagen_album1`
    FOREIGN KEY (`album_id`)
    REFERENCES `photobucket`.`album` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
