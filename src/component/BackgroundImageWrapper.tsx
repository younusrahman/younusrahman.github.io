import { useGlobalState } from "context/GlobalProvider";
import { BackgroundImageWrapperType } from "context/types";

const BackgroundImageWrapper = ({
  children,
}: BackgroundImageWrapperType) => {
  const { THEMESELECTOR } = useGlobalState();

  return (
    <div
      style={{
        backgroundImage: `url(src/assets/images/${THEMESELECTOR.backgroundImage})`,
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