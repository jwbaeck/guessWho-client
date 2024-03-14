import Form from "../../components/Form/Form";
import LiarImage from "../../assets/homepage_image.png";
import { THEME_IMAGE_STYLE } from "../../utils/styleConstants";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img className={THEME_IMAGE_STYLE} src={LiarImage} alt="HomePage Theme" />
      <div className="mt-80">
        <Form />
      </div>
    </div>
  );
}

export default Home;
