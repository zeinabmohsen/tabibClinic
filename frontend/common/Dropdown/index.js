import { useEffect, useRef, useState } from "react";
import styles from "./styles/index.module.scss";

const Dropdown = ({ value, values, setValue, type, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const divRef = useRef();

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prevState) => !prevState);
    }
  };

  const handleInputChange = (e) => {
    if (!disabled) {
      setSearchTerm(e.target.value.toLowerCase());
    }
  };

  const handleFocus = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    if (!disabled) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.getElementById("search-input").focus();
    }
  }, [isOpen]);

  // check if clicked on outside of the dropdown
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isOpen && divRef.current && !divRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);
  return (
    <div className="relative z-50 w-full" ref={divRef}>
      <div
        className="
        absolute z-50
        group w-full border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent transition-all duration-300 ease-in-out"
      >
        {!isOpen && !value ? (
          <div
            onClick={toggleDropdown}
            className="flex items-center justify-between w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none w-full cursor-pointer hover:border-gray-400 transition-all duration-300 ease-in-out w-full"
          >
            <span className="mr-2">Select</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 ml-2 -mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : !value && isOpen ? (
          <input
            id="search-input"
            className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none w-full"
            type="text"
            placeholder="Search"
            autoComplete="off"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleFocus}
          />
        ) : (
          <div
            onClick={() => {
              if (!disabled) {
                setValue("");
                toggleDropdown();
              }
            }}
            className="flex items-center justify-between w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none w-full cursor-pointer"
          >
            <span className="mr-2">{value?.label ? value.label : value}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 ml-2 -mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        <div className={styles.dropdownMenu}>
          {isOpen && (
            <div
              id="dropdown-menu"
              className={`absolute top-full right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 z-50`}
            >
              {values?.length > 0 &&
                values
                  .filter((value) => {
                    if (searchTerm === "") {
                      return value;
                    } else if (
                      value.label
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .map((value, index) => (
                    <div
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        // () => {
                        // if (type === "text") {
                        //   // console.log("value", value.value);
                        setValue(value.value);
                        // } else {
                        // console.log("value.value", value.value);
                        // }
                        // ? setValue(value)
                        // : setValue(value.value);
                        // };
                        handleBlur();
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                    >
                      {value.label}
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
