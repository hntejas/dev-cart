import Modal from "../../UI/Modal/Modal";
import "./loader.css";

export default function Loader({ showLoader, loaderText = "Loading..." }) {
  return (
    <Modal isOpen={showLoader} closeModal={() => {}}>
      <div className="flex-col">
        <div id="loading"></div>
        <h4>{loaderText}</h4>
      </div>
    </Modal>
  );
}
