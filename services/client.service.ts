import { pool } from "../db/pool";

class ClientServices {
  async createClient(
    name: string,
    inn: number | null = null,
    phone: number | null = null
  ) {
    try {
      const result = await pool.query(
        "INSERT INTO client (name, inn, phone) VALUES ($1, $2, $3)",
        [name, inn, phone]
      );
      if (result.rowCount) {
        return this.getClients();
      }
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getClients() {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM client ORDER BY name ASC"
      );
      return rows;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getClient(id: number) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM client WHERE id = $1 ORDER BY name ASC",
        [id]
      );
      return rows;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async editClient(payload: any) {
    try {
      function generateQueryStr(payload: any) {
        let beginStr = "UPDATE client SET ";
        let endStr = "WHERE id=";
        for (let key in payload) {
          // set VALIUES
          if (key === "id") {
            endStr = endStr.concat(payload[key]);
            continue;
          }

          beginStr = beginStr.concat(key, "=", "'", payload[key], "'", ", ");
        }

        console.log(beginStr.slice(0, -2), endStr);
        beginStr = beginStr.slice(0, -2).concat(endStr);

        return beginStr;
      }
      const queryString = generateQueryStr(payload);
      const result = await pool.query(queryString);

      if (result.rowCount) {
        return this.getClients();
      }
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteClient(id: number) {
    try {
      const result = await pool.query("DELETE FROM client WHERE id = $1", [id]);
      if (result.rowCount) {
        return this.getClients();
      }
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default new ClientServices();
