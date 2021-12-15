import express from "express";
import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Uncorrect reqest", errors });
      }
      const { email, password } = req.body;
      const result = await userService.createUser(email, password);
      if (result.error) {
        return res.json({
          error: result.error,
        });
      }
      return res.json({
        message: "User was created",
        result: result.rowCount,
      });
    } catch (error) {
      console.log(error);
      res.send({ message: "error on server" });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await userService.loginUser(email, password);
      if (result.error) {
        return res.json({
          error: result.error,
        });
      }
      return res.json(result);
    } catch (error) {
      console.log(error);
      res.send({ message: error });
    }
  }

  async authUser(req: Request, res: Response) {
    try {
      const id = req.user.id;
      const result = await userService.authUser(id);
      if (result.error) {
        return res.json({
          error: result.error,
        });
      }
      console.log(result);
      return res.json(result);
    } catch (error) {
      console.log(error);
      res.send({ message: error });
    }
  }
}

export default new UserController();
