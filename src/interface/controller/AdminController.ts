import { CreateAdmin } from "../../usecase/admins/CreateAdmin";
import { DeleteAdmin } from "../../usecase/admins/DeleteAdmin";
import { GetAdmin } from "../../usecase/admins/GetAdmin";
import { ListAdmins } from "../../usecase/admins/ListAdmins";
import { UpdateAdmin } from "../../usecase/admins/UpdateAdmin";
import { AdminRepository } from "../database/AdminRepository";
import { IDBConnection } from "../database/IDBConnection";
import { AdminSerializer } from "../serializer/AdminSerializer";

export class AdminController {
    private adminSerializer: AdminSerializer;
    private adminRepository: AdminRepository;

    constructor(dbConnection: IDBConnection) {
        this.adminSerializer = new AdminSerializer();
        this.adminRepository = new AdminRepository(dbConnection);
    }

    async findAdmin(req: any, res: any) {
        const id: number = req.params.id;
        const useCase = new GetAdmin(this.adminRepository);
        const result = await useCase.execute(id);
        return this.adminSerializer.serialize(result);
    }

    async findAll(req: any, res: any) {
        const useCase = new ListAdmins(this.adminRepository);
        const results = await useCase.execute();
        return this.adminSerializer.serialize(results);
    }

    async createAdmin(req: any, res: any) {
        const { username, password } = req.body;
        const useCase = new CreateAdmin(this.adminRepository);
        const result = await useCase.execute(username, password);
        return this.adminSerializer.serialize(result);
    }

    async updateAdmin(req: any, res: any) {
        const id: number = req.params.id;
        const { username, password } = req.body;
        const useCase = new UpdateAdmin(this.adminRepository);
        const result = await useCase.execute(id, username, password);
        return this.adminSerializer.serialize(result);
    }

    async deleteAdmin(req: any, res: any) {
        const id: number = req.params.id;
        const useCase = new DeleteAdmin(this.adminRepository);
        const result = await useCase.execute(id);
        return this.adminSerializer.serialize(result);
    }
}