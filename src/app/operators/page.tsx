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
      },
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
        minWidth: 150,
      },
      {
        field: "lastName",
        flex: 1,
        headerName: "Last Name",
        minWidth: 150,
      },
      {
        field: "status",
        flex: 1,
        headerName: "Status",
        minWidth: 100,
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
              <ShowButton hideText recordItemId={row.id} />
              <EditButton hideText recordItemId={row.id} />
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
        pageSizeOptions={[2, 4, 8, 16, 25]}
      />
    </List>
  );
}
