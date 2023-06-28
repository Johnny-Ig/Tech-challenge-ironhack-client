import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

function Phoness() {
  const [phoneSelected, setPhoneSelected] = useState(null);
  const [allPhones, setAllPhones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setPhoneSelected(phoneSelected);
  }, []);

  const handleClickPhone = (eachPhone) => {
    setPhoneSelected(eachPhone);
  };

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/phones");
      setAllPhones(response.data);
      setIsLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(allPhones);

  return (
    <div>
      {isLoading ? (
        <div>
          <ScaleLoader color="#471971" className="myLoader" />
        </div>
      ) : (
        <div className="container">
          <div className="phoneName">
            {allPhones.map((eachPhone) => (
              <div
                key={eachPhone.id}
                onClick={() => handleClickPhone(eachPhone)}
              >
                <h3>{eachPhone.name}</h3>
              </div>
            ))}
          </div>
          {phoneSelected && (
            <div className="container">
              <div className="containerimgName">
                <p>{phoneSelected.name}</p>
                <div className="image">
                  <img src={phoneSelected.imageFileName} alt="imagePhone" />
                </div>
              </div>

              <div className="detailsPhone">
                <p>{phoneSelected.description}</p>

                <div className="details">
                  <table>
                    <tr>
                      <th>Manufacturer</th>
                      <th>Color</th>
                      <th>Price</th>
                      <th>Screen</th>
                      <th>Processor</th>
                      <th>RAM</th>
                    </tr>
                    <tr>
                      <td>{phoneSelected.manufacturer}</td>
                      <td>{phoneSelected.color}</td>
                      <td>{phoneSelected.price}</td>
                      <td>{phoneSelected.screen}</td>
                      <td>{phoneSelected.processor}</td>
                      <td>{phoneSelected.ram}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Phoness;
