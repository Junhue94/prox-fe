import React from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { has } from 'lodash';
import * as yup from 'yup';

import { setFormHelperText } from '../../utils/validation';
import { updateFormStateAction } from "../../store/actions/formActions";

import './styles.css';

export default function Main() {
    const routeHistory = useHistory();
    const dispatch = useDispatch();
    const validationSchema = yup.object({
        name: yup.string().required('Name is required.'),
        phone: yup.number().required('Phone is required.'),
        email: yup.string().email('Email must be a valid email.').required('Email is required.'),
    })
    .defined();
    const { control, errors, register, triggerValidation, getValues } = useForm({
        validationSchema,
    });

    const handleValidate = async () => {
        return triggerValidation();
    };

    const handleSubmitForm = async () => {
        const isValidForm = await handleValidate();
        if (isValidForm) {
            const data = getValues();
            dispatch(updateFormStateAction(data));
            routeHistory.push('/location')
        }
    };

    const renderTextField = (label, name) => (
        <Controller
            as={TextField}
            control={control}
            inputRef={register}
            defaultValue=""
            variant="outlined"
            margin="normal"
            fullWidth
            label={label}
            id={name}
            name={name}
            error={has(errors, name)}
            helperText={setFormHelperText(
                errors,
                name
            )}
        />
    );

    return (
        <div className="container">
            <Typography variant="h3">User Information</Typography>
            <form>
                {renderTextField("Name", "name")}
                {renderTextField("Phone", "phone")}
                {renderTextField("Email", "email")}
            </form>
            <br />
            <Button variant="contained" onClick={handleSubmitForm}>Submit</Button>
        </div>
    );
}
