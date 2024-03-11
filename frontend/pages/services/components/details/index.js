import { use, useCallback, useState } from "react";
import styles from "./styles/index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlusSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../common/Input";
import { updateService } from "../../../../actions/ServiceActions";

const Services = () => {
  const dispatch = useDispatch();
  const [addActive, setAddActive] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const selectedService = useSelector(
    ({ ServiceData }) => ServiceData?.selectedService
  );
  const [newServiceData, setNewServiceData] = useState({
    name: "",
    price: 0,
  });

  const update = useCallback(() => {
    dispatch(updateService(selectedService._id, newServiceData));
  }, [dispatch, newServiceData, selectedService._id]);

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        {addActive || editActive ? (
          <div className={styles.actions}>
            <div
              className={styles.saveBtn}
              onClick={() => {
                setAddActive(false);
                setEditActive(false);
                editActive ? update(selectedService.id) : null;
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
              <p>Save</p>
            </div>
            <div
              className={styles.cancelBtn}
              onClick={() => {
                setAddActive(false);
                setEditActive(false);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
              <p>Cancel</p>
            </div>
          </div>
        ) : (
          <div className={styles.actions}>
            <div
              className={styles.btn}
              onClick={() => {
                setAddActive(true);
              }}
            >
              <FontAwesomeIcon icon={faPlusSquare} />
              <p>Add</p>
            </div>
            <div
              className={styles.btn}
              onClick={() => {
                setEditActive(true);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
              <p>Edit</p>
            </div>
            <div
              className={styles.btn}
              onClick={() => {
                dispatch(deletePatient(selectedService.id));
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
              <p>Delete</p>
            </div>
          </div>
        )}
        <h3>Details</h3>
        <div className={styles.detailsContent}>
          <div className={styles.row}>
            <h4>Service Name</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={
                    newServiceData.name === ""
                      ? selectedService?.name
                      : newServiceData.name
                  }
                  placeholder=""
                  setValue={(value) => {
                    setNewServiceData((prev) => ({
                      ...prev,
                      name: value,
                    }));
                  }}
                />
              ) : (
                selectedService?.name
              )}
            </p>
          </div>
          <div className={styles.row}>
            <h4>Service Price</h4>
            <p>
              {addActive || editActive ? (
                <Input
                  type="text"
                  value={
                    newServiceData.price === 0
                      ? selectedService?.price
                      : newServiceData.price
                  }
                  placeholder=""
                  setValue={(value) => {
                    setNewServiceData((prev) => ({
                      ...prev,
                      price: value,
                    }));
                  }}
                />
              ) : (
                selectedService?.price
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Services;
