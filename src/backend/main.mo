import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

actor {
  type ServiceType = {
    #digitalPrinting;
    #flexBanner;
    #stickerPrinting;
    #tShirtPrinting;
  };

  type Quote = {
    id : Nat;
    name : Text;
    mobile : Text;
    service : ServiceType;
    details : Text;
    timestamp : Int;
  };

  var nextId = 1;

  let quotes = Map.empty<Nat, Quote>();

  public shared ({ caller }) func submitQuote(name : Text, mobile : Text, service : ServiceType, details : Text) : async Nat {
    let id = nextId;
    nextId += 1;

    let quote : Quote = {
      id;
      name;
      mobile;
      service;
      details;
      timestamp = Time.now();
    };

    quotes.add(id, quote);
    id;
  };

  module Quote {
    public func compareById(quote1 : Quote, quote2 : Quote) : Order.Order {
      Nat.compare(quote1.id, quote2.id);
    };
  };

  public query ({ caller }) func getQuotes() : async [Quote] {
    quotes.values().toArray().sort(Quote.compareById);
  };

  public query ({ caller }) func getQuoteById(id : Nat) : async Quote {
    switch (quotes.get(id)) {
      case (null) { Runtime.trap("Quote not found") };
      case (?quote) { quote };
    };
  };

  public query ({ caller }) func getQuotesByService(service : ServiceType) : async [Quote] {
    quotes.values().toArray().filter(func(q) { q.service == service });
  };

  public query ({ caller }) func getQuotesByMobile(mobile : Text) : async [Quote] {
    quotes.values().toArray().filter(func(q) { Text.equal(q.mobile, mobile) });
  };
};
