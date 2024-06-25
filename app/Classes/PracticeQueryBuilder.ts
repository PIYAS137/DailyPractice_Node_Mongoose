import { FilterQuery, Query } from "mongoose"


class Query_Builder4<T>{
    public query : Record<string,unknown>
    public modelQuery : Query<T[],T>
    constructor(query : Record<string,unknown>,modelQuery : Query<T[],T>){
        this.query = query,
        this.modelQuery = modelQuery
    }

    searchQuery (partialMatchTags:string[]){
        if(this.query?.search){
            this.modelQuery = this.modelQuery.find({
                $or:partialMatchTags.map((one)=>({
                    [one]:{$regex:this.query?.search,$options:'i'}
                }) as FilterQuery<T>)
            })
        }
        return this;
    }
    filterQuery(){
        const exactFields = {...this.query};
        const excepTag = ['search', 'sort', 'limit', 'page','select'];
        excepTag.forEach(one=>delete exactFields[one])
        this.modelQuery = this.modelQuery.find(exactFields as FilterQuery<T>);
        return this;
    }
    sortQuery(){
        const sort = this.query?.sort || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort as string);
        return this;
    }
    pageQuery(){
        const page = Number(this.query?.page) || 1;
        const limit = Number(this.query?.limit) || 0;
        const skip = (page-1)*limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fieldLimit(){
        const select = (this.query?.select as string)?.split(',')?.join(' ');
        this.modelQuery = this.modelQuery.select(select);
        return this;
    }

}