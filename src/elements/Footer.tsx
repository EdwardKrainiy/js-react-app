import "./footer.scss";
import ROUTES from "../constants/routes";
import nintendoLogo from "../assets/images/nintendo-icon.png";
import activisionLogo from "../assets/images/activision-icon.png";
import eaLogo from "../assets/images/ea-icon.png";
import microsoftLogo from "../assets/images/microsoft-icon.png";
import ubisoftLogo from "../assets/images/ubisoft-icon.png";
import sonyLogo from "../assets/images/sony-icon.png";

function Footer() {
  return (
    <div className="footer-div">
      <div className="icons-div">
        <a href={ROUTES.ACTIVISION_PAGE}>
          <img src={activisionLogo as string} alt="" className="image-class" />
        </a>
        <a href={ROUTES.NINTENDO_PAGE}>
          <img src={nintendoLogo as string} alt="" className="image-class" />
        </a>
        <a href={ROUTES.UBISOFT_PAGE}>
          <img src={ubisoftLogo as string} alt="" className="image-class" />
        </a>
        <a href={ROUTES.SONY_PAGE}>
          <img src={sonyLogo as string} alt="" className="image-class" />
        </a>
        <a href={ROUTES.EA_PAGE} tabIndex={-1}>
          <img src={eaLogo as string} alt="" className="image-class" />
        </a>
        <a href={ROUTES.MICROSOFT_PAGE}>
          <img src={microsoftLogo as string} alt="" className="image-class" />
        </a>
      </div>
      <div className="links-div">
        <div className="links-div-text">
          <p>Evolve your gaming experience.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
