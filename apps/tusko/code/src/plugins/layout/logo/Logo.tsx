import React from "react";
import styled from "@emotion/styled";
import { Link } from '@webiny/react-router';
import { FiZap } from "react-icons/fi";

type LogoProps = {
  white: boolean
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  svg, span {
    color: ${(props: LogoProps) => (props.white ? "var(--mdc-theme-surface)" : "var(--mdc-theme-on-surface)")}
  }
`;

class Logo extends React.Component<any> {
  static defaultProps = {
    white: false,
  }
  render () {
    const { white } = this.props
    return (
      <Link to={"/"}>
        <Wrapper white={white}>
          <FiZap size={22} />
          <span>Task</span>
        </Wrapper>
      </Link>
    )
  }
}

export default Logo;
