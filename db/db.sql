CREATE DATABASE project_database;
\c project_database

CREATE TABLE Client (
  id serial PRIMARY KEY,
  name varchar(255) UNIQUE,
  phone integer,
  inn integer 
);

CREATE TABLE Orders (
  order_id serial PRIMARY KEY,
  date DATE 
  
);

CREATE TABLE Raw_material (
  raw_material_id serial PRIMARY KEY,
  name varchar(255) UNIQUE,
  name_units varchar(255)

);

CREATE TABLE Price (
  id_price serial PRIMARY KEY,
  coast real,
  raw_material_id integer,
  FOREIGN KEY (raw_material_id) references Raw_material (raw_material_id)

);

-- ALTER TABLE Raw_material
--   ADD price_id integer, 
--   ADD FOREIGN KEY (price_id) references Price (id_price);

ALTER TABLE Orders
  ADD client_id integer NOT NULL, 
  ADD FOREIGN KEY (client_id) references Client (id);


CREATE TABLE List_of_materials (
  raw_material varchar(255),
  FOREIGN KEY (raw_material) references Raw_material (name),
  amount real,
  order_id integer,
  FOREIGN KEY (order_id) references Orders (order_id)
);
-- ALTER TABLE Raw_material
--   ADD UNIQUE (name);

-- DELETE IT

