"use client";

import {
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import Image from "next/image";
import Link from "next/link";

type ITour = {
  id: number;
  operatorId: number;
  title: string;
  description: string;
  countryISO2Code: string;
  cityId: number;
  type: string;
  price: string;
  currency: string;
  startDate: string;
  endDate: string;
  availableSpots: number;
  conditions: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  photos: {
    id: number;
    tourId: number;
    url: string;
    isMain: boolean;
    description: string;
  }[];
  operator: {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    companyName: string;
    description: string;
    firstName: string;
    lastName: string;
    website: string;
    phone: string;
    status: string;
    philosophy: string;
    photo: string;
    rejectionReason: string;
  };
  country: {
    id: number;
    iso2: string;
    iso3: string;
    translations: [
      { id: number; countryIso2: string; languageCode: string; name: string },
    ];
  };
  city: {
    id: number;
    countryIso2: string;
    translations: [
      { id: number; cityId: number; languageCode: string; name: string },
    ];
  };
};

const getTourDetails = (tour: ITour) => [
  { label: "ID", value: tour.id ?? "-" },
  { label: "Назва Туру", value: tour.title ?? "-" },
  { label: "Країна", value: tour.country.translations[0].name ?? "-" },
  { label: "Місто", value: tour.city.translations[0].name ?? "-" },
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

export default function TourShow() {
  return (
    <Show>
      <TourDetails />
    </Show>
  );
}

function TourDetails() {
  const {
    result: tour,
    query: { isLoading },
  } = useShow<ITour>();
  if (isLoading) {
    return <Typography>Завантаження...</Typography>;
  }

  if (!tour) {
    return <Typography>Тур не знайдено.</Typography>;
  }

  const details = getTourDetails(tour);
  const linkStyle = { textDecoration: "underline", color: "white" };
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Деталі Туру
        </Typography>

        <Table size="small">
          <TableBody>
            {details.map((item, index) => (
              <TableRow key={index}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold", width: "30%" }}
                >
                  {item.label}
                </TableCell>
                <TableCell>{item.value}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{ fontWeight: "bold", width: "30%" }}
              >
                Оператор
              </TableCell>
              <TableCell>
                <Link
                  href={`/operators/${tour.operator.id}`}
                  passHref
                  style={linkStyle}
                >
                  {tour.operator.firstName} {tour.operator.lastName}
                </Link>
              </TableCell>
            </TableRow>

            {/* 3. ЛІНК: Email оператора (mailto) */}
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{ fontWeight: "bold", width: "30%" }}
              >
                Email оператора
              </TableCell>
              <TableCell>
                {tour.operator.email ? (
                  <a href={`mailto:${tour.operator.email}`} style={linkStyle}>
                    {tour.operator.email}
                  </a>
                ) : (
                  "-"
                )}
              </TableCell>
            </TableRow>

            {/* 4. ЛІНК: Телефон оператора (tel) */}
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{ fontWeight: "bold", width: "30%" }}
              >
                Номер телефону
              </TableCell>
              <TableCell>
                {tour.operator.phone ? (
                  <a href={`tel:${tour.operator.phone}`} style={linkStyle}>
                    {tour.operator.phone}
                  </a>
                ) : (
                  "-"
                )}
              </TableCell>
            </TableRow>

            {/* 5. ПОЛЕ: Опис */}
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                  Опис:
                </Typography>
                <Typography sx={{ whiteSpace: "pre-wrap" }}>
                  {tour.description ?? "-"}
                </Typography>
              </TableCell>
            </TableRow>

            {/* 6. ПОЛЕ: Умови Туру */}
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                  Умови Туру:
                </Typography>
                <Typography sx={{ whiteSpace: "pre-wrap" }}>
                  {tour.conditions ?? "-"}
                </Typography>
              </TableCell>
            </TableRow>

            {/* 7. ФОТО: Фотографії */}
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{ fontWeight: "bold", width: "30%" }}
              >
                Фото
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {tour.photos &&
                    tour.photos.map((photo) => (
                      <Image
                        key={photo.id}
                        src={photo.url}
                        alt="Tour photo"
                        width={200}
                        height={200}
                        style={{ objectFit: "cover" }}
                      />
                    ))}
                  {(!tour.photos || tour.photos.length === 0) && "-"}
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
