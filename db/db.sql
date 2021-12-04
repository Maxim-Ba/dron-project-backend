-- CREATE ROLE user_dron;
-- ALTER ROLE user_dron WITH LOGIN PASSWORD 'password_DRON' NOSUPERUSER NOCREATEDB NOCREATEROLE;
-- CREATE DATABASE dron_database OWNER user_dron;
-- REVOKE ALL ON DATABASE dron_database FROM PUBLIC;
-- GRANT CONNECT ON DATABASE dron_database TO user_dron;
-- GRANT ALL ON DATABASE dron_database TO user_dron;
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
  price_name varchar(255),
  UNIQUE (raw_material_id, price_name),
  FOREIGN KEY (raw_material_id) references Raw_material (raw_material_id) ON DELETE CASCADE,
  FOREIGN KEY (price_name) references Price_name (price_name) ON DELETE CASCADE

);

ALTER TABLE Orders
  ADD client_id integer NOT NULL, 
  ADD id_price_name integer NOT NULL, 
  ADD FOREIGN KEY (client_id) references Client (id),
  ADD FOREIGN KEY (id_price_name) references Price_name (id_price_name) ON DELETE CASCADE;


CREATE TABLE List_of_materials (
  id_list bigserial PRIMARY KEY,
  raw_material_id integer,
  FOREIGN KEY (raw_material_id) references Raw_material (raw_material_id) ON DELETE CASCADE,
  amount real,
  order_id integer,
  FOREIGN KEY (order_id) references Orders (order_id) ON DELETE CASCADE
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

