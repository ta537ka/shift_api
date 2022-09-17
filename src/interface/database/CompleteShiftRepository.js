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
exports.CompleteShiftRepository = void 0;
const CompleteShift_1 = require("../../domain/CompleteShift");
const ICompleteShiftRepository_1 = require("../../usecase/repository/ICompleteShiftRepository");
class CompleteShiftRepository extends ICompleteShiftRepository_1.ICompleteShiftRepository {
    constructor(connection) {
        super();
        this.connection = connection;
    }
    convertModel(r) {
        const completeShift = new CompleteShift_1.CompleteShift();
        completeShift.id = r.id;
        completeShift.staff_id = r.staff_id;
        completeShift.status_id = r.status_id;
        completeShift.day = r.day;
        return completeShift;
    }
    //admin
    findAllByAdmin(start_date, end_date) {
        return __awaiter(this, void 0, void 0, function* () {
            var query;
            if (start_date == '' && end_date == '') {
                query = yield this.connection.execute("SELECT * FROM Complete_Shifts");
            }
            else if (start_date == '') {
                const dt = new Date(end_date);
                query = yield this.connection.execute(
                // `SELECT * FROM Complete_Shifts WHERE day <= STR_TO_DATE(${end_date}, '%Y-%m-%d')`
                "SELECT * FROM Complete_Shifts WHERE day <= ?", [dt]);
            }
            else if (end_date == '') {
                const dt = new Date(start_date);
                query = yield this.connection.execute("SELECT * FROM Complete_Shifts WHERE ? <= day", [dt]
                // `SELECT * FROM Complete_Shifts WHERE STR_TO_DATE(${start_date}, '%Y-%m-%d') <= day`
                );
            }
            else {
                const start_dt = new Date(start_date);
                const end_dt = new Date(end_date);
                query = yield this.connection.execute(
                // `SELECT * FROM Complete_Shifts WHERE day BETWEEN STR_TO_DATE(${start_date}, '%Y-%m-%d') AND STR_TO_DATE(${end_date}, '%Y-%m-%d')`
                "SELECT * FROM Complete_Shifts WHERE day BETWEEN ? AND ?", [start_dt, end_dt]);
            }
            const results = query.map((result) => {
                return this.convertModel(result);
            });
            return results;
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("SELECT * FROM Complete_Shifts WHERE id = ?", id);
            return result;
        });
    }
    persist(completeShift) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("INSERT INTO Complete_Shifts(staff_id, status_id, day) VALUES(?,?,?)", [completeShift.staff_id, completeShift.status_id, completeShift.day]);
            completeShift.id = result.id;
            return completeShift;
        });
    }
    update(completeShift) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("UPDATE Complete_Shifts SET status_id = ?, day = ? WHERE id = ?", [completeShift.status_id, completeShift.day, completeShift.id]);
            return result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("DELETE FROM Complete_Shifts WHERE id = ?", id);
            return result;
        });
    }
    //staff
    findAllByStaff(start_date, end_date) {
        return __awaiter(this, void 0, void 0, function* () {
            var query;
            if (start_date == '' && end_date == '') {
                query = yield this.connection.execute("SELECT * FROM Complete_Shifts");
            }
            else if (start_date == '') {
                // const dt = new Date(end_date);
                query = yield this.connection.execute(`SELECT * FROM Shifts WHERE day <= STR_TO_DATE(${end_date}, '%Y-%m-%d')`
                // "SELECT * FROM Complete_Shifts WHERE day <= ?",
                // [dt]
                );
            }
            else if (end_date == '') {
                // const dt = new Date(start_date);
                query = yield this.connection.execute(
                // "SELECT * FROM Complete_Shifts WHERE ? <= day",
                // [dt]
                `SELECT * FROM Shifts WHERE STR_TO_DATE(${start_date}, '%Y-%m-%d') <= day`);
            }
            else {
                // const start_dt = new Date(start_date);
                // const end_dt = new Date(end_date);
                query = yield this.connection.execute(`SELECT * FROM Complete_Shifts WHERE day BETWEEN STR_TO_DATE(${start_date}, '%Y-%m-%d') AND STR_TO_DATE(${end_date}, '%Y-%m-%d')`
                // "SELECT * FROM Complete_Shifts WHERE day BETWEEN ? AND ?",
                // [start_date, end_date]
                // [start_dt, end_dt]
                );
            }
            const results = query.map((result) => {
                return this.convertModel(result);
            });
            return results;
        });
    }
}
exports.CompleteShiftRepository = CompleteShiftRepository;
