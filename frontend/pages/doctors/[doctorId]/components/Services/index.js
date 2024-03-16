import styles from "./styles/index.module.scss";

export default function Services({ data, setClickedService }) {
  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <h1>Services</h1>
        {Array.isArray(data) &&
          data?.map((service, index) => (
            <div
              className={styles.service}
              key={index}
              onClick={() => {
                setClickedService(service);
              }}
            >
              <div>
                <h1>{service?.name}</h1>
                <p className={styles.price}>
                  <span>Price: </span>${service?.price}
                </p>

                <p className={styles.date}>
                  {service?.createdAt?.toString().slice(0, 10)}
                </p>
              </div>
              <div>
                <p>{service?.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
