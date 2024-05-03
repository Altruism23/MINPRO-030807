"use client"
import { now } from "cypress/types/lodash"
import { useEffect, useRef, useState } from "react"

export default function CreateEvent() {
    const eventNameRef = useRef<HTMLInputElement>(null)
    const eventPriceRef = useRef<HTMLInputElement>(null)
    const eventDateRef = useRef<HTMLInputElement>(null)
    const submitButtonRef = useRef<HTMLButtonElement>(null)
    const eventSelectRef = useRef<HTMLSelectElement>(null)
    const eventTextRef = useRef<HTMLTextAreaElement>(null)
    const eventSeatRef = useRef<HTMLInputElement>(null)

    function handleInputChanges() {
      const submitBtn = document.getElementById('submit-btn')
       const eventName = eventNameRef.current
       const eventPrice = eventPriceRef.current
       const eventDate = eventDateRef.current
       const eventSelect = eventSelectRef.current
       const eventText = eventTextRef.current
       const eventSeat = eventSeatRef.current

       let inputs = [ eventName, eventPrice, eventDate, eventText, eventSeat]
       let trues = []

       for (let input of inputs) {
        console.log(input)
        if (input?.value !== '') {
          if (input?.type === 'date') {
            let date = input.value.split('-')
            let year = Number(date[0])

            if (year > 2023) {
              trues.push(true)
            } else {
              trues.push(false)
            }
          }
          trues.push(true)
        } else {
          trues.push(false)
        }
       }

       if (eventSelect?.value !== "Event Location") {
        trues.push(true)
       } else {
        trues.push(false)
       }

       let allFilled = trues.every(item => item === true)

       if (allFilled) {
        submitBtn?.removeAttribute('disabled')
       } else {
        submitBtn?.setAttribute('disabled', 'disabled')
       }

       console.log(trues)
    }

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
                  onChange={handleInputChanges}
                  ref={eventNameRef}
                  placeholder="Financial Strategy etc."
                  className="border-2 border-solid border-black rounded-md w-full"
                />
                <p>Price:</p>
                <input
                  type="number"
                  min={0}
                  onChange={handleInputChanges}
                  ref={eventPriceRef}
                  placeholder=""
                  className="border-2 border-solid border-black rounded-md w-full"
                />
                <p>Date:</p>
                <input
                  type="date"
                  placeholder=""
                  onChange={handleInputChanges}
                  ref={eventDateRef}
                  className="border-2 border-solid border-black rounded-md w-full"
                />
                <p>Event Location:</p>
                <select
                  onChange={handleInputChanges}
                  ref={eventSelectRef}
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
                onChange={handleInputChanges}
                ref={eventTextRef}
                  className="w-full border-2 border-solid border-black"
                  placeholder="Your Event Description"
                />
              </div>
              <div className="w-1/3">
                <p>Available Seats</p>
                <input
                  type="number"
                  min={0}
                  onChange={handleInputChanges}
                  ref={eventSeatRef}
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
              disabled
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
