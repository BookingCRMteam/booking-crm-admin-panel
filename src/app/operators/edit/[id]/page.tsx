"use client";

import { 
    Typography, 
    Card, 
    CardContent, 
    Table, 
    TableBody, 
    TableRow, 
    TableCell, 
    Box,
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel, 
    TextField, 
    Button,
    Alert, 
    Divider 
} from "@mui/material";
import { useShow, useUpdate, HttpError, RefineError } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import Image from "next/image";
import React, { useState, useEffect } from "react";

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
    status: 'approved' | 'rejected' | 'pending',
    philosophy: string,
    photo: string,
    rejectionReason: string
}

const getOperatorDetails = (operator: IOperator) => {
    const fullName = `${operator.firstName} ${operator.lastName}`;
    return [
        { label: "ID", value: operator.id ?? '-' },
        { label: "Повне ім'я", value: fullName },
        { label: "Компанія", value: operator.companyName ?? '-' },        
        { label: "Опис", value: operator.description ?? '-' },
        { label: "Філософія", value: operator.philosophy ?? '-' },
    ];
};

const getOperatorContacts = (operator: IOperator) => {
    return [
        { label: "Телефон", href: `tel:${operator.phone}`, value: operator.phone },
        { label: "Email", href: `mailto:${operator.email}`, value: operator.email },
        { label: "Вебсайт", href: operator.website, value: operator.website },
    ];
};


export default function OperatorEdit() {
    return (
        <Edit saveButtonProps={{ style: { display: "none" } }}>
            <OperatorEditDetails />
        </Edit>
    );
}

function OperatorEditDetails() {
    const { result: operatorData, query: { isLoading } } = useShow<IOperator>();
    const { mutate: changeOperatorStatus, mutation: { isPending } } = useUpdate<IOperator>();

    const initialStatus = operatorData?.status || 'pending';
    const id = operatorData?.id;

    const [currentStatus, setCurrentStatus] = useState<IOperator['status']>(initialStatus);
    const [rejectionReason, setRejectionReason] = useState<string>(operatorData?.rejectionReason || '');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (operatorData) {
            setCurrentStatus(operatorData.status);
            setRejectionReason(operatorData.rejectionReason || '');
        }
    }, [operatorData]);

    if (isLoading) {
        return <Typography>Завантаження...</Typography>;
    }

    if (!operatorData) {
        return <Typography>Оператор не знайдено.</Typography>;
    }

    const details = getOperatorDetails(operatorData);
    const contacts = getOperatorContacts(operatorData);

    const handleSubmit = () => {
        setError(null);
        
        if (currentStatus === 'rejected') {
            if (!rejectionReason || rejectionReason.length < 50) {
                setError("Причина відхилення обов'язкова і має містити мінімум 50 символів.");
                return;
            }
        }

        const dataToSend: Partial<IOperator> = {
            status: currentStatus,
        };
        if (currentStatus === 'rejected') {
            dataToSend.rejectionReason = rejectionReason;
        }

        if (id) {
            changeOperatorStatus({
                id: id,
                resource: "operators",
                values: dataToSend,
                successNotification: { message: "Статус оператора успішно оновлено", type: "success" },
                errorNotification: (err?: HttpError) => ({ 
                    message: `Помилка: ${err?.message}`, 
                    type: "error" 
                })
            });
        }
    };
        
    const isRejectionReasonRequired = currentStatus === 'rejected';

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
                                Фото
                            </TableCell>
                            <TableCell>
                                {operatorData.photo ? (
                                    <Image src={operatorData.photo} alt="Фото" width={100} height={100} />
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
                        {contacts.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', width: '30%' }}>
                                    {item.label}
                                </TableCell>
                                <TableCell>
                                    <a href={item.href} style={{ color: 'white', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">{item.value}</a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                    Оновлення Статусу
                </Typography>

                <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}>
                    
                    <FormControl fullWidth>
                        <InputLabel id="status-label">Статус</InputLabel>
                        <Select
                            labelId="status-label"
                            value={currentStatus}
                            label="Статус"
                            onChange={(e) => {
                                setCurrentStatus(e.target.value as IOperator['status']);
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
                        error={isRejectionReasonRequired && rejectionReason.length < 50}
                        helperText={isRejectionReasonRequired && rejectionReason.length < 50 ? `Залишилось: ${50 - rejectionReason.length} символів` : null}
                    />

                    {error && (
                        <Alert severity="error">
                            {error}
                        </Alert>
                    )}

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
            </CardContent>
        </Card>
    );
}