import { pool } from "../db/pool"

class OrderServices {
  async createOrder(date:Date,clientId:number) {
    try {
      await pool.query('INSERT INTO orders (date, client_id) VALUES ($1, $2)',
        [date, clientId])
      return 'ok';// CATCH ERR in contriller
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


