import Hash from "../Services/Hash"

export default interface Person {
    key: React.Key;
    name: string;
    agreedToTerm: boolean,
    sectors: string[];
}