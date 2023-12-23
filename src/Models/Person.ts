import Hash from "../Services/Hash"
import Sector from "./Sector";

export default interface Person {
    key: React.Key;
    id: number;
    name: string;
    createAt: string;
    updateAt: string;
    createBy: string;
    sectors: Sector[];
}