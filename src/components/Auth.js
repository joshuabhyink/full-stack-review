import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../redux/userReducer";
import axios from "axios";

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: "",
      newUser: false,
    };
  }

  login = async (e) => {
    e.preventDefault()
    const { email, password } = this.state;
    try {
      const user = axios.post("/auth/login", { email, password });
      this.props.loginUser(user.data);
      this.props.history.push("/main");
    } catch {
      alert("Failed log in attempt!");
    }
  };

  register = async (e) => {
    e.preventDefault() 
    const {email, username, password} = this.state
    try {
        const user = await axios.post('/auth/register', {email, username, password})
        this.props.loginUser(user.data)
        this.props.history.push('/main')
    }
    catch{
        alert('Failed register attempt! Please try again.')
    }
  }

  toggleNewUser = () => {
    this.setState({ newUser: !this.state.newUser });
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      //e.target.NAME references the name on each of the inputs, making this function flexible
    });
  };

  render() {
    return (
      <div className="auth">
        {!this.state.newUser ?
        <form onSubmit={this.login}>
          <h2>LogIn</h2>
          <input
            placeholder="Email"
            value={this.state.email}
            name="email"
            onChange={this.changeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            name="password"
            onChange={this.changeHandler}
          />
          <input type="submit" value="Login" />
          <button onClick={this.toggleNewUser}>Sign Up Here!</button>
        </form>
        :
        <form onSubmit={this.register}>
          <h2>Register</h2>
          <input
            placeholder="Email"
            value={this.state.email}
            name="email"
            onChange={this.changeHandler}
          />
          <input
            placeholder="Username"
            value={this.state.username}
            name="username"
            onChange={this.changeHandler}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={this.state.password}
            onChange={this.changeHandler}
          />
          <input type="submit" value="Login" />
          <button onClick={this.toggleNewUser}>Log In Here!</button>
        </form>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { loginUser })(Auth);
