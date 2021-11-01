CREATE DATABASE project_database;
\c project_database

CREATE TABLE Client (
  id serial PRIMARY KEY,
  name varchar(255),
  phone integer,
  inn integer
);

CREATE TABLE Orders (
  id serial PRIMARY KEY,
  date DATE 
  
);

CREATE TABLE Raw_material (
  id serial PRIMARY KEY,
  name varchar(255) UNIQUE,
  name_units varchar(255)

);

CREATE TABLE Price (
  id serial PRIMARY KEY,
  coast integer

);

ALTER TABLE Raw_material
  ADD price_id integer, 
  ADD FOREIGN KEY (price_id) references Price (id);

ALTER TABLE Client 
  ADD order_id integer,
  ADD FOREIGN KEY (order_id) references Orders (id);

CREATE TABLE List_of_materials (
  raw_material varchar(255),
  FOREIGN KEY (raw_material) references Raw_material (name),
  amount integer,
  order_id integer,
  FOREIGN KEY (order_id) references Orders (id)
);
-- ALTER TABLE Raw_material
--   ADD UNIQUE (name);