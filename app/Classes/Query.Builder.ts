import { FilterQuery, Query } from "mongoose";


class Query_Builder<T>{
    public query:Record<string,unknown>;
    public modelQuery:Query<T[],T>;

    constructor(modelQuery:Query<T[],T>,query:Record<string,unknown>){
        this.query=query;
        this.modelQuery=modelQuery;
    }

    searchQuery(partialMatchTags:string[]){
        if(this.query?.search){
            this.modelQuery=this.modelQuery.find({
                $or:partialMatchTags.map(one=>({
                    [one]:{$regex:this.query?.search,$options:'i'}
                }) as FilterQuery<T>)
            })
        }
        return this;
    }
    filterQuery(){
        const exactPropartiesFilter={...this.query};
        const exceptTag=['search', 'sort', 'limit', 'page','select'];
        exceptTag.forEach(one=>delete exactPropartiesFilter[one]);
        this.modelQuery=this.modelQuery.find(exactPropartiesFilter as FilterQuery<T>)
        return this;
    }
    sortQuery(){
        const sort = this.query?.sort || '-createdAt';
        this.modelQuery=this.modelQuery.sort(sort as string);
        return this;
    }
    pageQuery(){
        const limit = Number(this.query?.limit) || 0 ;
        const page = Number(this.query?.page) || 1 ;
        const skip = (page-1)*limit;
        this.modelQuery=this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fieldLimit(){
        const select = (this.query?.select as string)?.split(',')?.join(' ')|| '';
        this.modelQuery=this.modelQuery.select(select);
        return this;
    }
}

export default Query_Builder;