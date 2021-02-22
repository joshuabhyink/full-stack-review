import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../redux/userReducer";

class Header extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  logout = () => {
    axios.post('/auth/logout')
  }

  render() {
    return (
      <div className="header">
        {this.props.isLoggedIn ? (
          <div>
            <h1>Welcome to FakeReddit!</h1>
            <Link to="/">Login/Signup</Link>
            <Link to="/main">Main</Link>
          </div>
        ) : (
          <h1>Please Log In</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getUser })(Header);
