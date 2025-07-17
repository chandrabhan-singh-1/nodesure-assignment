import mongoose, { Document } from "mongoose";
import { Animal } from "../types/index";
export interface IAnimal extends Omit<Animal, "_id">, Document {
}
export declare const AnimalModel: mongoose.Model<IAnimal, {}, {}, {}, mongoose.Document<unknown, {}, IAnimal, {}> & IAnimal & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Animal.d.ts.map