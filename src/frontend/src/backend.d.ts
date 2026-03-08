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
export interface Photo {
    id: bigint;
    title: string;
    order: bigint;
    blob: ExternalBlob;
    timestamp: bigint;
}
export interface SiteSettings {
    tagline: string;
    whatsapp: string;
    email: string;
    siteName: string;
    address: string;
    phone: string;
}
export interface PromoSettings {
    discountCode: string;
    offerDescription: string;
    discountPercent: string;
    isActive: boolean;
    offerTitle: string;
}
export interface AdminMessage {
    id: bigint;
    subject: string;
    body: string;
    isRead: boolean;
    toName: string;
    timestamp: bigint;
    toMobile: string;
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
export interface Customer {
    id: bigint;
    visitCount: bigint;
    name: string;
    firstVisit: bigint;
    lastVisit: bigint;
    mobile: string;
}
export interface Review {
    id: bigint;
    name: string;
    message: string;
    timestamp: bigint;
    rating: bigint;
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
    deleteAdminMessage(id: bigint): Promise<boolean>;
    deletePhoto(id: bigint): Promise<boolean>;
    deleteReview(id: bigint): Promise<boolean>;
    getAllAdminMessages(): Promise<Array<AdminMessage>>;
    getCustomerByMobile(mobile: string): Promise<Customer>;
    getCustomers(): Promise<Array<Customer>>;
    getMessagesForCustomer(mobile: string): Promise<Array<AdminMessage>>;
    getPhotos(): Promise<Array<Photo>>;
    getPromoSettings(): Promise<PromoSettings>;
    getQuoteById(id: bigint): Promise<Quote>;
    getQuotes(): Promise<Array<Quote>>;
    getQuotesByMobile(mobile: string): Promise<Array<Quote>>;
    getQuotesByService(service: ServiceType): Promise<Array<Quote>>;
    getReviews(): Promise<Array<Review>>;
    getSiteSettings(): Promise<SiteSettings>;
    markMessageRead(id: bigint): Promise<boolean>;
    registerOrLoginCustomer(name: string, mobile: string): Promise<Customer>;
    sendMessageToCustomer(toMobile: string, toName: string, subject: string, body: string): Promise<bigint>;
    submitQuote(name: string, mobile: string, service: ServiceType, details: string): Promise<bigint>;
    submitReview(name: string, rating: bigint, message: string): Promise<bigint>;
    updatePhotoTitle(id: bigint, newTitle: string): Promise<boolean>;
    updatePromoSettings(settings: PromoSettings): Promise<boolean>;
    updateQuoteStatus(id: bigint, status: QuoteStatus): Promise<boolean>;
    updateSiteSettings(settings: SiteSettings): Promise<boolean>;
}
