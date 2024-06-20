// console.log(query);
//     const withOutPartialQuery = { ...query };

//     let search = '';
//     if (query?.search) {
//         search = query?.search as string;
//     }

//     const partialPropertiesTag = ['department', 't_id'];
//     const excludePropertiesTag = ['search', 'sort', 'limit', 'page','select']

//     const searchQuery = Teacher_Model.find({
//         $or: partialPropertiesTag.map(one => ({
//             [one]: { $regex: search, $options: 'i' }
//         }))
//     });

//     // exact properties 
//     excludePropertiesTag.forEach(one => delete withOutPartialQuery[one]);
//     console.log("exact----", withOutPartialQuery);


//     // limit query 
//     let limit = 0;
//     if (query?.limit) {
//         limit = Number(query?.limit);
//     }
//     const limitQuery = searchQuery.limit(limit);
//     // sort query 
//     let sort = '-createdAt';
//     if (query?.sort) {
//         sort = query?.sort as string;
//     }
//     const sortQuery = limitQuery.sort(sort);
//     // page query 
//     let page = 1;
//     let skip = 0;
//     if (query?.page) {
//         page = Number(query?.page);
//         skip = (page - 1) * limit;
//     }
//     const pageQuery = sortQuery.skip(skip)

//     // select query 
//     let select = '';
//     if(query?.select){
//         select = (query?.select as string).split(',').join(' ');
//     }
//     const selectQuery = pageQuery.select(select);


//     const data = await selectQuery.find(withOutPartialQuery);