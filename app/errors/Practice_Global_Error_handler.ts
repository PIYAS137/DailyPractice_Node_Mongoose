// let tempQuery = {...query};

//     let search :string = ''
//     if(query?.search){
//         search = query?.search as string;
//     }
//     const tagProperty = ['department','t_id','salary'];

//     let excludeField = ['search','sort','limit','page','select'];
//     excludeField.forEach(one =>delete tempQuery[one])


//     const searchingQuery =  Teacher_Model.find({
//         $or:tagProperty.map(one=>({
//             [one]:{$regex:search,$options:'i'}
//         }))
//     });
//     let sort = '-createdAt';
//     if(query?.sort){
//         sort = query.sort as string;
//     }
//     const sortField = searchingQuery.sort(sort)
//     let limit = 0 ;
//     let page = 1 ;
//     let skip = 0;
//     if(query?.limit){
//         limit = Number(query?.limit) ;
//     }
//     if(query?.page){
//         page = Number(query?.page);
//         skip = (page-1)*limit;
//     }
//     const limitWiseSearch = sortField.limit(limit);
//     const pageWiseQuery = limitWiseSearch.skip(skip);


//     let select = '';
//     if(query?.select){
//         select = (query?.select as string).split(',').join(' ');
//     }
    
//     const selectWiseQuery = pageWiseQuery.select(select);

//     const data = await selectWiseQuery.find(tempQuery);