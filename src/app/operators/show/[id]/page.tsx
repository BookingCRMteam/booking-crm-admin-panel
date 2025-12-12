"use client";

import { OperatorInfo } from "@components/operators";
import { IOperator } from "@interfaces/operators";
import { Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";

export default function OperatorShow() {
  return (
    <Show>
      <OperatorDetails />
    </Show>
  );
}

function OperatorDetails() {
  const {
    result: operator,
    query: { isLoading },
  } = useShow<IOperator>({ resource: "operators" });
  if (isLoading) {
    return <Typography>Завантаження...</Typography>;
  }

  if (!operator) {
    return <Typography>Оператор не знайдено.</Typography>;
  }

  return <OperatorInfo operatorData={operator} />;
}
