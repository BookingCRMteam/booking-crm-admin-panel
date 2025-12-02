"use client";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { List, useDataGrid } from "@refinedev/mui";
import React from "react";

export default function OperatorsList() {
  const { dataGridProps } = useDataGrid({
    resource: "admin/operators",
    pagination: { mode: "off" },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "email",
        flex: 1,
        headerName: "Email",
        minWidth: 200,
      },
      {
        field: "firstName",
        flex: 1,
        headerName: "First Name",
        minWidth: 200,
      },
      {
        field: "lastName",
        flex: 1,
        headerName: "Last Name",
        minWidth: 200,
      },
      {
        field: "status",
        flex: 1,
        headerName: "Status",
        minWidth: 200,
      },
    ],
    [],
  );

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        getRowId={(row) => row.email}
      />
    </List>
  );
}
