
import { pool } from "../db/pool"

class PriceServices {
  async createPrice(materialId:number,coast:number) {
    try {
      const result = await pool.query('INSERT INTO price (coast, raw_material_id) VALUES ($1)',
        [coast, materialId])
      return result;
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async getPrices() {
    try {

      const {rows} = await pool.query('SELECT * FROM price ORDER BY price_id ASC')
      return rows;

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getPriceNames() {
    try {

      const {rows} = await pool.query('SELECT * FROM price_name')
      return rows;

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getPricesByRawMaterials(rawMaterialsId:number) {
    try {

      const {rows} = await pool.query('SELECT * FROM price WHERE raw_maretial_id=$1 ORDER BY price_id ASC',[rawMaterialsId])
      return rows;

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getPrice(id :number) {
    try {

      const {rows} = await pool.query('SELECT * FROM price WHERE id = $1 ORDER BY price_id ASC', [id])
      return rows;

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async editPrice(id:number, coast:number) {
    try {
        
      const queryString = 'UPDATE price SET  WHERE id='
      const result = await pool.query('UPDATE price SET coast=$1 WHERE id=$2',[coast, id])
      return result;
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async deletePrice(id :number) {
    try {

      const result = await pool.query('DELETE FROM price WHERE id = $1', [id])
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

}



export default new PriceServices()

function results(results: any, arg1: (any: any) => any): Promise<any> {
  throw new Error("Function not implemented.")
}
