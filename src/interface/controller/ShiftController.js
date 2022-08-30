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
exports.ShiftController = void 0;
const CreateShift_1 = require("../../usecase/shifts/CreateShift");
const DeleteShift_1 = require("../../usecase/shifts/DeleteShift");
const GetShift_1 = require("../../usecase/shifts/GetShift");
const ListShifts_1 = require("../../usecase/shifts/ListShifts");
const ListShiftsByUser_1 = require("../../usecase/shifts/ListShiftsByUser");
const UpdateShift_1 = require("../../usecase/shifts/UpdateShift");
const ShiftRepository_1 = require("../database/ShiftRepository");
const ShiftSerializer_1 = require("../serializer/ShiftSerializer");
class ShiftController {
    constructor(dbConnection) {
        this.shiftSerializer = new ShiftSerializer_1.ShiftSerializer();
        this.shiftRepository = new ShiftRepository_1.ShiftRepository(dbConnection);
    }
    //admin
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { start_date, end_date } = req.body;
            const useCase = new ListShifts_1.ListShifts(this.shiftRepository);
            const results = yield useCase.execute(start_date, end_date);
            return this.shiftSerializer.serialize(results);
        });
    }
    //staff
    findShiftByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const staff_id = req.params.staff_id;
            const useCase = new ListShiftsByUser_1.ListShiftsByUser(this.shiftRepository);
            const results = yield useCase.execute(staff_id);
            return this.shiftSerializer.serialize(results);
        });
    }
    findShift(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const useCase = new GetShift_1.GetShift(this.shiftRepository);
            const result = yield useCase.execute(id);
            return this.shiftSerializer.serialize(result);
        });
    }
    createShift(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { staff_id, status_id, day } = req.body;
            const useCase = new CreateShift_1.CreateShift(this.shiftRepository);
            const result = yield useCase.execute(staff_id, status_id, day);
            return this.shiftSerializer.serialize(result);
        });
    }
    updateShift(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { status_id, day } = req.body;
            const useCase = new UpdateShift_1.UpdateShift(this.shiftRepository);
            const result = yield useCase.execute(id, status_id, day);
            return this.shiftSerializer.serialize(result);
        });
    }
    deleteShift(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const useCase = new DeleteShift_1.DeleteShift(this.shiftRepository);
            const result = yield useCase.execute(id);
            return this.shiftSerializer.serialize(result);
        });
    }
}
exports.ShiftController = ShiftController;
