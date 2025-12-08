"use client";

import { Typography, Card, CardContent, Table, TableBody, TableRow, TableCell, Box } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";

type IOperator = {
    id: number,
    email: string,
    createdAt: string,
    updatedAt: string,
    userId: number,
    companyName: string,
    description: string,
    firstName: string,
    lastName: string,
    website: string,
    phone: string,
    status: string,
    philosophy: string,
    photo: string,
    rejectionReason: string
}

const getOperatorDetails = (operator: IOperator) => [
    { label: "ID", value: operator.id ?? '-' },
    { label: "Email", value: operator.email ?? '-' },
    { label: "Створено", value: operator.createdAt ?? '-' },
    { label: "Оновлено", value: operator.updatedAt ?? '-' },
    { label: "ID користувача", value: operator.userId ?? '-' },
    { label: "Назва компанії", value: operator.companyName ?? '-' },
    { label: "Опис", value: operator.description ?? '-' },
    { label: "Ім'я", value: operator.firstName ?? '-' },
    { label: "Прізвище", value: operator.lastName ?? '-' },
    { label: "Веб-сайт", value: operator.website ?? '-' },
    { label: "Телефон", value: operator.phone ?? '-' },
    { label: "Статус", value: operator.status ?? '-' },
    { label: "Філософія", value: operator.philosophy ?? '-' },
    { label: "Фото", value: operator.photo ?? '-' },
    { label: "Причина відхилення", value: operator.rejectionReason ?? '-' },
];


export default function OperatorShow() {
    return (
        <Show>
            <OperatorDetails />
        </Show>
    );
}

function OperatorDetails() {
    const { result: operator, query: { isLoading } } = useShow<IOperator>({ resource: "operators", });
    if (isLoading) {
        return <Typography>Завантаження...</Typography>;
    }

    if (!operator) {
        return <Typography>Оператор не знайдено.</Typography>;
    }

    const details = getOperatorDetails(operator);
    const linkStyle = { textDecoration: 'underline', color: 'white' };
    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Деталі Оператора
                </Typography>
                
                <Table size="small">
                    <TableBody>
                        {details.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', width: '30%' }}>
                                    {item.label}
                                </TableCell>
                                <TableCell>
                                    {item.value}
                                </TableCell>
                            </TableRow>
                        ))}
                        
                        <TableRow>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', width: '30%' }}>
                                Email оператора
                            </TableCell>
                            <TableCell>
                                {operator.email ? (
                                    <a href={`mailto:${operator.email}`} style={linkStyle}>
                                        {operator.email}
                                    </a>
                                ) : '-'}
                            </TableCell>
                        </TableRow>
                        
                        <TableRow>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', width: '30%' }}>
                                Номер телефону
                            </TableCell>
                            <TableCell>
                                {operator.phone ? (
                                    <a href={`tel:${operator.phone}`} style={linkStyle}>
                                        {operator.phone}
                                    </a>
                                ) : '-'}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell colSpan={2}>
                                <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                                    Опис:
                                </Typography>
                                <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                    {operator.description ?? '-'}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </CardContent>
        </Card>
    );
}