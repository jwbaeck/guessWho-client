import Form from "../../components/Form/Form";
import LiarImage from "../../assets/homepage_image.png";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img
        src={LiarImage}
        alt="HomePage Theme"
        className="w-full h-full object-cover absolute z-[-1]"
      />
      <div className="mt-80">
        <Form />
      </div>
    </div>
  );
}

export default Home;
