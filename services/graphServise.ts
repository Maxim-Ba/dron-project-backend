import ordersService, { IDatacolumn } from "./orders.service";

class GraphServise {
  async getAll() {
    try {
      const arr = await ordersService.getOrders( 'null', 'null')
      if (!arr.length) {
        return arr;
      }
      let result: any[] = [];
      arr.forEach((item:IDatacolumn)=>{
        result=[...result, ...this._adeptClientDataForCanvasCoords(item)]
      })
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }


  async getClientsData(clientId:number) {
    try {
      const arr = await ordersService.getOrdersByClient(clientId, 'null', 'null')
      if (!arr.length) {
        return arr;
      }
      const result = this._adeptClientDataForCanvasCoords(arr[0])
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  private _adeptClientDataForCanvasCoords(arr:IDatacolumn ){
    const result = arr.orders.map((order)=>{
      let mounth = '01.' + order.date.toString().slice(3,);
      mounth = mounth.slice(3,5) + '.' + mounth.slice(0,2) + mounth.slice(5,)
      const price = !!order.price ? order.price : 0
      return [ new Date(mounth).getTime(), price]
    })
    return result;
  }
}

export default new GraphServise();
