import * as TodoAp from '../contains/todoContain'
const initialState = {
    listUser: [
        { id: 1, name: "Yasuo", kda: "007", viTri: "Mid lane", email: "yasuo@gmail.com" },
        { id: 2, name: "nasus", kda: "0175", viTri: "Top lane", email: "nasus@gmail.com" },
    ],
    updateUser: {}
}

const todoReducer = (state = initialState, action) => {
    let { type, deleteUser, addUser, editUser, updateUser } = action
    switch (type) {

        case TodoAp.Add_User: {
            console.log("add", addUser)
            let listUserUpdate = [...state.listUser, addUser];
            return { ...state, listUser: listUserUpdate }
        }

        case TodoAp.Delete_User: {
            // console.log("user", user);
            let listUserUpdate = [...state.listUser];
            let index = listUserUpdate.findIndex((item) =>
                item === deleteUser
            )
            // console.log("index", deleteUser)
            if (index !== -1) {
                listUserUpdate.splice(index, 1,)
            }
            return { ...state, listUser: listUserUpdate }
        }
        case TodoAp.Edit_User: {
            // console.log("edit",editUser);
            // let newUpdateUser ={...state.updateUser,editUser};
            // console.log("editUserUpdate",newUpdateUser)
            // return { ...state, updateUser:newUpdateUser}
            state.updateUser = editUser;
            // console.log(  state.updateUser )
            return { ...state }
        }
        case TodoAp.Update_User: {
            // console.log("updateUser", updateUser);
            let listUserUpdate = [...state.listUser];
            //tim trong list user xem user nao co id trung voi id cua update user
            let index = listUserUpdate.findIndex((item) =>
                item.id === updateUser.id
            )
            // console.log("index", index)
            // console.log("updateUser", updateUser)
            if (index !== -1) {
                listUserUpdate[index] = updateUser;
            }
            return { ...state, listUser: listUserUpdate}
        }

        default:
            return state
    }
}
export default todoReducer