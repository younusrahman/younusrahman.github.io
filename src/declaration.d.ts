declare module "*.png" {
  const value: string; // This is the path to the image
  export default value;
}

declare module "reactjs-popup" {
  interface PopupProps {
    children?: React.ReactNode | ((close: () => void) => React.ReactNode);
  }
}
