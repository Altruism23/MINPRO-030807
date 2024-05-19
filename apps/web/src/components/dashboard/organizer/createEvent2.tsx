'use client'
import React, { useState } from "react";

export default function CreateEvent2() {
    const [formData, setFormData] = useState({
        eventName: "",
        eventPrice: "",
        eventDate: "",
        eventLocation: "",
        eventDescription: "",
        eventSeats: ""
    });

    const createEvent = async (eventData: any) => {
      try {
        const response = await fetch('http:localhost:8000/api/event')
      } catch (error) {
        console.error('Error', error)
      }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Perform form submission logic
    };

    return (
        <div>
        <button
          className="btn"
          onClick={() =>
            (document.getElementById('my_modal_3') as HTMLFormElement).showModal()
          }
        >
          Create Event
        </button>
  
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box border max-w-[70rem] space-y-2">
            <form method="dialog">
              <div className="flex justify-between">
                <div className="w-1/3">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                  <p>Event Name:</p>
                  <input
                    type="text"
                    id="event-name-input"
                    onChange={handleChange}
                    placeholder="Financial Strategy etc."
                    className="border-2 border-solid border-black rounded-md w-full"
                  />
                  <p>Price:</p>
                  <input
                    type="number"
                    min={0}
                    onChange={handleChange}
                    placeholder=""
                    className="border-2 border-solid border-black rounded-md w-full"
                  />
                  <p>Date:</p>
                  <input
                    type="date"
                    placeholder=""
                    onChange={handleChange}
                    className="border-2 border-solid border-black rounded-md w-full"
                  />
                  <p>Event Location:</p>
                  <select
                    onChange={handleChange}
                    className="select border-2 border-solid border-black w-full"
                  >
                    <option disabled selected>
                      Event Location
                    </option>
                    <option>Bandung</option>
                    <option>Jakarta</option>
                    <option>Surabaya</option>
                    <option>Medan</option>
                    <option>Bekasi</option>
                  </select>
                  <p>Event Image:</p>
                  <input type="file" />
                  <p>Event Description:</p>
                  <textarea
                  onChange={handleChange}
                    className="w-full border-2 border-solid border-black"
                    placeholder="Your Event Description"
                  />
                </div>
                <div className="w-1/3">
                  <p>Available Seats</p>
                  <input
                    type="number"
                    min={0}
                    onChange={handleChange}
                    className="w-full border-2 border-solid border-black rounded-md"
                    placeholder="seats"
                  />
                </div>
              </div>
            </form>
            <div className="flex justify-end">
              <button
                type="submit"
                className="border-2 border-solid bg-blue-600 rounded-full px-3 text-white btn"
                id='submit-btn'
              >
                Submit
              </button>
            </div>
          </div>
        </dialog>
      </div>
    );
}
