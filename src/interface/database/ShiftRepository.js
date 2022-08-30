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
exports.ShiftRepository = void 0;
const Shift_1 = require("../../domain/Shift");
const IShiftRepository_1 = require("../../usecase/repository/IShiftRepository");
class ShiftRepository extends IShiftRepository_1.IShiftRepository {
    constructor(connection) {
        super();
        this.connection = connection;
    }
    convertModel(r) {
        const shift = new Shift_1.Shift();
        shift.id = r.id;
        shift.staff_id = r.staff_id;
        shift.status_id = r.status_id;
        shift.day = r.day;
        return shift;
    }
    //全取得
    // async findAll(): Promise<Shift[]> {
    //     const query = await this.connection.execute("SELECT * FROM Shifts");
    //     const results = query.map((result: number | string | Date) => {
    //         return this.convertModel(result);
    //     });
    //     return results;
    // }
    //admin
    //期間指定
    findAll(start_date, end_date) {
        return __awaiter(this, void 0, void 0, function* () {
            var query;
            if (start_date == '' && end_date == '') {
                console.log("in 1");
                query = yield this.connection.execute("SELECT * FROM Shifts");
            }
            else if (start_date == '') {
                console.log("in 2");
                const dt = new Date(end_date);
                console.log(dt);
                query = yield this.connection.execute(
                // `SELECT * FROM Shifts WHERE day <= STR_TO_DATE(${end_date}, '%Y-%m-%d')`
                "SELECT * FROM Shifts WHERE day <= ?", [dt]);
            }
            else if (end_date == '') {
                console.log("in 3");
                const dt = new Date(start_date);
                console.log(dt);
                query = yield this.connection.execute("SELECT * FROM Shifts WHERE ? <= day", [dt]
                // `SELECT * FROM Shifts WHERE STR_TO_DATE(${start_date}, '%Y-%m-%d') <= day`
                );
            }
            else {
                console.log("in 4");
                const start_dt = new Date(start_date);
                const end_dt = new Date(end_date);
                console.log(start_dt + " ~ " + end_dt);
                query = yield this.connection.execute("SELECT * FROM Shifts WHERE day BETWEEN ? AND ?", 
                // [start_date, end_date]
                [start_dt, end_dt]);
            }
            const results = query.map((result) => {
                return this.convertModel(result);
            });
            return results;
        });
    }
    //staff
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("SELECT * FROM Shifts WHERE id = ?", id);
            return result;
        });
    }
    findAllByUser(staff_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.connection.execute("SELECT * FROM Shifts WHERE staff_id = ?", staff_id);
            const results = query.map((result) => {
                return this.convertModel(result);
            });
            return results;
        });
    }
    persist(shift) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("INSERT INTO Shifts(staff_id, status_id, day) VALUES(?,?,?)", [shift.staff_id, shift.status_id, shift.day]);
            shift.id = result.id;
            return result;
        });
    }
    update(shift) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("UPDATE Shifts SET status_id = ?, day = ? WHERE id = ?", [shift.status_id, shift.day, shift.id]);
            return result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("DELETE FROM Shifts WHERE id = ?", id);
            return this.convertModel(result);
        });
    }
}
exports.ShiftRepository = ShiftRepository;
