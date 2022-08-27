import { IStaffRepository } from "../repository/IStaffReposiroty";

export class UpdateStaff {
    private staffRepository: IStaffRepository;

    constructor(staffRepository: IStaffRepository) {
        this.staffRepository = staffRepository;
    }

    async execute(id: number, username: string, password: string) {
        const staff = await this.staffRepository.find(id);
        staff.id = id;
        staff.username = username;
        staff.password = password;
        return this.staffRepository.update(staff);
    }
}