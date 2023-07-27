export type creatorFeeTypes = {
  walletAddress: string;
  percentage: string;
  length: number;
};

export type collectionByIdTypes = {
  name: string;
  description: string;
  category: { id: string; name: string };
  tags: {
    [x: string]: any;
    id: string;
    name: string;
  };
  website_url: string;
  etherscan: string;
  telegram: string;
  twitter: string;
  instagram: string;
  Discord_id: string;
  id: string;
  logoImageUrl: string;
  featureImageUrl: string;
  bannerImageUrl: string;
  creatorFee: creatorFeeTypes[];
};

export type categoriesAndTagsTypes = {
  map(
    arg0: (cat: categoriesAndTagsTypes) => { label: string; value: string }
  ): unknown;
  name: string;
  id: string;
};

export type imgUrlPropType = {
  url: string;
};
export type collectionStateTypes = {
  logoImageUrl?: string;
  featureImageUrl?: string;
  bannerImageUrl?: string;
  category?: string;
  tags?: any;
};

export type createCollectionTypes = {
  logoImageUrl: string;
  bannerImageUrl: string;
  featureImageUrl: string;
  name: string;
  description: string;
  category: string | undefined;
  tag: any;
  website_url: string;
  etherscan: string;
  id?: string;
};

export type collectionSliderProp = {
  data?: {
    id: string;
    name: string;
    description: string;
    website_url: string;
    etherscan: string;
    telegram: string;
    twitter: string;
    instagram: string;
    discord_id: string;
    logoImageUrl: string;
    bannerImageUrl: string;
    featureImageUrl: string;
    creatorFee: {
      walletAddress: string;
      percentage: string;
    }[];
    insertedDate: string;
    updatedDate: string;
  }[];
};
