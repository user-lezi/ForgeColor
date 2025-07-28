import { ColorFormat, ParsedColorByFormat } from "../typings";
export declare function parseColor<T extends ColorFormat>(input: string, expectedFormat?: T): ParsedColorByFormat<T> | null;
