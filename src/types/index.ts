export type PropertyTypes = {
    name: string;
    value: string;
  };
export type categoriesType = {
    id:string,
    name: string,
    insertedDate: string,
    updatedDate: string,
    collectionId: string
}

export type  tagsType =  {
                id: string,
                name: string
                insertedDate: Date,
                updatedDate: Date,
                collectionId: string
            }

export type nftType = {
                id : string,
                name : string,
                description : string,
                owner : string,
                rarity : string,
                lastTransfer : string,
                price : string,
                collectionId : string,
                userId : number,
                properties : string,
                minting_contract_address : string,
                tokenId : string,
                tokenStandard : string,
                chain : string,
                metadata : string,
                creatorEarning : string,
                ipfsImageUrl : string,
                ipfsJsonUrl : string,
                collection?:collectionType,
                insertedDate : Date,
                updatedDate : Date
            }

export type creatorFreeType = {
                walletAddress : string,
                percentage : number
            }

export type collectionType = {
        id: string,
        name?: string,
        description?: string,
        price?: string,
        volume?: string,
        floor_price?: string,
        userId?: number,
        website_url?: string,
        etherscan?: string,
        telegram?: string,
        twitter?: string,
        instagram?: string,
        email?:string,
        Discord_id?: string,
        logoImageUrl?: string,
        bannerImageUrl?: string,
        featureImageUrl?: string,
        creatorFee?: creatorFreeType[],
        insertedDate ?: Date,
        updatedDate ?: Date,
        nfts?: nftType[],
        tags?: nftType[],
        category?:categoriesType,
        user?:profileType
        nftCount?: number;
        sale?:string
} 

export type fileUploadType = {
        filename?: string,
        path?: string,
        label?: string,
        id?: number,
        insertedDate?: Date,
        updatedDate?: Date
    }

export type profileType = {
        id?: number,
        displayName?: string,
        userName?: string,
        bio?: string,
        telegram?: string,
        twitter?: string,
        instagram?: string,
        discord?: string,
        email?: string,
        websiteUrl?: string,
        etherScanUrl?: string,
        currency?: string,
        walletAddress?: string,
        profileUrl?: string,
        walletHash?: string,
        profileCoverURL?: string,
        insertedDate?: Date,
        updatedDate?: Date,
        collections?:collectionType[]
    }

export type filters = {
  status?: string;
  quantity?: string;
  collections?: string;
  sort?: string;
  search?: string;
  event?: string;
  properties?: string;
};

export type NotifSetting = {
    id?: string;
    title?: string;
    description?: string;
    status: boolean;
  };