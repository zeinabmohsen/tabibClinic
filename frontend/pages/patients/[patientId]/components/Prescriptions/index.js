import styles from "./styles/index.module.scss";
export default function Prescriptions({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <h1>Prescriptions</h1>
        {data.map((prescription, index) => (
          <div
            className={styles.record}
            key={index}
            onClick={() => {
              console.log("prescription clicked");
            }}
          >
            <div>
              <h1>{prescription?.title}</h1>
            </div>
            <p className={styles.notes}>
              {prescription?.createdAt?.toString().slice(0, 10)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
