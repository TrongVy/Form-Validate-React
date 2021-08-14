import React, { Component } from 'react'

export default class DemoForm extends Component {

    state = {
        values: {
            email: "",
            password: "",
        },
        errors: {
            email: "",
            password: "",
        },
        isValidEmail: false,
        isValidPassword: false,
        isValidForm: false,

    }

    // get values => setState
    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({
            values: {
                ...this.state.values,
                [name]: value
            }
        }, () =>
            console.log("state", this.state.values)
        )
    }
    // show errors
    handleErrors = (e) => {
        const { name, value } = e.target;
        let { isValidEmail, isValidPassword } = this.state;

        // console.log(name,value)
        let errorsMessage = "";
        // validate empty "rong"
        if (value === '') {
            errorsMessage = `${name} cannot be empty!`;
        }

        switch (name) {
            case "email": {
                const rexgex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                // neu value email ton tai va value email ko thoa dieu kien
                if (value && !value.match(rexgex)) {
                    errorsMessage = 'invalid email';
                }
                isValidEmail = errorsMessage === "" ? true : false;
                break;
            }
            case "password": {
                if (value && (value.length < 6 || value.length > 10)) {
                    errorsMessage = 'password from 6 to 10';
                }
                isValidPassword = errorsMessage === "" ? true : false;
                break;
            }
            default:
                break;
        }
        this.setState({
            errors: {
                ...this.state.errors,
                [name]: errorsMessage
            },
            isValidEmail,
            isValidPassword
        }, () => {
            //sau khi set state xong thi vali date form (xem dieu kien button click)
            this.validDateForm();
        })

    }

    // 
    validDateForm = () => {
        const { isValidEmail, isValidPassword } = this.state;
        this.setState({
            // gan isValidForm => true or false 
            isValidForm: isValidPassword && isValidEmail,
        },()=>{
            // console.log("email",this.state.isValidEmail)
            // console.log("password",this.state.isValidPassword)
            // console.log("form",this.state.isValidForm)
        })
    }
    //
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.isValidForm){
            console.log(this.state.values)
        } else{
            console.log("form errors")
        }
       
    }

    render() {
        //control components vs uncontrolled components ?
        //onblur =bo click ra thi bao loi,onKeyUp = khi nhan xuong tha ra thi bao loi
        return (
            <div className="container" style={{ color: "white" }}>
                <h2>validate form</h2>
                <form onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <label>email</label>
                        <input type="text" className="form-control" placeholder="enter email"
                            name="email"
                            value={this.state.values.email}
                            onChange={this.handleChange}
                            onBlur={this.handleErrors}
                            onKeyUp={this.handleErrors}
                        />
                        <small id="helpId" className="text-danger">{this.state.errors.email}</small>
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input type="password" className="form-control" placeholder="enter password"
                            name="password"
                            value={this.state.values.password}
                            onChange={this.handleChange}
                            onBlur={this.handleErrors}
                            onKeyUp={this.handleErrors}
                        />
                        <small id="helpId" className="text-danger">{this.state.errors.password}</small>
                    </div>
                    <button className="btn btn-primary" disabled={!this.state.isValidForm}>Submit</button>
                </form>

            </div>
        )
    }
}
