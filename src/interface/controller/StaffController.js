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
exports.StaffController = void 0;
const CreateStaff_1 = require("../../usecase/staffs/CreateStaff");
const DeleteStaff_1 = require("../../usecase/staffs/DeleteStaff");
const GetStaff_1 = require("../../usecase/staffs/GetStaff");
const ListStaffs_1 = require("../../usecase/staffs/ListStaffs");
const UpdateStaff_1 = require("../../usecase/staffs/UpdateStaff");
const StaffRepository_1 = require("../database/StaffRepository");
const StaffSerializer_1 = require("../serializer/StaffSerializer");
class StaffController {
    constructor(dbConnection) {
        this.staffSerializer = new StaffSerializer_1.StaffSerializer();
        this.staffRepository = new StaffRepository_1.StaffRepository(dbConnection);
    }
    findStaff(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const useCase = new GetStaff_1.GetStaff(this.staffRepository);
            const result = yield useCase.execute(id);
            return this.staffSerializer.serialize(result);
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new ListStaffs_1.ListStaff(this.staffRepository);
            const results = yield useCase.execute();
            return this.staffSerializer.serialize(results);
        });
    }
    createStaff(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const useCase = new CreateStaff_1.CreateStaff(this.staffRepository);
            const result = yield useCase.execute(username, password);
            return this.staffSerializer.serialize(result);
        });
    }
    updateStaff(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { username, password } = req.body;
            const useCase = new UpdateStaff_1.UpdateStaff(this.staffRepository);
            const result = yield useCase.execute(id, username, password);
            return this.staffSerializer.serialize(result);
        });
    }
    deleteStaff(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const useCase = new DeleteStaff_1.DeleteStaff(this.staffRepository);
            const result = useCase.execute(id);
            return this.staffSerializer.serialize(result);
        });
    }
}
exports.StaffController = StaffController;
