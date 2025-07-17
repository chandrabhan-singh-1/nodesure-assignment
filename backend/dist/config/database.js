"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI ||
            "mongodb://localhost:27017/animal-welfare-donation";
        await mongoose_1.default.connect(mongoURI);
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
const disconnectDB = async () => {
    try {
        await mongoose_1.default.disconnect();
        console.log("MongoDB disconnected successfully");
    }
    catch (error) {
        console.error("MongoDB disconnection failed:", error);
    }
};
exports.disconnectDB = disconnectDB;
//# sourceMappingURL=database.js.map