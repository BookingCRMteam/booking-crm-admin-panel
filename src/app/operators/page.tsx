"use client";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

export default function OperatorsList() {
  const { dataGridProps } = useDataGrid({ resource: "operator/all", pagination: { mode: "off" } });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
        display: "flex",
        align: "left",
        headerAlign: "left",
      },
      {
        field: "firstName",
        flex: 1,
        headerName: "First Name",
        minWidth: 200,
        display: "flex",
      },
      {
        field: "lastName",
        flex: 1,
        headerName: "Last Name",
        minWidth: 200,
        display: "flex",
      },
      {
        field: "status",
        flex: 1,
        headerName: "Status",
        minWidth: 200,
        display: "flex",
      },

      {
        field: "actions",
        headerName: "Actions",
        align: "right",
        headerAlign: "right",
        minWidth: 120,
        sortable: false,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText resource="operator" recordItemId={row.id} />
              <ShowButton hideText resource="operator" recordItemId={row.id} />
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
}
