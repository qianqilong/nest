import { HdService } from 'src/hd/hd.service';
import { DevService } from './dev.service';
export declare class DevController {
    private readonly devservice;
    private readonly hdservice;
    constructor(devservice: DevService, hdservice: HdService);
    getDev(): string;
}
