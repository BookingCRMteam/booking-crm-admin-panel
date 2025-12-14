import { ITour } from "@interfaces/tours";

export const getTourDetails = (tour: ITour) => [
  { label: "ID", value: tour.id ?? "-" },
  { label: "Назва Туру", value: tour.title ?? "-" },
  { label: "Країна", value: tour.country?.translations[0].name ?? "-" },
  { label: "Місто", value: tour.city?.translations[0].name ?? "-" },
  { label: "Тип", value: tour.type ?? "-" },
  { label: "Ціна", value: `${tour.price} ${tour.currency}` },
  {
    label: "Дата початку",
    value: new Date(tour.startDate).toLocaleDateString(),
  },
  {
    label: "Дата закінчення",
    value: new Date(tour.endDate).toLocaleDateString(),
  },
  { label: "Доступні місця", value: tour.availableSpots ?? "-" },
  { label: "Активний", value: tour.isActive ? "Так" : "Ні" },
];
