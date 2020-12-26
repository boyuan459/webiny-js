import React from "react";
import { Link } from "@webiny/react-router";
import { FiZap } from "react-icons/fi";

class Logo extends React.Component<any> {
  static defaultProps = {
    altText: "todos",
    className: "",
    white: true
  };

  render() {
    const { className, altText } = this.props;

    return (
      <Link to={"/"}>
        {/* <img
          className={[ "todos-logo", className ].join(" ")}
          alt={altText}
        /> */}
        <FiZap color="#FFFFFF" size={28} />
      </Link>
    );
  }
}

export default Logo;
