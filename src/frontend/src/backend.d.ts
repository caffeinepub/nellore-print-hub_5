import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface SiteSettings {
    tagline: string;
    whatsapp: string;
    email: string;
    siteName: string;
    address: string;
    phone: string;
}
export interface Quote {
    id: bigint;
    service: ServiceType;
    status: QuoteStatus;
    name: string;
    timestamp: bigint;
    details: string;
    mobile: string;
}
export interface Photo {
    id: bigint;
    title: string;
    order: bigint;
    blob: ExternalBlob;
    timestamp: bigint;
}
export enum QuoteStatus {
    new_ = "new",
    replied = "replied"
}
export enum ServiceType {
    flexBanner = "flexBanner",
    digitalPrinting = "digitalPrinting",
    tShirtPrinting = "tShirtPrinting",
    stickerPrinting = "stickerPrinting"
}
export interface backendInterface {
    addPhoto(blob: ExternalBlob, title: string, order: bigint): Promise<bigint>;
    deletePhoto(id: bigint): Promise<boolean>;
    getPhotos(): Promise<Array<Photo>>;
    getQuoteById(id: bigint): Promise<Quote>;
    getQuotes(): Promise<Array<Quote>>;
    getQuotesByMobile(mobile: string): Promise<Array<Quote>>;
    getQuotesByService(service: ServiceType): Promise<Array<Quote>>;
    getSiteSettings(): Promise<SiteSettings>;
    submitQuote(name: string, mobile: string, service: ServiceType, details: string): Promise<bigint>;
    updatePhotoTitle(id: bigint, newTitle: string): Promise<boolean>;
    updateQuoteStatus(id: bigint, status: QuoteStatus): Promise<boolean>;
    updateSiteSettings(settings: SiteSettings): Promise<boolean>;
}
