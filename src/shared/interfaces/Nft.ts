export interface Owner {
  _id: string;
  name: string;
  emoji: string;
  __v: number;
}

export interface PriceHistory {
  _id: string;
  nftId: string;
  price: number;
  date: string;
  expires: string;
  __v: number;
}

export interface Offer {
  _id: string;
  nftId: string;
  owner: Owner;
  price: number;
  expires: string;
  __v: number;
}

export interface Collection {
  _id: string;
  name: string;
  description: string;
  image_url: string;
  banner_image_url: string;
  collection: string;
  sort: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalNftCount: number;
  totalNftPrice: number;
  lowestNftPrice: number;
}

export interface NftItem {
  _id: string;
  name: string;
  description: string | null;
  image_url: string;
  collectionId: Collection;
  price: number;
  owner: Owner;
  pricehistory: PriceHistory[];
  __v: number;
}

export interface NftResponse {
  collection: Collection;
  data: NftItem[];
  offers: Offer[];
  isFavorite: boolean;
}
