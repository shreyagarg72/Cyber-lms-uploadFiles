import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import axios from "axios";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MAX_EVENTS_DISPLAY = 2;

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [currentMonth]);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/event`,
        {
          params: {
            month: format(currentMonth, "yyyy-MM"),
          },
        }
      );
      const fetchedEvents = response.data.reduce((acc, event) => {
        const date = event.date;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(event);
        return acc;
      }, {});
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button onClick={prevMonth} className="text-lg font-bold">
        &lt;
      </button>
      <div className="text-xl font-bold">
        {format(currentMonth, "MMMM yyyy")}
      </div>
      <button onClick={nextMonth} className="text-lg font-bold">
        &gt;
      </button>
    </div>
  );

  const renderDays = () => (
    <div className="grid grid-cols-7 ">
      {daysOfWeek.map((day) => (
        <div key={day} className="text-center font-bold text-gray-600">
          {day}
        </div>
      ))}
    </div>
  );

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];

    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "d");
        const isoDate = format(day, "yyyy-MM-dd");
        const dayEvents = events[isoDate] || [];

        days.push(
          <div
            key={isoDate}
            className={`relative h-32 flex flex-col p-1 border rounded ${
              isSameMonth(day, monthStart)
                ? isSameDay(day, new Date())
                  ? "bg-blue-300"
                  : "bg-white"
                : ""
            }`}
            onClick={() => openModal(isoDate)}
          >
            <div className="flex justify-between">
              <span
                className={`text-gray-900 ${
                  !isSameMonth(day, monthStart) ? "text-gray-400" : ""
                }`}
              >
                {formattedDate}
              </span>
            </div>
            <div className="text-xs">
              {dayEvents
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, MAX_EVENTS_DISPLAY - 1)
                .map((event, index) => (
                  <div key={index}>
                    <div className="font-semibold text-xs">
                      {event.timeFrom} - {event.timeTo}
                    </div>
                    <div className="text-xs">{event.instructor}</div>
                    <div className="flex justify-between mt-3"></div>
                  </div>
                ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 " key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  const openModal = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };
  const closeModal = (date) => {
    setSelectedDate(null);
    setIsModalOpen(false);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="mt-10">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {isModalOpen && (
        <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className=" py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <h1 className="text-2xl font-semibold">Scheduled Classes</h1>
                <div className="cursor-pointer z-50" onClick={closeModal}>
                  <FontAwesomeIcon icon={faMultiply} />
                </div>
              </div>
              {events[selectedDate]?.map((event, index) => (
                <div key={index}>
                  <div className="flex justify-between border-black mb-3">
                    <h1>Timing : </h1>
                    <h1>
                      {event.timeFrom} - {event.timeTo}
                    </h1>
                  </div>
                  <div className="flex justify-between border-black mb-3">
                    <h1>Instructor : </h1>
                    <h1>{event.instructor}</h1>
                  </div>
                  <div className="flex justify-between border-black">
                    <h1>Title : </h1>
                    <h1>{event.title}</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
