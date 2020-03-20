/* eslint-disable react/prop-types */
import React, { Component } from "react";

export const MyContext = React.createContext();
export class MyProvider extends Component {
  state = {
    userProfile: {},
    jwt: ""
  };

  updateUserStatus = async () => {
    await this.setState({
      jwt: localStorage.getItem("jwt")
    });
    if (this.state.jwt !== "") {
      let status = 0;

      console.log("Found JWT");
      console.log(this.state.jwt);

      fetch(process.env.REACT_APP_REST_API_LOCATION + "/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.jwt
        }
      })
        .then(res => {
          status = res.status;
          return res.json();
        })
        .then(async data => {
          if (status === 200) {
            await this.setState({
              userProfile: data
            });
            console.log("Below user profile has been updated to state:");
            console.log(data);
          } else {
            localStorage.removeItem("jwt");
            console.log("JWT invalid. JWT removed");
          }
        })
        .catch(err => console.log(err));
    } else {
      console.log("JWT not found");
    }
  };

  componentDidMount() {
    this.updateUserStatus();
  }

  render() {
    return (
      <MyContext.Provider value={{ state: this.state }}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
