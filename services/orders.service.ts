import { pool } from "../db/pool";
import ExcelJS from "exceljs";
import path from "path";
import { rootPath } from "../server";

type ResponseData = Array<{
  amount: number;
  client_id: number;
  coast: number;
  date: string;
  id_list: string;
  id_price: number;
  id_price_name: number;
  id_unit_name: number;
  name: string;
  order_id: number;
  price: number;
  price_name: string;
  raw_material_id: number;
  rawmaterial: string;
}>;
interface IDatacolumn {
  name: string;
  sum: number;
  orders: IOrder[];
}
interface IMaterialList {
  rawMaterialId: number;
  rawMaterial: string;
  amount: number;
  units: number;
  priceByOne: number;
  price: number;
}
interface IOrder {
  orderId: number | null;
  date: string | DateConstructor;
  materialList: IMaterialList[];
  price: number;
}
class OrderServices {
  async createOrder(
    date: Date,
    clientId: number,
    priceNameId: number,
    rawMaterials: any[]
  ) {
    try {
      const result = await pool.query(
        "INSERT INTO orders (date, client_id, id_price_name) VALUES ($1, $2, $3) RETURNING order_id",
        [date, clientId, priceNameId]
      );
      const resObj: any[] = [];
      if (result.rows) {
        rawMaterials.forEach(async (item) => {
          const { rows } = await pool.query(
            "INSERT INTO List_of_materials (order_id, amount, raw_material_id) VALUES ($1, $2, $3)",
            [result.rows[0].order_id, item.amount, item.id]
          );
          resObj.push(rows[0]);
        });
        return { message: "Заказ создан" };
      }
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  _parseOrdersData(ordersData: ResponseData) {
    const clientsSet: any = new Set();
    const clients: any = {};
    ordersData.forEach((item) => {
      if (clientsSet.has(item.name)) {
        clients[item.name].push(item);
      } else {
        clientsSet.add(item.name);
        clients[item.name] = new Array(item);
      }
    });
    const result: any = [];

    clientsSet.forEach((key: string) => {
      let oneClient = this._parseOneClientOrdersData(clients[key]);
      result.push(oneClient[0]);
    });
    return result;
  }

  async getOrders(dateStart: string, dateEnd: string) {
    let suffix = " ORDER BY orders.date ASC";

    if (dateEnd !== "null") {
      suffix = ` orders.date <= '${dateEnd}' ` + suffix;
    }

    if (dateStart !== "null") {
      if (dateEnd !== "null") {
        suffix = ` AND ` + suffix ;
      }
      suffix = ` orders.date >= '${dateStart}' ` + suffix;

    }
    if ((dateStart !== "null") || (dateEnd !== "null")) {
      suffix = ` WHERE ` + suffix;
    }
    const queryString = `SELECT orders.order_id, orders.date, orders.client_id, Client.name, orders.id_price_name, Price_name.price_name,  Unit_name.id_unit_name, Price.coast, Price.id_price, List_of_materials.id_list,List_of_materials.amount, Raw_material.raw_material_id, Raw_material.name as rawMaterial, List_of_materials.amount * Price.coast AS price FROM orders 
    LEFT JOIN List_of_materials ON  orders.order_id = List_of_materials.order_id 
    LEFT JOIN Raw_material ON  List_of_materials.raw_material_id = Raw_material.raw_material_id
    LEFT JOIN Price_name ON  orders.id_price_name = Price_name.id_price_name
    LEFT JOIN Price ON Price_name.price_name = Price.price_name AND List_of_materials.raw_material_id = Price.raw_material_id
    LEFT JOIN Unit_name ON Raw_material.unit_name = Unit_name.unit_name 
    LEFT JOIN Client ON orders.client_id = Client.id`;
    console.log(queryString + suffix)
    try {
      const { rows } = await pool.query(queryString + suffix);
      return this._parseOrdersData(rows);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  _parseOneClientOrdersData(ordersData: ResponseData): IDatacolumn[] | [] {
    if (!ordersData || ordersData.length === 0) {
      return [];
    }
    const ordersSet = new Set();
    const orders: IOrder[] = [];
    ordersData.forEach((item) => {
      if (ordersSet.has(item.order_id)) {
        let index = orders.findIndex(
          (order) => order.orderId === item.order_id
        );
        orders[index].materialList.push({
          amount: item.amount,
          price: item.price,
          priceByOne: item.coast,
          units: item.id_unit_name,
          rawMaterial: item.rawmaterial,
          rawMaterialId: +item.id_list,
        });
        orders[index].price = orders[index].price + item.price;
      } else {
        ordersSet.add(item.order_id);
        orders.push({
          date: new Date(item.date).toLocaleString().slice(0, 10),
          price: item.price,
          orderId: item.order_id,
          materialList: [
            {
              amount: item.amount,
              price: item.price,
              priceByOne: item.coast,
              units: item.id_unit_name,
              rawMaterial: item.rawmaterial,
              rawMaterialId: +item.id_list,
            },
          ],
        });
      }
    });
    const dataColumn = [
      {
        name: ordersData[0].name,
        sum: [...orders].reduce((sum, current) => {
          return sum + current.price;
        }, 0),
        orders: orders,
      },
    ];
    return dataColumn;
  }

  async getOrdersByClient(
    id: number,
    dateStart: string,
    dateEnd: string
  ): Promise<any> {
    let suffix = " ORDER BY orders.date ASC";

    if (dateEnd !== "null") {
      suffix = ` AND orders.date <= '${dateEnd}' ` + suffix;
    }

    if (dateStart !== "null") {
      suffix = ` AND orders.date >= '${dateStart}' ` + suffix;
    }

    const queryString = `SELECT orders.order_id, orders.date, orders.client_id, Client.name, orders.id_price_name, Price_name.price_name,  Unit_name.id_unit_name, Price.coast, Price.id_price, List_of_materials.id_list,List_of_materials.amount, Raw_material.raw_material_id, Raw_material.name as rawMaterial, List_of_materials.amount * Price.coast AS price FROM orders 
    LEFT JOIN List_of_materials ON  orders.order_id = List_of_materials.order_id 
    LEFT JOIN Raw_material ON  List_of_materials.raw_material_id = Raw_material.raw_material_id
    LEFT JOIN Price_name ON  orders.id_price_name = Price_name.id_price_name
    LEFT JOIN Price ON Price_name.price_name = Price.price_name AND List_of_materials.raw_material_id = Price.raw_material_id
    LEFT JOIN Unit_name ON Raw_material.unit_name = Unit_name.unit_name 
    LEFT JOIN Client ON orders.client_id = Client.id 
    WHERE orders.client_id = $1`;
    try {
      const { rows } = await pool.query(queryString + suffix, [id]);
      return this._parseOneClientOrdersData(rows);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getOrder(id: number): Promise<any> {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM orders WHERE order_id = $1",
        [id]
      );
      return rows;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async editOrder(id: number, date: string) {
    try {
      const queryString = "UPDATE orders SET date=$2 WHERE order_id=$1";
      const result = await pool.query(queryString, [id, date]);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteOrder(id: number): Promise<any> {
    try {
      const result = await pool.query(
        "DELETE FROM orders WHERE order_id = $1",
        [id]
      );
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async createExel(tableData: IDatacolumn[]): Promise<string> {
    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet("My Sheet");
    worksheet.columns = [
      { width: 12 },
      { width: 20 },
      { width: 10 },
      { width: 20 },
      { width: 20 },
      { width: 10 },
      { width: 20 },
    ];
    tableData.forEach((client) => {
      worksheet.addRow(["Клиент:", client.name, , , client.sum + "руб."]);
      let clientRow = worksheet.lastRow;
      let firstCell = clientRow && clientRow.getCell(2).address;
      let thirdCell = clientRow && clientRow.getCell(4).address;
      worksheet.mergeCells(`${firstCell}:${thirdCell}`);
      clientRow &&
        clientRow.eachCell((cell) => {
          cell.font = { size: 12, bold: true };
          cell.style.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });

      client.orders.forEach((order) => {
        worksheet.addRow([
          "Дата заказа:",
          order.date,
          ,
          ,
          order.price + "руб.",
        ]);
        let orderRow = worksheet.lastRow;

        let firstCellOrder = orderRow && orderRow.getCell(2).address;
        let thirdCellOrder = orderRow && orderRow.getCell(4).address;
        worksheet.mergeCells(`${firstCellOrder}:${thirdCellOrder}`);
        orderRow &&
          orderRow.eachCell((cell) => {
            cell.font = { size: 12, bold: true };
          });
        order.materialList.forEach((rawMaterial) => {
          worksheet.addRow([
            "",
            rawMaterial.rawMaterial,
            rawMaterial.amount,
            rawMaterial.priceByOne + "руб.",
            rawMaterial.price + "руб.",
          ]);
        });
      });
    });

    const data1 = await workbook.xlsx.writeFile(
      rootPath + "/exel" + "/export.xlsx"
    );
    return path.resolve(__dirname, "exel", "export.xlsx");
  }
}

export default new OrderServices();
