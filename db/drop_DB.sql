DROP TABLE client,list_of_materials, orders, price_name, raw_material, role, unit_name, users CASCADE;

alter TABLE client 
ALTER column phone TYPE  bigint;