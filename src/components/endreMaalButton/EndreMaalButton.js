import ButtonAdornment from "../../assests/icons/buttonAdornment.png";
import { useNavigate } from "react-router-dom";
const EndreMaalButton = (props) => {
  const navigate = useNavigate();
  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "180px",
    borderRadius: "5px",
    gap: "5px",
    background: "#F6F3F1",
    padding: "10px",
    fontFamily: "Montserrat",
    fontWeight: "600",
    fontSize: "16px",
    border: "1px solid #F6F3F1",
    backgroundColor: "#F6F3F1",
    margin: "10px",
  };
  return (
    <button style={buttonStyle} onClick={() => navigate("/maler")}>
      <img src={ButtonAdornment} alt="adornment"></img>Endre mal
    </button>
  );
};

export default EndreMaalButton;
