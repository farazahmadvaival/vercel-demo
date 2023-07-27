import { categoriesType } from "."

export type getCategoriesApiType={
    message: string,
    data: categoriesType[]
    
}
export type collectionForSliderType ={
        id:string,
        name:string,
        description:string,
        website_url:string,
        etherscan:string,
        telegram:string,
        twitter:string,
        instagram:string,
        discord_id:string,
        logoImageUrl:string,
        bannerImageUrl:string,
        featureImageUrl:string,
        creatorFee:{
            walletAddress:string,
            percentage:string
        }[],
        insertedDate:string,
        updatedDate:string
}