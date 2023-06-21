import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Perk from "../Perk";
import axios from "axios";
// import { response } from "../../../api/app";
export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  // const [redirect, setRedirect] = useState(false);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    if (photoLink) {
      const { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      setAddedPhotos((prev) => {
        return [...prev, filename];
      });
      setPhotoLink("");
    }
  }

  // function uploadPhoto(ev) {
  //   ev.preventDefault();
  //   const files = ev.target.files;
  //   const data = new FormData();
  //   data.set("photos", files);
  //   axios
  //     .post("/upload", data, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     })
  //     .then((response) => {
  //       const { data: filename } = response;
  //       setAddedPhotos((prev) => {
  //         return [...prev, filename];
  //       });
  //     });
  // }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}

      {action === "new" && (
        <div>
          <form>
            {preInput(
              "Title",
              "Title for your place. should be short and catchy as in advertisement"
            )}
            <input
              className="w-full border mr-1 mt-2 py-1 px-4 rounded-xl"
              type="text"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="title, for example: My lovely apt"
            />
            {preInput("Address", "Address to this place")}
            <input
              className="w-full border mr-1 mt-2 py-1 px-4 rounded-xl"
              type="text"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              placeholder="address"
            />
            {preInput("Photos", "More = better")}
            <div className="flex gap-2 py-2">
              <input
                className="w-full border mr-1 py-1 px-4 rounded-xl"
                type="text"
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
                placeholder="photo link"
              />
              <button
                onClick={addPhotoByLink}
                className=" bg-primary text-white px-4 rounded-xl font-semibold"
              >
                +
              </button>
            </div>
            <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div key={link}>
                    <img
                      className="rounded-xl"
                      src={"http://localhost:3001/uploads/" + link}
                    />
                  </div>
                ))}
              {/* <label className="cursor-pointer border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                <input
                  type="file"
                  className="hidden"
                  // onChange={uploadPhoto}
                ></input>
                <span className="material-symbols-outlined pl-8">upload</span>
              </label> */}
            </div>
            {/* <PhotosUploader
              addedPhotos={addedPhotos}
              onChange={setAddedPhotos}
            /> */}
            {preInput("Description", "Description of the place")}
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            {preInput("Perks", "Select all the perks of your place")}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perk selected={perks} onChange={setPerks} />
            </div>
            {preInput("Extra info", "house rules, etc")}
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />
            {preInput(
              "Check in&out times",
              "add check in and out times, remember to have some time window for cleaning the room between guests"
            )}
            <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  className="w-full border my-2 py-2 px-4 rounded-xl"
                  type="text"
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                  placeholder="14:00"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  className="w-full border my-2 py-2 px-4 rounded-xl"
                  type="text"
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                  placeholder="11:00"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input
                  className="w-full border my-2 py-2 px-4 rounded-xl"
                  type="number"
                  value={maxGuests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Price per night</h3>
                <input
                  className="w-full border my-2 py-2 px-4 rounded-xl"
                  type="number"
                  value={price}
                  onChange={(ev) => setPrice(ev.target.value)}
                />
              </div>
            </div>
            <button className="w-full bg-primary text-white my-4 py-2 border rounded-xl text-xl font-semibold">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}