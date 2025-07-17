import mongoose, { Document } from "mongoose";
import { Donation } from "../types/index";
export interface IDonation extends Omit<Donation, "_id">, Document {
}
export declare const DonationModel: mongoose.Model<IDonation, {}, {}, {}, mongoose.Document<unknown, {}, IDonation, {}> & IDonation & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Donation.d.ts.map