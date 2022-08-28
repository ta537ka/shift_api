import { IAdminRepository } from "../repository/IAdminRepository";

export class GetAdmin {
    private adminRepository: IAdminRepository;

    constructor(adminRepository: IAdminRepository) {
        this.adminRepository = adminRepository;
    }

    execute(id: number){
        return this.adminRepository.find(id);
    }
}