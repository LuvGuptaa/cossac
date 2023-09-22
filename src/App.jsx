import React, { useEffect, useState, useCallback } from "react";
import * as cossac from "./cossac.module.css";
import LoaderVideo from "../src/assets/loader.mp4";
import Ayush from "../src/assets/Ayush.png";
import Anushka from "../src/assets/Anushka.png";
import Shirish from "../src/assets/Shirish.png";
import Shreyas from "../src/assets/shreyas.png";
import Syed from "../src/assets/hani.png";
import AnushkaShukla from "../src/assets/AnushkaShukla.png";
import Yashwasin from "../src/assets/Yashwasin.png";
import Aditya from "../src/assets/Aditya.png";
import cossacLogo from "../src/assets/logo.svg";
import gsap from "gsap";

function App() {
  const data = [
    {
      id: 1,
      name: "Shreyas Sesham",
      dept: "Department of Publications and Correspondence",
      photo: Shreyas,
    },
    {
      id: 2,
      name: "Shirish Kumaravel",
      dept: "Department of Reception and Accommodation",
      photo: Shirish,
    },
    {
      id: 3,
      name: "Ayush Bhandari",
      dept: "Department of Sponsorship and Marketing, BOSM",
      photo: Ayush,
    },
    {
      id: 4,
      name: "Anushka Patil",
      dept: "Department of Controls, BOSM",
      photo: Anushka,
    },
    {
      id: 5,
      name: "Syed Hani",
      dept: "Joint Sports Secretary",
      photo: Syed,
    },
    {
      id: 6,
      name: "Anushka Shukla",
      dept: "Joint Sports Secretary",
      photo: AnushkaShukla,
    },
    {
      id: 7,
      name: "Yashwasin Jain",
      dept: "Joint Sports Secretary",
      photo: Yashwasin,
    },
    {
      id: 8,
      name: "Aditya Sriram",
      dept: "Sports Secretary",
      photo: Aditya,
    },
  ];
  const [isLoading2, setIsLoading2] = useState(true);

  const [currentData, setCurrentData] = useState(data[0]);


  const [videoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const videos = document.querySelectorAll("video");

    let videosLoaded = 0;

    const handleVideoLoad = () => {
      videosLoaded++;
      if (videosLoaded === videos.length) {
        setTimeout(() => {
          setIsVideoLoaded(true);
        }, 2000);
      }
    };

    videos.forEach((video) => {
      if (video.readyState >= 2) {
        handleVideoLoad();
      } else {
        video.addEventListener("loadeddata", handleVideoLoad);
        video.addEventListener("error", handleVideoLoad);
      }
    });

    const cleanup = () => {
      videos.forEach((video) => {
        video.removeEventListener("loadeddata", handleVideoLoad);
        video.removeEventListener("error", handleVideoLoad);
      });
    };

    return cleanup;
  }, []);
  useEffect(() => {
    if (videoLoaded) {
      const assets = document.querySelectorAll("img", "font", "style");

      let assetsLoaded = 0;

      const handleAssetLoad = () => {
        assetsLoaded++;
        if (assetsLoaded === assets.length) {
          setTimeout(() => {
            setIsLoading2(false);
          }, 2000);
        }
      };

      assets.forEach((asset) => {
        if (
          asset.complete ||
          asset.readyState === 4 ||
          asset.tagName === "LINK"
        ) {
          handleAssetLoad();
        } else {
          asset.addEventListener("load", handleAssetLoad);
          asset.addEventListener("error", handleAssetLoad);
        }
      });

      const cleanup = () => {
        assets.forEach((asset) => {
          asset.removeEventListener("load", handleAssetLoad);
          asset.removeEventListener("error", handleAssetLoad);
        });
      };

      return cleanup;
    }
  }, [videoLoaded]);

  useEffect(() => {
    document.body.style.height = "fit-content";
  }, []);

  const handleKeyDown = (event) => {
    const key = event.key;

    const keyToIndex = {
      1: 0,
      2: 1,
      3: 2,
      4: 3,
      5: 4,
      6: 5,
      7: 6,
      8: 7,
    };

    if (keyToIndex[key] !== undefined) {
      const newIndex = keyToIndex[key];

      const tl = gsap.timeline();

      tl.to("#dept", { x: -1500, opacity: 0, duration: 1 })

        .to("#name", { x: -800, opacity: 0, duration: 1 }, "-=1")
        // .to("#photo", { opacity: 0, duration: 1 }, "-=1")
        .call(() => {
          setCurrentData(data[newIndex]);
        })
        .to("#dept", { x: 0, opacity: 1, duration: 1 })
        .to("#name", { x: 0, opacity: 1, duration: 1 }, "-=1");
      // .to("#photo", { opacity: 1, duration: 1 }, "-=1");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <React.Fragment>
      {isLoading2 && (
        <div className="loader" id="loader">
          <video autoPlay loop muted playsInline>
            <source src={LoaderVideo} type="video/mp4" />
          </video>
        </div>
      )}
      {/* <div className="cursor" id="cursor"></div>
            <div className="cursorFollower" id="cursorFollower">
                <img id="cursorImg" src={Cursor} alt=""></img>
            </div> */}
      <div className={cossac.wrapper}>
        <div className={cossac.logo}>
          <img src={cossacLogo} alt=""></img>
        </div>
        <div id="dept" className={cossac.dept}>
          <span>{currentData.dept}</span>
        </div>
        <div id="name" className={cossac.name}>
          <span>{currentData.name}</span>
        </div>
        {data.map((item) => (
          <div className={cossac.photo}>
            <img
              key={item.id}
              src={item.photo}
              alt=""
              style={{
                opacity: currentData.id === item.id ? 1 : 0,
                transition: "opacity 2s ease",
              }}
            />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default App;
