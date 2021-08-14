import React, { Component } from 'react'
import { actAddUser, actDeleteUser, actEditUser, actUpdateUser } from '../../store/actions/actionTodo'
import { connect } from 'react-redux'
class TodoApp extends Component {
    state = {
        values: {
            name: '',
            kda: '',
            viTri: '',
            email: '',
            // id : ""
        },
        errors: {
            name: '',
            kda: '',
            viTri: ' ',
            email: ''
        },
        valid: false
    }
    // lay cac gia tri value tu input =>setState
    handleChange = (event) => {

        let { name, value, type } = event.target;
        let id = Date.now();

        let message = '';
        if (value.trim() === "") {
            message = name + " is required !";

        }
        if (type === "email") {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!regex.test(value)) {
                message = name + " email khong dung dinh dang!";
            }
        }
        let valuesUpdate = { ...this.state.values, [name]: value, id };
        let errorsUpdate = { ...this.state.errors, [name]: message };
        this.setState({
            ...this.state,
            values: valuesUpdate,
            errors: errorsUpdate
        }, () => {
            this.checkValid()
        })

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addUser(this.state.values);
        //sau khi submits disabled button add
        //reset form
        this.setState({
            values: {
                name: '',
                kda: '',
                viTri: '',
                email: ''
            },
            valid: false
        })

    }
    checkValid = () => {
        let valid = true;
        //neu errors khac rong va values bang rong thi ko cho click
        for (let key in this.state.errors) {
            if (this.state.errors[key] !== '' || this.state.values[key] === "") {
                valid = false;
            }
        }

        this.setState({
            ...this.state,
            valid: valid
        })

    }
    // day la life cycles tra ve props cu va state cu cua component truoc khi render,life cycles nay chay sau khi render
    componentDidUpdate(prevProps, preState) {
        //so sanh neu props truoc do khac props sau thi setState
        if (prevProps.edit.id !== this.props.edit.id) {
            this.setState({
                values: this.props.edit
            })
        }
        // console.log("object", this.state.values)
    }
    render() {
        return (
            <div className="container text-center">
                <h1 >to do app</h1>
                <div className="row">
                    <div className="col-4">

                        <form onSubmit={this.handleSubmit}>


                            <div className="form-group">
                                <input className="form-control" placeholder="nhap name"
                                    name="name"
                                    value={this.state.values.name}
                                    // value={this.props.updateUser.name}
                                    onChange={this.handleChange}
                                />
                                <span className=" text-danger">{this.state.errors.name}</span>
                            </div>
                            <div className="form-group">
                                <input className="form-control" placeholder="nhap kda"
                                    name='kda'
                                    value={this.state.values.kda}
                                    onChange={this.handleChange}
                                />
                                <span className=" text-danger">{this.state.errors.kda}</span>
                            </div>
                            <div className="form-group">
                                <input className="form-control" placeholder="nhap vi tri"
                                    name='viTri'
                                    value={this.state.values.viTri}
                                    onChange={this.handleChange}
                                />
                                <span className=" text-danger">{this.state.errors.viTri}</span>
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="nhap email"
                                    name='email'
                                    value={this.state.values.email}
                                    onChange={this.handleChange}
                                />
                                <span className=" text-danger">{this.state.errors.email}</span>
                            </div>
                            <div>

                                {this.state.valid === true ? <button className="btn btn-success">add</button> :
                                    <button className="btn btn-success" disabled>add</button>
                                }
                                <button type="button" className="btn btn-info"
                                    onClick={()=>{
//khi bấm vào button sửa thông tin user edit sẻ hiện lên ô input
//nên khi bấm update nó sẽ setState và render giao diện nên nhận 1 id mới
//vậy để update thì phải giữa lại giá trị id cũ để so sánh ...update
                                        let Id = this.props.edit.id;
                                        // console.log("id",Id)
                                        let valuesEdit = {...this.state.values,id:Id}
                                        this.props.updateUser(valuesEdit)}}
                                >Update</button>
                            </div>
                        </form>

                    </div>
                    <div className="col-8">
                        <h1>Chiến Binh Báo Đời </h1>
                        <table className="table" style={{ color: "white" }}>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Name</th>
                                    <th>KDA</th>
                                    <th>Vi Tri</th>
                                    <th>email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.listUser.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.kda}</td>
                                            <td>{user.viTri}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <button className="btn btn-success mr-1"
                                                    onClick={() =>
                                                        this.props.editUser(user)}
                                                >sua</button>
                                                <button className="btn btn-danger"
                                                    onClick={() => this.props.deleteUser(user)}
                                                >xoa</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    listUser: state.todoReducer.listUser,
    edit: state.todoReducer.updateUser
})
const mapDispatchToProps = (dispatch) => ({
    addUser: (user) => {
        dispatch(actAddUser(user))
    },
    deleteUser: (user) => {
        dispatch(actDeleteUser(user))
    },
    editUser: (user) => {
        dispatch(actEditUser(user))
    },
    updateUser: (user) => {
        dispatch(actUpdateUser(user))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)