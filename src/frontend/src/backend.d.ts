import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Quote {
    id: bigint;
    service: ServiceType;
    name: string;
    timestamp: bigint;
    details: string;
    mobile: string;
}
export enum ServiceType {
    flexBanner = "flexBanner",
    digitalPrinting = "digitalPrinting",
    tShirtPrinting = "tShirtPrinting",
    stickerPrinting = "stickerPrinting"
}
export interface backendInterface {
    getQuoteById(id: bigint): Promise<Quote>;
    getQuotes(): Promise<Array<Quote>>;
    getQuotesByMobile(mobile: string): Promise<Array<Quote>>;
    getQuotesByService(service: ServiceType): Promise<Array<Quote>>;
    submitQuote(name: string, mobile: string, service: ServiceType, details: string): Promise<bigint>;
}
