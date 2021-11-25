export function generateQueryStr(payload:any, table:string, primaryKey:string='id') {
  let beginStr = `UPDATE ${table} SET `
  let endStr = `WHERE ${primaryKey}=`
  for(let key in payload){
    // set VALIUES
    if (key === primaryKey) {
      endStr = endStr.concat(payload[key]);
      continue
    }

    beginStr = beginStr.concat(key , '=' , '\'',  payload[key],'\'', ', ' );
  }

  console.log(beginStr.slice(0, -2),endStr);
  beginStr = beginStr.slice(0, -2).concat(endStr);

  return beginStr;

}