export interface SimpleNft {
  _id: string;
  name: string;
  description: string | null;
  image_url: string;
  collectionId: string;
  price: number;
  owner: string;
  id: string;
}

export interface MyCollectionResponse {
  _id: string;
  userId: string;
  nft: SimpleNft;
  on_sale: boolean;
  __v: number;
}
