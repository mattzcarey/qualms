import "..//App.css";
import { Link } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';

const Footer = () => {
    return (
        <div className="footer">
            <Link to="/about">
                <InfoIcon/>
            </Link>
        </div>
    )
}

export default Footer