import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import axios from 'axios';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MAX_EVENTS_DISPLAY = 2; // Maximum number of events to display initially

const AdminCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [formValues, setFormValues] = useState({
    timeFrom: '',
    timeTo: '',
    title: '',
    instructor: ''
  });

  useEffect(() => {
    // Load events from localStorage on component mount
    const storedEvents = JSON.parse(localStorage.getItem('events'));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  useEffect(() => {
    // Fetch events from backend whenever the month changes
    fetchEvents();
  }, [currentMonth]);

  useEffect(() => {
    // Store events in localStorage whenever events state changes
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/event`,
        {
          params: {
            month: format(currentMonth, 'yyyy-MM')
          }
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
      console.error('Error fetching events:', error);
    }
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-lg font-bold">&lt;</button>
        <div className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</div>
        <button onClick={nextMonth} className="text-lg font-bold">&gt;</button>
      </div>
    );
  };

  const renderDays = () => {
    return (
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-bold text-gray-600">
            {day}
          </div>
        ))}
      </div>
    );
  };

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
        const formattedDate = format(day, 'd');
        const isoDate = format(day, 'yyyy-MM-dd');
        const dayEvents = events[isoDate] || [];

        days.push(
          <div
            key={isoDate}
            className={`relative h-24 flex flex-col p-1 border ${isSameMonth(day, monthStart) ? 'border-gray-300' : 'border-gray-100'} ${isSameDay(day, new Date()) ? 'bg-blue-300' : ''}`}
            onClick={() => openModal(isoDate)}
          >
            <div className='flex justify-between'>
              <span className={`text-gray-900 ${!isSameMonth(day, monthStart) ? 'text-gray-400' : ''}`}>{formattedDate}</span>
            </div>
            <div className="text-xs">
              {dayEvents
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, MAX_EVENTS_DISPLAY - 1)
                .map((event, index) => (
                  <div key={index}>
                    <div className="font-semibold text-xs">{event.timeFrom} - {event.timeTo}</div>
                    <div className='text-xs'>{event.instructor}</div>
                  </div>
                ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const openModal = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setFormValues({
      timeFrom: '',
      timeTo: '',
      title: '',
      instructor: ''
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      date: selectedDate,
      timeFrom: formValues.timeFrom,
      timeTo: formValues.timeTo,
      title: formValues.title,
      instructor: formValues.instructor
    };

    try {
      // Save the event to the backend
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/event`,
        newEvent
      );

      // Update the events state with the new event
      setEvents(prevEvents => {
        const updatedEvents = { ...prevEvents };
        if (!updatedEvents[selectedDate]) {
          updatedEvents[selectedDate] = [];
        }
        updatedEvents[selectedDate].push(response.data);
        return updatedEvents;
      });

      closeModal();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <div className="p-4">
      {renderHeader()}
      {renderDays()}
      {renderCells()}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Add Event</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="timeFrom" className="block text-sm font-medium text-gray-700">
                  Time From
                </label>
                <input
                  type="text"
                  id="timeFrom"
                  name="timeFrom"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formValues.timeFrom}
                  onChange={handleFormChange}
                  placeholder="HH:MM AM/PM"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="timeTo" className="block text-sm font-medium text-gray-700">
                  Time To
                </label>
                <input
                  type="text"
                  id="timeTo"
                  name="timeTo"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formValues.timeTo}
                  onChange={handleFormChange}
                  placeholder="HH:MM AM/PM"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formValues.title}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">
                  Instructor
                </label>
                <input
                  type="text"
                  id="instructor"
                  name="instructor"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formValues.instructor}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCalendar;
