import { pool } from "../db/pool"
import { generateQueryStr } from "../utils/generateQueryStr";

class RawMaterialServices {
  async createRawMaterial(name:string, nameUnits:string) {
    try {
      await pool.query('INSERT INTO raw_material (name, name_units) VALUES ($1, $2)',
        [name, nameUnits])
      return 'ok';// CATCH ERR in contriller
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async getRawMaterials() {
    try {

      const {rows} = await pool.query('SELECT * FROM raw_material ORDER BY raw_material_id ASC')
      return rows;

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
      const queryString = generateQueryStr(payload, tableName)
      const result = await pool.query(queryString)
      return result;
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async deleteRawMaterial(id :number) {
    try {

      const result = await pool.query('DELETE FROM raw_material WHERE raw_material_id = $1', [id])
      return result;

    } catch (error) {
      console.log(error);
      return error;
    }
  }

}

export default new RawMaterialServices()


