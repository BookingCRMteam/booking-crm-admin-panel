"use client";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { List, ShowButton, EditButton, useDataGrid } from "@refinedev/mui";
import { useState, useMemo } from "react";
import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";

export default function OperatorsList() {
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const { dataGridProps, setFilters } = useDataGrid({
    resource: "operators",
    pagination: { mode: "server", pageSize: 8 },
    filters: { mode: "server" },
    sorters: { mode: "off" },
  });

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        flex: 1,
        headerName: "ID",
        minWidth: 50,
        sortable: false,
      },
      {
        field: "email",
        flex: 1,
        headerName: "Email",
        minWidth: 200,
        sortable: false,
      },
      {
        field: "name",
        flex: 1,
        headerName: "Full name",
        minWidth: 150,
        sortable: false,
        valueGetter: (_, row) => {
          return `${row.firstName} ${row.lastName}`;
        },
      },
      {
        field: "status",
        flex: 1,
        headerName: "Status",
        minWidth: 100,
        sortable: false,
      },
      {
        field: "actions",
        headerName: "Дії",
        align: "right",
        headerAlign: "right",
        minWidth: 120,
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

  const handleSelectFilter = (event: { target: { value: string } }) => {
    const statusValue = event.target.value;
    setSelectedStatus(statusValue);

    if (statusValue) {
      setFilters(
        [
          {
            field: "status",
            value: statusValue,
            operator: "eq",
          },
        ],
        "replace",
      );
    } else {
      setFilters([], "replace");
    }
  };

  return (
    <List>
      <Box sx={{ width: 250, mb: 3 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="status-select-label">Фільтр по статусу</InputLabel>
          <Select
            labelId="status-select-label"
            value={selectedStatus}
            label="Фільтр по статусу"
            onChange={handleSelectFilter}
          >
            <MenuItem value="">Всі (All)</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <DataGrid
        {...dataGridProps}
        columns={columns}
        pageSizeOptions={[8, 16, 24]}
      />
    </List>
  );
}
