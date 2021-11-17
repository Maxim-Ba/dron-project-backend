import { pool } from "../db/pool";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
interface resLogin{
  error: string | boolean | typeof Error | any,
  token?:string,
  id?:number,
  email?:string
  role?:string
}

class UserService {
  async createUser(email: string, password: string) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (rows.length) {
        return { error: `User with email ${email} already exist` };
      }
      const hashPassword = await bcrypt.hash(password, 8);
      const result = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1 ,$2)",
        [email, hashPassword]
      );
      return result;
    } catch (error) {
      console.log(error, "error");
      return error;
    }
  }

  async loginUser(email: string, password: string):Promise<resLogin> {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (!rows.length) {
        return { error: "User dont found" };
      }
      const isPasValid = bcrypt.compareSync(password, rows[0].password);
      if (!isPasValid) {
        return { error: "Invalid password" };
      }
      const token = jwt.sign(
        { id: rows[0].user_id },
        process.env.SECRET_KEY as string,
        { expiresIn: "1h" }
      );
      return {
        token:token,
        id:rows[0].user_id,
        email:rows[0].email,
        error:false,
        role: rows[0].role

      };
    } catch (error) {
      console.log(error, "error");
      return {error:error};
    }
  }

  async authUser(id:number):Promise<resLogin>{
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [id]
      );
      const token = jwt.sign(
        { id: rows[0].user_id },
        process.env.SECRET_KEY as string,
        { expiresIn: "1h" }
      );
      return {
        token:token,
        id:rows[0].user_id,
        email:rows[0].email,
        error:false,
        role: rows[0].role
      };
    } catch (error) {
        console.log(error)
        return {error:error};
      
    }
  }
}

export default new UserService();
