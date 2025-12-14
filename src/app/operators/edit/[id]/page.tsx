"use client";

import {
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useShow, useUpdate, HttpError } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { useState, useEffect } from "react";
import { IOperator } from "@interfaces/operators";
import { OperatorInfo } from "@components/operators";

export default function OperatorEdit() {
  return (
    <Edit saveButtonProps={{ style: { display: "none" } }}>
      <OperatorEditDetails />
    </Edit>
  );
}

function OperatorEditDetails() {
  const {
    result: operatorData,
    query: { isLoading },
  } = useShow<IOperator>();
  const {
    mutate: changeOperatorStatus,
    mutation: { isPending },
  } = useUpdate<IOperator>();

  const initialStatus = operatorData?.status || "pending";
  const id = operatorData?.id;

  const [currentStatus, setCurrentStatus] =
    useState<IOperator["status"]>(initialStatus);
  const [rejectionReason, setRejectionReason] = useState<string>(
    operatorData?.rejectionReason || "",
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (operatorData) {
      setCurrentStatus(operatorData.status);
      setRejectionReason(operatorData.rejectionReason || "");
    }
  }, [operatorData]);

  if (isLoading) {
    return <Typography>Завантаження...</Typography>;
  }

  if (!operatorData) {
    return <Typography>Оператор не знайдено.</Typography>;
  }
  const handleSubmit = () => {
    setError(null);

    if (currentStatus === "rejected") {
      if (!rejectionReason || rejectionReason.length < 50) {
        setError(
          "Причина відхилення обов'язкова і має містити мінімум 50 символів.",
        );
        return;
      }
    }

    const dataToSend: Partial<IOperator> = {
      status: currentStatus,
    };
    if (currentStatus === "rejected") {
      dataToSend.rejectionReason = rejectionReason.trim();
    }

    if (id) {
      changeOperatorStatus({
        id: id,
        resource: `admin/operators/${id}`,
        values: dataToSend,
        successNotification: {
          message: "Статус оператора успішно оновлено",
          type: "success",
        },
        errorNotification: (err?: HttpError) => ({
          message: `Помилка: ${err?.message}`,
          type: "error",
        }),
      });
    }
  };

  const isRejectionReasonRequired = currentStatus === "rejected";

  return (
    <OperatorInfo operatorData={operatorData}>
      <Typography variant="h6" gutterBottom>
        Оновлення Статусу
      </Typography>

      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 500,
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="status-label">Статус</InputLabel>
          <Select
            labelId="status-label"
            value={currentStatus}
            label="Статус"
            onChange={(e) => {
              setCurrentStatus(e.target.value as IOperator["status"]);
              setError(null);
            }}
          >
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Причина відхилення (мін. 50 символів)"
          multiline
          rows={4}
          fullWidth
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          disabled={!isRejectionReasonRequired}
          required={isRejectionReasonRequired}
          error={
            isRejectionReasonRequired && rejectionReason.trim().length < 50
          }
          helperText={
            isRejectionReasonRequired && rejectionReason.trim().length < 50
              ? `Залишилось: ${50 - rejectionReason.trim().length} символів`
              : null
          }
        />

        {error && <Alert severity="error">{error}</Alert>}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isPending}
          sx={{ mt: 1 }}
        >
          {isPending ? "Оновлення..." : "Зберегти зміни"}
        </Button>
      </Box>
    </OperatorInfo>
  );
}
