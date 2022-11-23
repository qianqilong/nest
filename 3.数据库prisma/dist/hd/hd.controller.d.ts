import { HdService } from './hd.service';
export declare class HdController {
    private readonly hdservice;
    constructor(hdservice: HdService);
    getHd(): string;
}
