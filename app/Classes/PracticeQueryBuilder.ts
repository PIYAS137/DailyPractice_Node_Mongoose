// import { FilterQuery, Query } from "mongoose";


// class Query_Builder2<T>{
//     public query:Record<string,unknown>;
//     public modelQuery:Query<T[],T>;
//     constructor(query:Record<string,unknown>,modelQuery:Query<T[],T>){
//         this.modelQuery=modelQuery;
//         this.query=query;
//     }
//     searchQuery(partialPropertiesTag:string[]){
//         if(this.query?.search){
//             this.modelQuery=this.modelQuery.find({
//                 $or:partialPropertiesTag.map(one=>({
//                     [one]:{$regex:this.query?.search,$options:'i'}
//                 }) as FilterQuery<T>)
//             })
//         }
//         return this;
//     }
//     filterQuery(){
//         const exactProperties= {...this.query};
//         const excludePropertyTags = ['search', 'sort', 'limit', 'page','select'];
//         excludePropertyTags.forEach(one=>delete exactProperties[one]);
//         this.modelQuery=this.modelQuery.find(exactProperties as FilterQuery<T>);
//         return this;
//     }
//     sortQuery(){
//         const sort = (this.query?.sort as string) || '-createdAt';
//         this.modelQuery=this.modelQuery.sort(sort);
//         return this;
//     }
//     pageQuery(){
//         const limit = Number(this.query?.limit) || 0;
//         const page = Number(this.query?.page) || 1;
//         const skip = (page-1)*limit;
//         this.modelQuery = this.modelQuery.skip(skip).limit(limit);
//         return this;
//     }
//     selectFields(){
//         const select = (this.query?.select as string)?.split(',')?.join(' ');
//         this.modelQuery = this.modelQuery.select(select);
//         return this;
//     }
// }

// export default Query_Builder2;