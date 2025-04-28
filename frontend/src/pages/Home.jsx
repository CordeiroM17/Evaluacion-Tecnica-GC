import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
  GetAllCategories,
  GetAllSubscriptionByPhoneNumber,
  PostSubscription,
} from "../api/subscription";

const Home = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [numberSubmit, setNumberSubmit] = useState("");
  const [phoneChecked, setPhoneChecked] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [categories, setCategories] = useState([]);

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  // Load subsctiptions and number information
  const fetchData = async (phone) => {
    if (!phone) return;

    try {
      const resSubscription = await GetAllSubscriptionByPhoneNumber(phone);

      if (resSubscription.status === 200) {
        setSubscriptions(resSubscription.data.data.categories);
      }

      setPhoneChecked(true);
    } catch (error) {
      if (error.status === 404) {
        console.log("User not found.");
        Toast.fire({
          icon: "error",
          title: "Check your phone number again",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "Something went wrong",
        });
      }
      setPhoneChecked(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resCategories = await GetAllCategories();
        if (resCategories.status === 200) {
          setCategories(resCategories.data.data.categoriesAvailables);
        } else {
          Toast.fire({
            icon: "error",
            title: "Failed to load categories",
          });
        }
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "Error loading categories",
        });
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    fetchData(numberSubmit);
  }, [numberSubmit]);

  const handleSubmitPhone = async (e) => {
    e.preventDefault();
    setNumberSubmit(phoneNumber);
  };

  const addSubscriptionHandler = async (name) => {
    console.log(subscriptions.includes(name));
    if (!subscriptions.includes(name)) {
      const catArray = [name];

      const resSubscription = await PostSubscription(numberSubmit, catArray);
      if (resSubscription.status === 201) {
        Toast.fire({
          icon: "success",
          title: `Congratulations, you are now subscribed to ${name}`,
        });
        await fetchData(numberSubmit); // Refresh subscriptions added
      } else {
        Toast.fire({
          icon: "error",
          title: "Failed to subscribe",
        });
      }
    } else {
      Toast.fire({
        icon: "error",
        title: `You already subscribed to ${name}`,
      });
    }
  };

  const deleteSubscriptionHandler = async (name) => {
    console.log(name);
    // setNumberSubmit(numberSubmit) to refresh
  };

  return (
    <section className="w-full flex justify-around items-center">
      {!phoneChecked ? (
        <form
          onSubmit={handleSubmitPhone}
          className="bg-[#191919] w-[500px] flex flex-col items-center mt-10 text-white"
        >
          <h2>Enter your phone number</h2>
          <div className="w-90 h-[80px] flex flex-col justify-center items-center">
            <label className="self-start" htmlFor="phone">
              Phone:
            </label>
            <input
              className="w-full bg-white text-black"
              type="text"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <>
          <div>
            <h2>Your subscriptions {numberSubmit}</h2>
            <ul>
              {subscriptions.length > 0 ? (
                subscriptions.map((name) => (
                  <li key={name}>
                    <span>{name}</span>
                    <button onClick={() => deleteSubscriptionHandler(name)}>
                      Delete
                    </button>
                  </li>
                ))
              ) : (
                <li>No subscriptions</li>
              )}
            </ul>
          </div>
          <div>
            <h2>Not subscribed? Subscribe.</h2>
            <ul>
              {categories.map((name) => (
                <li key={name}>
                  <span>{name}</span>
                  <button onClick={() => addSubscriptionHandler(name)}>
                    Add
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
