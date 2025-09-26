import React, { useMemo } from "react";
import "../styles/Events.css";

export interface EventCardProps {
  eventId: string;
  name: string;
  description: string;
  startTime: number;
  endTime: number;
  locations: {
    description: string;
    latitude: number;
    longitude: number;
  }[];
  eventType: string;
  points: number;
  isPro: boolean;
  sponsor?: string;
}

interface Tag {
  name: string;
  color: string;
}

export const EventListCard: React.FC<EventCardProps> = ({
  name,
  description,
  startTime,
  endTime,
  locations,
  eventType,
  points,
  isPro,
  sponsor,
}) => {
  // create event tags
  const tags = useMemo(() => {
    const newTags: Tag[] = [];

    if (isPro) {
      newTags.push({ name: "PRO", color: "#DE8E45" });
    }

    if (eventType) {
      newTags.push({ name: eventType, color: "#C5673F" });
    }

    if (points) {
      newTags.push({ name: `${points} pts`, color: "#84BCB9" });
    }

    return newTags;
  }, [isPro, eventType, points]);

  const formattedStart = new Date(startTime * 1000).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const formattedEnd = new Date(endTime * 1000).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="event-card">
      <h2>{name}</h2>

      <div className="event-tags">
        {tags.map((tag) => (
          <span
            key={tag.name}
            className="tag"
            style={{ backgroundColor: tag.color }}
          >
            {tag.name}
          </span>
        ))}
      </div>

      <div className="time">⏱️ {formattedStart}
        {formattedStart !== formattedEnd && ` - ${formattedEnd}`}
      </div>
      <p className="location">📍 {locations?.[0]?.description || "TBD"}</p>
      <p>{description}</p>
    </div>
  );
};