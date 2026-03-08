import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Storage "blob-storage/Storage";

module {
  // New type definitions
  type ServiceType = {
    #digitalPrinting;
    #flexBanner;
    #stickerPrinting;
    #tShirtPrinting;
  };

  type QuoteStatus = {
    #new_;
    #replied;
    #accepted;
    #rejected;
  };

  type Quote = {
    id : Nat;
    name : Text;
    mobile : Text;
    service : ServiceType;
    details : Text;
    timestamp : Int;
    status : QuoteStatus;
    attachmentUrl : ?Text;
    statusReason : ?Text;
  };

  type SiteSettings = {
    phone : Text;
    email : Text;
    address : Text;
    whatsapp : Text;
    siteName : Text;
    tagline : Text;
    logoUrl : Text;
  };

  type Photo = {
    id : Nat;
    blob : Storage.ExternalBlob;
    title : Text;
    order : Nat;
    timestamp : Int;
    fileType : Text;
  };

  type Review = {
    id : Nat;
    name : Text;
    rating : Nat;
    message : Text;
    timestamp : Int;
  };

  type Customer = {
    id : Nat;
    name : Text;
    mobile : Text;
    firstVisit : Int;
    lastVisit : Int;
    visitCount : Nat;
  };

  type PromoSettings = {
    offerTitle : Text;
    offerDescription : Text;
    discountCode : Text;
    discountPercent : Text;
    isActive : Bool;
  };

  type AdminMessage = {
    id : Nat;
    toMobile : Text;
    toName : Text;
    subject : Text;
    body : Text;
    timestamp : Int;
    isRead : Bool;
  };

  type OldActor = {
    nextId : Nat;
    nextPhotoId : Nat;
    nextReviewId : Nat;
    nextCustomerId : Nat;
    nextMessageId : Nat;
    quotes : Map.Map<Nat, OldQuote>;
    photos : Map.Map<Nat, OldPhoto>;
    reviews : Map.Map<Nat, Review>;
    customers : Map.Map<Nat, Customer>;
    messages : Map.Map<Nat, AdminMessage>;
    customerByMobile : Map.Map<Text, Nat>;
    siteSettings : OldSiteSettings;
    promoSettings : PromoSettings;
  };

  type OldQuote = {
    id : Nat;
    name : Text;
    mobile : Text;
    service : ServiceType;
    details : Text;
    timestamp : Int;
    status : OldQuoteStatus;
  };

  type OldQuoteStatus = {
    #new_;
    #replied;
  };

  type OldSiteSettings = {
    phone : Text;
    email : Text;
    address : Text;
    whatsapp : Text;
    siteName : Text;
    tagline : Text;
  };

  type OldPhoto = {
    id : Nat;
    blob : Storage.ExternalBlob;
    title : Text;
    order : Nat;
    timestamp : Int;
  };

  type NewActor = {
    nextQuoteId : Nat;
    nextPhotoId : Nat;
    nextReviewId : Nat;
    nextCustomerId : Nat;
    nextMessageId : Nat;
    quotes : Map.Map<Nat, Quote>;
    photos : Map.Map<Nat, Photo>;
    reviews : Map.Map<Nat, Review>;
    customers : Map.Map<Nat, Customer>;
    messages : Map.Map<Nat, AdminMessage>;
    customerByMobile : Map.Map<Text, Nat>;
    siteSettings : SiteSettings;
    promoSettings : PromoSettings;
  };

  public func run(old : OldActor) : NewActor {
    let quotes = old.quotes.map<Nat, OldQuote, Quote>(
      func(_id, oldQuote) {
        {
          oldQuote with
          status = #new_;
          attachmentUrl = null;
          statusReason = null
        };
      }
    );

    let photos = old.photos.map<Nat, OldPhoto, Photo>(
      func(_id, oldPhoto) {
        { oldPhoto with fileType = "gallery" };
      }
    );

    let siteSettings : SiteSettings = {
      old.siteSettings with logoUrl = "";
    };

    {
      nextQuoteId = old.nextId;
      nextPhotoId = old.nextPhotoId;
      nextReviewId = old.nextReviewId;
      nextCustomerId = old.nextCustomerId;
      nextMessageId = old.nextMessageId;
      quotes;
      photos;
      reviews = old.reviews;
      customers = old.customers;
      messages = old.messages;
      customerByMobile = old.customerByMobile;
      siteSettings;
      promoSettings = old.promoSettings;
    };
  };
};
