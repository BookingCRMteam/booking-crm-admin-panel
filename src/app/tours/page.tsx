"use client";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { List, useDataGrid, ShowButton } from "@refinedev/mui";
import React from "react";

export default function ToursList() {
  const { dataGridProps } = useDataGrid({
    pagination: { mode: "server" },
    sorters: { mode: "server" },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        flex: 1,
        headerName: "ID",
        minWidth: 50,
      },
      {
        field: "title",
        flex: 1,
        headerName: "Назва",
        minWidth: 200,
      },
      {
        field: "price",
        flex: 1,
        headerName: "Ціна",
        minWidth: 100,
      },
      {
        field: "availableSpots",
        flex: 1,
        headerName: "Вільних місць",
        minWidth: 100,
      },
      {
        field: "startDate",
        flex: 1,
        headerName: "Початкова дата",
        minWidth: 100,
      },
      {
        field: "endDate",
        flex: 1,
        headerName: "Кінцева дата",
        minWidth: 100,
      },
      {
        field: "actions",
        headerName: "Дії",
        align: "right",
        headerAlign: "right",
        minWidth: 120,
        sortable: false,
        display: "flex",
        renderCell: function render({ row }) {
          return <ShowButton hideText recordItemId={row.id} />;
        },
      },
    ],
    [],
  );

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        pageSizeOptions={[2, 4, 8, 16, 25]}
      />
    </List>
  );
}
