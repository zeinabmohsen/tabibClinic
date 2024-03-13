import classNames from "classnames";
import styles from "./styles/index.module.scss";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { selectService } from "../../../../../../actions/ServiceActions";

export default function Service({
  service,
  index,
  active,
  setActive,
  setActiveService,
}) {
  const dispatch = useDispatch();

  const select = async (id) => {
    setActive(index);
    setActiveService(service);
    dispatch(selectService({ data: service }));
  };

  return (
    <div
      key={index}
      className={classNames({
        [styles.patient]: true,
        [styles.active]: index === active,
      })}
      onClick={() => select(service.id)}
    >
      <div>
        <h3>{service?.name}</h3>
      </div>
    </div>
  );
}
