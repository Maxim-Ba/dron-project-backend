DROP TABLE client,list_of_materials, orders, price_name, raw_material, role, unit_name, users CASCADE;

alter TABLE client 
ALTER column phone TYPE  bigint;



ALTER TABLE Price
  ALTER COLUMN raw_material_id 
  ADD CONSTRAINT f_k1 FOREIGN KEY (raw_material_id) references Raw_material (raw_material_id) ON DELETE CASCADE;



ALTER TABLE Price
  ALTER COLUMN raw_material_id 
  DROP CONSTRAINT FOREIGN KEY (raw_material_id);
ALTER TABLE Price
  ALTER COLUMN price_name 
  DROP FOREIGN KEY ;

ALTER TABLE Price
  ALTER COLUMN raw_material_id 
  ADD FOREIGN KEY (raw_material_id) references Raw_material (raw_material_id) ON DELETE CASCADE;

ALTER TABLE Price
  ALTER COLUMN price_name 
  ADD FOREIGN KEY (price_name) references Price_name (price_name) ON DELETE CASCADE;


  DROP TABLE List_of_materials  CASCADE;


SELECT id_price, coast, price_name, price.raw_material_id, raw_material.name FROM price 
  LEFT JOIN raw_material ON raw_material.raw_material_id = price.raw_material_id
  WHERE price.price_name = 'default';

SELECT orders.order_id, orders.date, orders.client_id, Client.name, orders.id_price_name, Price_name.price_name,  Unit_name.id_unit_name, Price.coast, Price.id_price, List_of_materials.id_list, List_of_materials.amount, Raw_material.raw_material_id, Raw_material.name, List_of_materials.amount * Price.coast AS price_row FROM orders 
  LEFT JOIN List_of_materials ON  orders.order_id = List_of_materials.order_id 
  LEFT JOIN Raw_material ON  List_of_materials.raw_material_id = Raw_material.raw_material_id
  LEFT JOIN Price_name ON  orders.id_price_name = Price_name.id_price_name
  LEFT JOIN Price ON Price_name.price_name = Price.price_name AND List_of_materials.raw_material_id = Price.raw_material_id
  LEFT JOIN Unit_name ON Raw_material.unit_name = Unit_name.unit_name 
  LEFT JOIN Client ON orders.client_id = Client.id 
  WHERE orders.client_id = '23' AND orders.date >= '2021-11-26' AND orders.date <='2021-11-26' ORDER BY orders.date ASC;


SELECT * FROM orders WHERE order_id = '6';
SELECT * FROM List_of_materials WHERE order_id = '6';



ALTER TABLE List_of_materials
ADD id_list bigserial PRIMARY KEY;