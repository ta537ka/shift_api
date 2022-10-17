"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRepository = void 0;
const ILoginRepository_1 = require("../../usecase/repository/ILoginRepository");
class LoginRepository extends ILoginRepository_1.ILoginRepository {
    constructor(connection) {
        super();
        this.connection = connection;
    }
    findUserByAdmin(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("SELECT * FROM Admins WHERE username = ?", username);
            return result;
        });
    }
    findUserByStaff(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("SELECT * FROM Staffs WHERE username = ?", username);
            return result;
        });
    }
}
exports.LoginRepository = LoginRepository;
