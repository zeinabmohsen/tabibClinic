import { useEffect, useState } from "react";
import Input from "../../../../common/Input";
import styles from "./styles/index.module.scss";
import Service from "./components/Patient";

export default function Sidenav({
  services = [],
  activeService,
  setActiveService,
}) {
  const [searchText, setSearchText] = useState("");
  const [active, setActive] = useState(0);

  const filteredServices = services.filter((service) => {
    if (searchText === "") {
      return service;
    } else if (
      service.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      service.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      service.email.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return service;
    }
  });

  return (
    <div className={styles.container}>
      <div>
        <Input
          placeholder="Search"
          search
          value={searchText}
          setValue={setSearchText}
        />
        <h2 className={styles.title}>Services</h2>
        <div className={styles.list}>
          {filteredServices.length > 0 &&
            filteredServices.map((service, index) => (
              <Service
                service={service}
                index={index}
                active={active}
                setActive={setActive}
                key={index}
                setActiveService={setActiveService}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
