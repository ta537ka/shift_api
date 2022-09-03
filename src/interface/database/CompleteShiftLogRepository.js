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
exports.CompleteShiftLogRepository = void 0;
const dayjs = require('dayjs');
const CompleteShiftLog_1 = require("../../domain/CompleteShiftLog");
const ICompleteShiftLogRepository_1 = require("../../usecase/repository/ICompleteShiftLogRepository");
class CompleteShiftLogRepository extends ICompleteShiftLogRepository_1.ICompleteShiftLogRepository {
    constructor(connection) {
        super();
        this.connection = connection;
    }
    convertModel(r) {
        const completeShiftLog = new CompleteShiftLog_1.CompleteShiftLog();
        completeShiftLog.id = r.id;
        completeShiftLog.info = r.info;
        completeShiftLog.updated_at = r.updated_at;
        return completeShiftLog;
    }
    //admin and staff
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.connection.execute("SELECT * FROM Complete_Shift_Logs ORDER BY updated_at DESC");
            const results = query.map((result) => {
                return this.convertModel(result);
            });
            return results;
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("SELECT * FROM Complete_Shift_Logs WHERE id = ?", id);
            return result;
        });
    }
    //admin
    persist(completeShiftLog) {
        return __awaiter(this, void 0, void 0, function* () {
            completeShiftLog.updated_at = dayjs().format("YYYY-MM-DD");
            const result = yield this.connection.execute("INSERT INTO Complete_Shift_Logs(info, updated_at) VALUES(?,?)", [completeShiftLog.info, completeShiftLog.updated_at]);
            return result;
        });
    }
    update(completeShiftLog) {
        return __awaiter(this, void 0, void 0, function* () {
            completeShiftLog.updated_at = dayjs().format("YYYY-MM-DD");
            const result = yield this.connection.execute("UPDATE Complete_Shift_Logs SET info = ?, updated_at = ? WHERE id = ?", [completeShiftLog.info, completeShiftLog.updated_at, completeShiftLog.id]);
            return result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("DELETE FROM Complete_Shift_Logs WHERE id = ?", id);
            return this.convertModel(result);
        });
    }
}
exports.CompleteShiftLogRepository = CompleteShiftLogRepository;
