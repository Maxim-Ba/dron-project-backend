import { pool } from "../db/pool"

class OrderServices {
  async createOrder(date:Date,clientId:number, priceNameId:number , rawMaterials:any[]) {
    try {
      const result = await pool.query('INSERT INTO orders (date, client_id, id_price_name) VALUES ($1, $2, $3) RETURNING order_id',
        [date, clientId, priceNameId])
      console.log(result)
      const resObj: any[] = [];
        if (result.rows) {
          rawMaterials.forEach(async item=>{
            const {rows} = await pool.query('INSERT INTO List_of_materials (order_id, amount, raw_material_id) VALUES ($1, $2, $3)',
              [result.rows[0].order_id, item.amount, item.id])
              resObj.push(rows[0])
          })
          console.log(resObj, 'resObj')
          return {message:"Заказ создан"};
        }
        return result;    
      } catch (error) {
      console.log(error)
      return error
    }
  }

  async getOrders(): Promise<any> {
    try {

      const {rows} = await pool.query('SELECT * FROM orders ORDER BY order_id ASC')
      return rows;

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getOrdersByClient(id:number): Promise<any> {
    try {

      const {rows} = await pool.query('SELECT * FROM orders WHERE client_id = $1 ORDER BY date ASC', [id])
      return rows;

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getOrder(id :number): Promise<any> {
    try {

      const {rows} = await pool.query('SELECT * FROM orders WHERE order_id = $1', [id])
      return rows;

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async editOrder(id: number, date:string) {
    try {
      const queryString = 'UPDATE orders SET date=$2 WHERE order_id=$1'
      const result = await pool.query(queryString, [id, date])
      return result;
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async deleteOrder(id :number): Promise<any> {
    try {

      const result = await pool.query('DELETE FROM orders WHERE order_id = $1', [id])
      return result;

    } catch (error) {
      console.log(error);
      return error;
    }
  }

}

export default new OrderServices()


