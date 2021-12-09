import { pool } from "../db/pool"
import { generateQueryStr } from "../utils/generateQueryStr";

class RawMaterialServices {


  async createRawMaterial(name:string, nameUnits:string) {
    try {
      const {rows:priceNames} = await pool.query('SELECT * FROM Price_name')
      const result = await pool.query('INSERT INTO raw_material (name, unit_name) VALUES ($1, $2) RETURNING raw_material_id',
        [name, nameUnits])
        const newMaterialId = result.rows[0].raw_material_id

        if (result.rowCount) {

          priceNames.forEach(async(priceName:{price_name:string}) => {
            
            await pool.query('INSERT INTO price (raw_material_id, price_name) VALUES ($1, $2)', [newMaterialId, priceName.price_name])

          }); 

          return this.getRawMaterials();

        }
        return result;    } catch (error) {
      console.log(error)
      return error
    }
  }

  async getRawMaterials() {
    try {

      const {rows} = await pool.query('SELECT * FROM raw_material ORDER BY name ASC')
      return rows;

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getMaterialsAndUnits() {
    try {

      const {rows:rawMaterials} = await pool.query('SELECT * FROM Raw_material LEFT JOIN Unit_name ON Unit_name.unit_name = Raw_material.unit_name ORDER BY name ASC')
      const {rows:units} = await pool.query('SELECT * FROM Unit_name')

      return {rawMaterials, units};

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getRawMaterial(id :number) {
    try {

      const {rows} = await pool.query('SELECT * FROM raw_material WHERE raw_material_id = $1', [id])
      return rows;

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async editRawMaterial(payload:any) {
    const tableName = 'raw_material'
    try {
      const queryString = generateQueryStr(payload, tableName, 'raw_material_id')
      const result = await pool.query(queryString)
      console.log(result)

      if (result.rowCount) {
        return this.getRawMaterials();
      }
      return result;
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async deleteRawMaterial(id :number) {
    try {

      const result = await pool.query('DELETE FROM raw_material WHERE raw_material_id = $1', [id])
      if (result.rowCount) {
        return this.getRawMaterials();
      }
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

}

export default new RawMaterialServices()


