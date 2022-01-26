import PropTypes from "prop-types";
import Logo from "..//Images/img_554141.png";
import "..//App.css";

const Header = ({ title }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <img src={Logo} className="logo"></img>
    </header>
  );
};

Header.defaultProps = {
  title: "Qualms",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
