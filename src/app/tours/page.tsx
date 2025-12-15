"use client";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { List, useDataGrid, ShowButton, EditButton } from "@refinedev/mui";
import { useMemo } from "react";
import { Checkbox } from "@mui/material";
import { ToursListFilters } from "@components/tours/ToursListFilters";

export default function ToursList() {
  const { dataGridProps, setFilters } = useDataGrid({
    pagination: { mode: "server", pageSize: 8 },
    sorters: { mode: "server" },
  });
  const columns = useMemo<GridColDef[]>(
    () => [
      { field: "id", flex: 1, headerName: "ID", minWidth: 50 },
      {
        field: "title",
        flex: 1,
        headerName: "Назва",
        sortable: false,
        minWidth: 200,
      },
      {
        field: "location",
        headerName: "Локація",
        minWidth: 150,
        flex: 1,
        sortable: false,
        valueGetter: (_, row) => {
          const countryName =
            row.country?.translations?.[0]?.name ||
            row.country?.iso2 ||
            "Невідома країна";

          const cityName =
            row.city?.translations?.[0]?.name || "Невідоме місто";

          return `${cityName}, ${countryName}`;
        },
      },
      {
        field: "operator",
        headerName: "Туроператор",
        minWidth: 150,
        flex: 1,
        sortable: false,
        valueGetter: (_, row) => {
          return `${row.operator.firstName} ${row.operator.lastName}`;
        },
      },

      { field: "price", flex: 1, headerName: "Ціна", minWidth: 100 },
      {
        field: "availableSpots",
        flex: 1,
        headerName: "Вільних місць",
        minWidth: 100,
        sortable: false,
      },
      {
        field: "startDate",
        flex: 1,
        headerName: "Початкова дата",
        minWidth: 100,
        valueFormatter: (value) =>
          value ? new Date(value).toLocaleDateString() : "-",
      },
      {
        field: "endDate",
        flex: 1,
        headerName: "Кінцева дата",
        minWidth: 100,
        sortable: false,
        valueFormatter: (value) =>
          value ? new Date(value).toLocaleDateString() : "-",
      },
      {
        field: "isFeatured",
        flex: 1,
        headerName: "Featured",
        minWidth: 80,
        sortable: false,
        renderCell: function render({ row }) {
          return <Checkbox checked={row.isFeatured} disabled />;
        },
      },
      {
        field: "actions",
        headerName: "Дії",
        align: "right",
        headerAlign: "right",
        minWidth: 100,
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <ShowButton hideText recordItemId={row.id} title="Show" />
              <EditButton hideText recordItemId={row.id} title="Edit" />
            </>
          );
        },
      },
    ],
    [],
  );

  return (
    <List>
      <ToursListFilters setFilters={setFilters} />
      <DataGrid
        {...dataGridProps}
        columns={columns}
        pageSizeOptions={[8, 16, 24]}
      />
    </List>
  );
}
