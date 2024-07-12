import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import axios from 'axios';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MAX_EVENTS_DISPLAY = 2;

const AdminCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [dropdown, setDropDown]  = useState(false)
  const [formValues, setFormValues] = useState({
    timeFrom: '',
    timeTo: '',
    title: '',
    instructor: ''
  });

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events'));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [currentMonth]);

  useEffect(() => {
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

  const toggleDropdown = ()=>{
    setDropDown(!dropdown);
  }

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button onClick={prevMonth} className="text-lg font-bold">&lt;</button>
      <div className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</div>
      <button onClick={nextMonth} className="text-lg font-bold">&gt;</button>
    </div>
  );

  const renderDays = () => (
    <div className="grid grid-cols-7 gap-2">
      {daysOfWeek.map((day) => (
        <div key={day} className="text-center font-bold text-gray-600">{day}</div>
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
                    <div className='flex justify-between mt-3'>
                      <button onClick={(e) => handleDeleteEvent(e, event._id)} className='text-red-600'>Delete</button>
                      <button onClick={() => openEditModal(isoDate, event)} className='text-blue-600'>Edit</button>
                    </div>
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
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/event`,
        newEvent
      );

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

  const handleDeleteEvent = async (e, id) => {
    e.stopPropagation(); // Prevent triggering parent div's click event
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_BASEURL}/api/event/${id}`);
      setEvents(prevEvents => {
        const updatedEvents = { ...prevEvents };
        for (let date in updatedEvents) {
          updatedEvents[date] = updatedEvents[date].filter(event => event._id !== id);
        }
        return updatedEvents;
      });
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const openEditModal = (date, event) => {
    setSelectedDate(date);
    setFormValues({
      timeFrom: event.timeFrom,
      timeTo: event.timeTo,
      title: event.title,
      instructor: event.instructor
    });
    setIsModalOpen(true);
  };

  return (
    <div>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {isModalOpen && (
        <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Add Event</p>
                <div className="modal-close cursor-pointer z-50" onClick={closeModal}>
                  <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path d="M14.53 3.53L12.47 1.47 9 4.94 5.53 1.47 3.47 3.53 7 7l-3.53 3.53 2.06 2.06L9 9.06l3.47 3.47 2.06-2.06L11 7z" />
                  </svg>
                </div>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Time From</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="timeFrom"
                    value={formValues.timeFrom}
                    onChange={handleFormChange}
                    placeholder="HH:MM AM/PM"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Time To</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="timeTo"
                    value={formValues.timeTo}
                    onChange={handleFormChange}
                    placeholder="HH:MM AM/PM"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="title"
                    value={formValues.title}
                    onChange={handleFormChange}
                    placeholder="Event Title"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Instructor</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="instructor"
                    value={formValues.instructor}
                    onChange={handleFormChange}
                    placeholder="Instructor Name"
                    required
                  />
                </div>
                <div className="flex items-center justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCalendar;
