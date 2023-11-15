import { LoginService } from "../services/logIngService.js";
import jwt from "jsonwebtoken";

export const secretOrPrivateKey = "admin123";
export class LoginControl {
  constructor() {}
  async Login(request, response) {
    try {
      let loginService = new LoginService();
      let data = request.body;
      let userFound = await loginService.validateLog(data);
      if (userFound) {
        let token = jwt.sign(
          {
            id: userFound._id,
            // que el role se saque de userFound  --> userFound.role
            rol: "admin",
          },
          secretOrPrivateKey,
          { expiresIn: "1d" }
        );

        return response.status(200).json({
          message: "validacion exitosa",
          token: token,
        });
      } else {
        return response.status(404).json({
          message: "validacion denegada",
        });
      }
    } catch (error) {
      response.status(400).json({
        message: "error en la validacion",
      });
    }
  }
  Logout(request, response) {
    return response.sendStatus(200);
  }
}
