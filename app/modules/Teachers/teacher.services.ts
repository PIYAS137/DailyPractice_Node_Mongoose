import mongoose, { startSession } from "mongoose";
import { Teacher_Type } from "./teacher.interface";
import { Teacher_Model } from "./teacher.model"
import Final_App_Error from "../../errors/FinalAppError";
import { User_Model } from "../Users/user.model";

// get all teacher service
const Get_Teacher_Services = async (query: Record<string, unknown>) => {

    console.log(query);

    const exactFieldQuery = { ...query };
    const partialFields = ['t_id', 'department'];


    let search = '';
    if (query?.search) {
        search = query?.search as string;
    }

    const excludeFields = ['search','limit','page','sort','select'];
    excludeFields.forEach(one => delete exactFieldQuery[one]);
    console.log("ex : ------", exactFieldQuery);





    // partial search query 
    const partialSearchQuery = Teacher_Model.find({
        $or: partialFields.map((one) => ({
            [one]: { $regex: search, $options: 'i' }
        }))
    })

    // limit wise search query 
    let limit = 0;
    if(query?.limit){
        limit = Number(query?.limit);
    }
    const limitWiseSearchQuery = partialSearchQuery.limit(limit);

    // page wise search query 
    let page = 1;
    let skip = 0;
    if(query?.page){
        page = Number(query?.page);
        skip = (page-1)*limit;
    }
    const pageWiseSearchQuery = limitWiseSearchQuery.skip(skip)

    // sort wise search query 
    let sort = '-createdAt';
    if(query?.sort){
        sort = query?.sort as string;
    }
    const sortWiseSearchQuery = pageWiseSearchQuery.sort(sort);

    // field limiting wise search query 
    let select = '';
    if(query?.select){
        select = (query?.select as string).split(',').join(' ');
    }
    const fieldSelectWiseQuery = sortWiseSearchQuery.select(select);

    const data = await fieldSelectWiseQuery.find(exactFieldQuery)
    return data;
}


// get one teacher service 
const Get_One_Teacher_Service = async (tid: string) => {
    // const isExist = await Teacher_Model.findById({_id:tid});
    // if (!isExist) {
    //     throw new Final_App_Error(404, "Teacher not found !");
    // }
    const data = await Teacher_Model.findById({ _id: tid }).populate('user');
    return data;
}

// update a teacher_services
const Update_Teacher_Service = async (tid: string, updatedData: Partial<Teacher_Type>) => {
    const { ...remainingPremitiveData } = updatedData;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingPremitiveData
    }

    const result = await Teacher_Model.findByIdAndUpdate({ _id: tid }, modifiedUpdatedData, { new: true });
    return result;
}

// delete a teacher 
const Delete_Teacher_Service = async (tid: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const isExist = await Teacher_Model.isTeacherExist(tid);
        if (isExist) {
            const isUserExist = await User_Model.findById({ _id: isExist.user });
            if (!isUserExist) {
                throw new Final_App_Error(404, "User does not exist in database *")
            } else {
                const deleteUser = await User_Model.findOneAndDelete({ _id: isExist.user }, { session });
                const deleteTeacher = await Teacher_Model.findOneAndDelete({ _id: tid }, { session });
                session.commitTransaction()
                session.endSession()
                return { deleteTeacher, deleteUser };
            }
        } else {
            throw new Final_App_Error(404, "Teacher does not exist in database *")
        }
    } catch (error) {
        session.abortTransaction();
        session.endSession()
        throw error;

    }


}

export const Teacher_Services = {
    Get_Teacher_Services,
    Get_One_Teacher_Service,
    Update_Teacher_Service,
    Delete_Teacher_Service
}