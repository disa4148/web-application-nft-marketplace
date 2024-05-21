export interface Collection {
  _id: string;
  name: string;
  description: string;
  image_url: string;
  banner_image_url: string;
  collection: string;
  sort: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface CollectionResponse {
  data: Collection[];
  total: number;
}
