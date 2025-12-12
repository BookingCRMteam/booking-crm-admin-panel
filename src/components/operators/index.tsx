import {
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  Link,
} from "@mui/material";
import Image from "next/image";
import type { IOperator } from "@interfaces/operators";
import {
  getOperatorDetails,
  getOperatorContacts,
} from "@shared/utils/operators";
import type { ReactNode, FC } from "react";

type OperatorInfoProps = {
  operatorData: IOperator;
  children?: ReactNode;
};

export const OperatorInfo: FC<OperatorInfoProps> = ({
  operatorData,
  children,
}) => {
  const details = getOperatorDetails(operatorData);
  const contacts = getOperatorContacts(operatorData);
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Деталі Оператора (ID: {operatorData.id})
        </Typography>

        <Table size="small" sx={{ mb: 3 }}>
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
                Фото
              </TableCell>
              <TableCell>
                {operatorData.photo ? (
                  <Image
                    src={operatorData.photo}
                    alt="Фото"
                    width={100}
                    height={100}
                  />
                ) : (
                  <Typography>Фото не надано</Typography>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          Контакти Оператора
        </Typography>

        <Table size="small" sx={{ mb: 3 }}>
          <TableBody>
            {contacts.map((item) => (
              <TableRow key={item.href}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold", width: "30%" }}
                >
                  {item.label}
                </TableCell>
                <TableCell>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.value}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Divider sx={{ my: 3 }} />
        {children}
      </CardContent>
    </Card>
  );
};
