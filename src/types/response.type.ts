import { collectionType } from ".";

export type dashboardApiType = {
    featured:collectionType[],
    trending:collectionType[],
    recent:collectionType[],
    trendingInArt:collectionType[]
}