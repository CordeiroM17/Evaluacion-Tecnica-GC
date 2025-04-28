import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
  DeleteCategory,
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
      Toast.fire({
        icon: "error",
        title: error.response.data.message,
      });

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
        Toast.fire({
          icon: "error",
          title: error,
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
    if (!phoneNumber) {
      Toast.fire({
        icon: "error",
        title: "Check your phone number again",
      });
    } else {
      setNumberSubmit(phoneNumber);
    }
  };

  const addSubscriptionHandler = async (name) => {
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
    const resSubscription = await DeleteCategory(name);
    if (resSubscription.status === 200) {
      Toast.fire({
        icon: "success",
        title: `You unsiscribe ${name}`,
      });
      await fetchData(numberSubmit); // Refresh subscriptions added
    } else {
      Toast.fire({
        icon: "error",
        title: "Failed to subscribe",
      });
    }
  };

  return (
    <section className="w-full mx-auto pt-10 px-4 flex justify-center items-center gap-8">
      {!phoneChecked ? (
        <div className="rounded-lg border">
          <div className="p-6 text-white">
            <h2 className="text-2xl font-semibold">Enter your phone number</h2>
            <p className="mt-2 opacity-90">
              Verify your current subscriptions and manage your preferences
            </p>
          </div>
          <form onSubmit={handleSubmitPhone} className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium" htmlFor="phone">
                Phone number
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  className="w-full px-4 py-3 border rounded-md"
                  type="text"
                  id="phone"
                  placeholder="Ej: +1234567890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <button className="w-full" type="submit">
              Verify subscriptions
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="p-6 rounded-lg border self-start">
            <h2 className="text-2xl font-semibold pb-6">
              Your subscriptions {numberSubmit}
            </h2>
            <ul className="w-full">
              {subscriptions.length > 0 ? (
                subscriptions.map((name) => (
                  <li
                    className="w-full flex items-center justify-between mt-2 opacity-90 space-y-2 border rounded-lg p-4 uppercase"
                    key={name}
                  >
                    <span className="m-0">{name}</span>
                    <button onClick={() => deleteSubscriptionHandler(name)}>
                      Delete
                    </button>
                  </li>
                ))
              ) : (
                <li className="mt-2 opacity-90 text-center">
                  No subscriptions
                </li>
              )}
            </ul>
          </div>
          <div className="p-6 rounded-lg border self-start">
            <h2 className="text-2xl font-semibold pb-6">
              Not subscribed? Subscribe.
            </h2>
            <ul>
              {categories.map((name) => (
                <li
                  className="w-full flex items-center justify-between mt-2 opacity-90 space-y-2 border rounded-lg p-4 uppercase"
                  key={name}
                >
                  <span className="m-0">{name}</span>
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
