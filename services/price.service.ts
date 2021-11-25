
import { pool } from "../db/pool"

class PriceServices {
  async createPrice(materialId:number,coast:number,price_name:string) {
    try {
      const result = await pool.query('INSERT INTO price (coast, raw_material_id, price_name) VALUES ($1, $2, $3)',
        [coast, materialId,price_name])
      return result;
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async createPriceName(price_name:string) {
    try {
      const result = await pool.query('INSERT INTO Price_name (price_name) VALUES ($1)',
        [price_name])
        if (result.rowCount) {
          const {rows:allRawMaterials} = await pool.query('SELECT * FROM raw_material')
          allRawMaterials.forEach(async(material:{raw_material_id:number}) => {
            
            await pool.query('INSERT INTO price (raw_material_id, price_name) VALUES ($1, $2)', [material.raw_material_id, price_name])

          }); 
          return this.getPriceNames();
        }
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

  async getPrice(priceName :string) {
    try {
// добавить селект с названием raw_materials
      const {rows} = await pool.query('SELECT id_price, coast, price_name, price.raw_material_id, raw_material.name FROM price LEFT JOIN raw_material ON raw_material.raw_material_id = price.raw_material_id WHERE price.price_name = $1', [priceName])
      return rows;

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async editPrice(array:Array<{id:any; coast:number}>) {
    try {
      const result: any[]=[];
      array.forEach(async item=>{
        const responsceDB= await pool.query('UPDATE price SET coast=$1 WHERE id_price=$2',[item.coast, item.id])
        result.push(responsceDB)
      }) 
        if (result.every(item=>item.rowCount)) {
          return this.getPriceNames();
        }
        return result;   
      } 
      catch (error) {
      console.log(error)
      return error
    }
  }

  async deletePrice(id :number) {
    try {

      const result = await pool.query('DELETE FROM price_name WHERE id_price_name = $1', [id])
      if (result.rowCount) {
        return this.getPriceNames();
      }
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
