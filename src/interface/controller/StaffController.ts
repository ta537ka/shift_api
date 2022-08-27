import { CreateStaff } from "../../usecase/staffs/CreateStaff";
import { DeleteStaff } from "../../usecase/staffs/DeleteStaff";
import { GetStaff } from "../../usecase/staffs/GetStaff";
import { ListStaff } from "../../usecase/staffs/ListStaffs";
import { UpdateStaff } from "../../usecase/staffs/UpdateStaff";
import { IDBConnection } from "../database/IDBConnection";
import { StaffRepository } from "../database/StaffRepository";
import { StaffSerializer } from "../serializer/StaffSerializer";

export class StaffController {
    private staffSerializer: StaffSerializer;
    private staffRepository: StaffRepository;

    constructor(dbConnection: IDBConnection) {
        this.staffSerializer = new StaffSerializer();
        this.staffRepository = new StaffRepository(dbConnection);
    }

    async findStaff(req: any, res: any) {
        const id = req.params.id;
        const useCase = new GetStaff(this.staffRepository);
        const result = await useCase.execute(id);
        return this.staffSerializer.serialize(result);
    }

    async findAll(req: any, res: any) {
        const useCase = new ListStaff(this.staffRepository);
        const results = await useCase.execute();
        return this.staffSerializer.serialize(results);
    }

    async createStaff(req: any, res: any) {
        const { username, password } = req.body;
        const useCase = new CreateStaff(this.staffRepository);
        const result = await useCase.execute(username, password);
        return this.staffSerializer.serialize(result);
    }

    async updateStaff(req: any, res: any) {
        const id = req.params.id;
        const { username, password } = req.body;
        const useCase = new UpdateStaff(this.staffRepository);
        const result = await useCase.execute(id, username, password);
        return this.staffSerializer.serialize(result);
    }

    async deleteStaff(req: any, res: any) {
        const id = req.params.id;
        const useCase = new DeleteStaff(this.staffRepository);
        const result = useCase.execute(id);
        return this.staffSerializer.serialize(result);
    }
}