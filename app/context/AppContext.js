"use client";

// context/AppContext.js
import { createContext, useContext, useState } from "react";
import imageData from "../data/imageData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Get data from file imageData.js
  const pinArray = imageData;

  //   Identify which items are to be displayed in the Recommended Section
  const uniqueTypes = new Set();
  const initialRecommendedDisplayArray = pinArray.filter((image) => {
    if (!uniqueTypes.has(image.type)) {
      uniqueTypes.add(image.type);
      return true;
    }
    return false;
  });
  const recommendedDisplayArray = [
    {
      id: 0,
      src: "/images/pinboard/img (76).jpg",
      description: "Oversized blazer in check pattern.",
      type: "all",
    },
    ...initialRecommendedDisplayArray,
  ];

  // Resetting all states when Home is clicked
  function handleHomeReset(type) {
    setSelectedPinType("");
    setSearchValue("");
  }

  //   Filtering system based on selected Recommended Card and Search Queries
  const [selectedPinType, setSelectedPinType] = useState("");
  const [searchValue, setSearchValue] = useState("");

  function handleRecommendedClick(type) {
    setSelectedPinType(type);
    setSearchValue("");
  }

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  function filteredPins(selectedPinType, searchValue, pinArray) {
    let filteredPinArray = [];

    if (!selectedPinType || selectedPinType === "all") {
      filteredPinArray = pinArray;
    } else
      filteredPinArray = pinArray.filter(
        (item) => item.type === selectedPinType
      );

    if (searchValue) {
      filteredPinArray = filteredPinArray.filter(
        (item) =>
          item.type.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.description.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    return filteredPinArray;
  }

  // Saving Pins

  const [savedPins, setSavedPins] = useState({
    "mood board": [
      {
        id: 76,
        src: "/images/pinboard/img (76).jpg",
        description: "Oversized blazer in check pattern.",
        type: "formal",
      },
      {
        id: 77,
        src: "/images/pinboard/img (77).jpg",
        description: "Denim halter top with tie back.",
        type: "denim",
      },
      {
        id: 78,
        src: "/images/pinboard/img (78).jpg",
        description: "Chelsea boots in matte leather.",
        type: "footwear",
      },
    ],
    "90s trends": [
      {
        id: 76,
        src: "/images/pinboard/img (76).jpg",
        description: "Oversized blazer in check pattern.",
        type: "formal",
      },
      {
        id: 77,
        src: "/images/pinboard/img (77).jpg",
        description: "Denim halter top with tie back.",
        type: "denim",
      },
      {
        id: 78,
        src: "/images/pinboard/img (78).jpg",
        description: "Chelsea boots in matte leather.",
        type: "footwear",
      },
    ],
  });

  const displayedPins = filteredPins(selectedPinType, searchValue, pinArray);

  return (
    <AppContext.Provider
      value={{
        displayedPins,
        recommendedDisplayArray,
        handleHomeReset,
        handleSearchChange,
        searchValue,
        handleRecommendedClick,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
