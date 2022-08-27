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
exports.StaffRepository = void 0;
const Staff_1 = require("../../domain/Staff");
const IStaffReposiroty_1 = require("../../usecase/repository/IStaffReposiroty");
class StaffRepository extends IStaffReposiroty_1.IStaffRepository {
    constructor(connection) {
        super();
        this.connection = connection;
    }
    converModel(r) {
        const staff = new Staff_1.Staff();
        staff.id = r.id;
        staff.username = r.username;
        staff.password = r.password;
        return staff;
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("SELECT * FROM Staffs WHERE id = ?", id);
            return result;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.connection.execute("SELECT * FROM Staffs");
            const results = query.map((result) => {
                return this.converModel(result);
            });
            return results;
        });
    }
    persist(staff) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("INSERT INTO Staffs(username, password) VALUES(?,?)", [staff.username, staff.password]);
            return result;
        });
    }
    update(staff) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("UPDATE Staffs SET username = ?, password = ? WHERE id = ?", [staff.username, staff.password, staff.id]);
            staff.id = result.id;
            return result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("DELETE FROM Staffs WHERE id = ?", id);
            return this.converModel(result);
        });
    }
}
exports.StaffRepository = StaffRepository;
