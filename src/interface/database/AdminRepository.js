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
exports.AdminRepository = void 0;
const Admin_1 = require("../../domain/Admin");
const IAdminRepository_1 = require("../../usecase/repository/IAdminRepository");
class AdminRepository extends IAdminRepository_1.IAdminRepository {
    constructor(connection) {
        super();
        this.connection = connection;
    }
    convertModel(r) {
        const admin = new Admin_1.Admin();
        admin.id = r.id;
        admin.username = r.username;
        admin.password = r.password;
        return admin;
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("SELECT * FROM Admins WHERE id = ?", id);
            return result;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.connection.execute("SELECT * FROM Admins");
            const results = query.map((result) => {
                return this.convertModel(result);
            });
            return results;
        });
    }
    persist(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("INSERT INTO Admins(username, password) VALUES (?,?)", [admin.username, admin.password]);
            admin.id = result.id;
            return result;
        });
    }
    update(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("UPDATE Admins SET username = ?, password = ? WHERE id = ?", [admin.username, admin.password, admin.id]);
            return result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("DELETE FROM Admins WHERE id = ?", id);
            return this.convertModel(result);
        });
    }
}
exports.AdminRepository = AdminRepository;
