"use client";
import React, {useEffect, useState} from "react";
import {EventListCard, EventCardProps} from "../components/Events";
import {ScrollToTopButton, FilterButton} from "../components/Buttons";
import {NavBar} from "../components/NavBar";
import "../styles/schedule.scss";

type EventsByDay = {
  [day: string]: EventCardProps[];
};

function formatDay(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

function Schedule() {
  const [eventsByDay, setEventsByDay] = useState<EventsByDay>({}); // store events grouped by day
  const [selectedDays, setSelectedDays] = useState<Set<string>>(new Set()); // filter by event day
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set()); // filter by event type

  // get and group events by day
  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch("https://adonix.hackillinois.org/event");
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      const events: EventCardProps[] = data.events;
    
      // group events by day
      const eventsGrouped: EventsByDay = {};
      for (const event of events) {
      const day = formatDay(event.startTime);
      if (!eventsGrouped[day]) { // if day is not a key in eventsGrouped, start new list
        eventsGrouped[day] = [];
      }
      eventsGrouped[day].push(event);
      }
    
      // sort each day's events by time
      for (const day in eventsGrouped) {
        eventsGrouped[day].sort((a, b) => a.startTime - b.startTime);
      }
    
      setEventsByDay(eventsGrouped);
    }

    fetchEvents();
  }, []);

  const days = Object.keys(eventsByDay);
  const allEvents = Object.values(eventsByDay).flat();
  const eventTypes = Array.from(new Set(allEvents.map((e) => e.eventType)));

  // filter events
  const filteredEvents = Object.entries(eventsByDay)
    .filter(([day, _]) => selectedDays.size === 0 || selectedDays.has(day))
    .flatMap(([_, events]) =>
      events.filter(
        (event) => selectedTypes.size === 0 || selectedTypes.has(event.eventType)
      )
    );

  return (
    <div>
      <NavBar />
      
      <div className="schedule-container">
        <div className="filters-container">
          {/* days filter */}
          <div className="filter-container">
            <h3>DAY</h3>
            <div className="filter-options">
              {days.map((day) => (
                <FilterButton
                  key={day}
                  label={day}
                  isSelected={selectedDays.has(day)}
                  onClick={() => {
                    const newSelection = new Set(selectedDays);
                    if (newSelection.has(day)) newSelection.delete(day);
                    else newSelection.add(day);
                    setSelectedDays(newSelection);
                  }}
                />
              ))}
            </div>
          </div>

          {/* event type filter */}
          <div className="filter-container">
            <h3>EVENT TYPE</h3>
            <div className="filter-options">
              {eventTypes.map((type) => (
                <FilterButton
                  key={type}
                  label={type}
                  isSelected={selectedTypes.has(type)}
                  onClick={() => {
                    const newSelection = new Set(selectedTypes);
                    if (newSelection.has(type)) newSelection.delete(type);
                    else newSelection.add(type);
                    setSelectedTypes(newSelection);
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="events-container">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventListCard
                key={event.eventId}
                eventId={event.eventId}
                name={event.name}
                description={event.description}
                startTime={event.startTime}
                endTime={event.endTime}
                eventType={event.eventType}
                points={event.points}
                locations={event.locations}
                isPro={event.isPro}
              />
            ))
          ) : (
            <p>No events match your filters.</p>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Schedule;