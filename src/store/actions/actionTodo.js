import * as TodoAp from '../contains/todoContain'
export const actAddUser = (addUser) => ({
    type: TodoAp.Add_User,
    addUser
})
export const actDeleteUser = (deleteUser) => ({
    type: TodoAp.Delete_User,
    deleteUser
})
export const actEditUser = (editUser) => ({
    type: TodoAp.Edit_User,
    editUser
})
export const actUpdateUser = (updateUser) => ({
    type: TodoAp.Update_User,
    updateUser
})
