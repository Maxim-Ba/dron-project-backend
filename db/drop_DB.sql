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

ALTER TABLE List_of_materials
ADD id_list bigserial PRIMARY KEY;