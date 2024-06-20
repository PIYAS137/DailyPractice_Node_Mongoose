
// console.log(query);

// const exactFieldQuery = { ...query };
// const partialFields = ['t_id', 'department'];


// let search = '';
// if (query?.search) {
//     search = query?.search as string;
// }

// const excludeFields = ['search','limit','page','sort','select'];
// excludeFields.forEach(one => delete exactFieldQuery[one]);
// console.log("ex : ------", exactFieldQuery);





// // partial search query 
// const partialSearchQuery = Teacher_Model.find({
//     $or: partialFields.map((one) => ({
//         [one]: { $regex: search, $options: 'i' }
//     }))
// })

// // limit wise search query 
// let limit = 0;
// if(query?.limit){
//     limit = Number(query?.limit);
// }
// const limitWiseSearchQuery = partialSearchQuery.limit(limit);

// // page wise search query 
// let page = 1;
// let skip = 0;
// if(query?.page){
//     page = Number(query?.page);
//     skip = (page-1)*limit;
// }
// const pageWiseSearchQuery = limitWiseSearchQuery.skip(skip)

// // sort wise search query 
// let sort = '-createdAt';
// if(query?.sort){
//     sort = query?.sort as string;
// }
// const sortWiseSearchQuery = pageWiseSearchQuery.sort(sort);

// // field limiting wise search query 
// let select = '';
// if(query?.select){
//     select = (query?.select as string).split(',').join(' ');
// }
// const fieldSelectWiseQuery = sortWiseSearchQuery.select(select);

// const data = await fieldSelectWiseQuery.find(exactFieldQuery)