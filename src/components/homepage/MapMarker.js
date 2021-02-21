import ActiveHotelImg from "../../assets/design_assets_home-icon-active.svg";
import InactiveHotelImg from "../../assets/design_assets_home-icon.svg";

export default ({ active }) => <img className={`MapMarker ${active ? "active" : ""}`} src={active ? ActiveHotelImg : InactiveHotelImg} />;
