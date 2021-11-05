import { pool } from "../db/pool"
import { generateQueryStr } from "../utils/generateQueryStr";

class ListOfMaterialServices {
  async createMaterialList(nameRawMaterial:string, amount:number, orderId:number) {
    try {
      return await pool.query('INSERT INTO list_of_materials (raw_material, amount, order_id) VALUES ($1, $2, $3)',
      [nameRawMaterial, amount, orderId]);// CATCH ERR in contriller
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async getMaterialLists() {
    try {

      const {rows} = await pool.query('SELECT * FROM list_of_materials ORDER BY order_id ASC')
      return rows;

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getMaterialList(id :number) {
    try {

      const {rows} = await pool.query('SELECT * FROM list_of_materials WHERE list_of_materials_id = $1', [id])
      return rows;

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async editMaterialList(payload:any) {
    const tableName = 'list_of_materials'
    try {
      const queryString = generateQueryStr(payload, tableName)
      const result = await pool.query(queryString)
      return result;
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async deleteMaterialList(id:number) {
    try {
      const result = await pool.query('DELETE FROM list_of_materials WHERE list_of_materials_id = $1', [id])
      return result;

    } catch (error) {
      console.log(error);
      return error;
    }
  }

}

export default new ListOfMaterialServices()


