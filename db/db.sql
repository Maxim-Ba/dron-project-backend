CREATE DATABASE dron_database;
\c dron_database

CREATE TABLE Client (
  id serial PRIMARY KEY,
  name varchar(255) UNIQUE,
  phone bigint,
  inn bigint UNIQUE
);

CREATE TABLE Orders (
  order_id serial PRIMARY KEY,
  date DATE 
  
);

CREATE TABLE Unit_name (
  id_unit_name serial PRIMARY KEY,
  unit_name varchar(255) UNIQUE 
);
INSERT INTO Unit_name (unit_name) VALUES ('кг');
INSERT INTO Unit_name (unit_name) VALUES ('шт');

CREATE TABLE Raw_material (
  raw_material_id serial PRIMARY KEY,
  name varchar(255) UNIQUE,
  unit_name varchar(255),
  FOREIGN KEY (unit_name) references Unit_name(unit_name)

);
CREATE TABLE Price_name (
  id_price_name serial PRIMARY KEY,
  price_name varchar(255) UNIQUE
);

INSERT INTO Price_name (price_name) VALUES ('default');

CREATE TABLE Price (
  id_price serial PRIMARY KEY,
  coast real,
  raw_material_id integer,
  price_name varchar(255) UNIQUE,
  FOREIGN KEY (raw_material_id) references Raw_material (raw_material_id),
  FOREIGN KEY (price_name) references Price_name (price_name)

);

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

CREATE TABLE Role (
  role varchar(255) UNIQUE
);

INSERT INTO Role (role) VALUES ('admin');
INSERT INTO Role (role) VALUES ('user');

CREATE TABLE Users (
  user_id serial PRIMARY KEY, 
  email varchar(255) UNIQUE,
  password varchar(255),
  role varchar(255) default 'user',
  FOREIGN KEY (role) references Role (role)

);


-- DELETE IT

