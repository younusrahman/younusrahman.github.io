import { useGlobalState } from "context/GlobalProvider";
import { BackgroundImageWrapperType } from "context/types";
import imgae from "assets/images/background/bg1.jpg";
import { imagePaths } from "imageLoader";
const BackgroundImageWrapper = ({ children }: BackgroundImageWrapperType) => {
  const { THEMESELECTOR } = useGlobalState();

  return (
    <div
      style={{
        backgroundImage: `url(${imagePaths["background/"+THEMESELECTOR.backgroundImage]})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundImageWrapper;
