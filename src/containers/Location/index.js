import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { useHistory } from "react-router-dom";
import { Button, Typography } from '@material-ui/core';

import {createFormAction, resetFormApiStateAction} from "../../store/actions/formActions";

import './styles.css';

export default function Location() {
    const routeHistory = useHistory();
    const [address, setAddress] = useState();
    const [addressObj, setAddressObj] = useState();
    const dispatch = useDispatch();
    const formReducer = useSelector(
        (state) => state.formReducer,
    );

    const getLocation = (locationData) => {
        const schema = {
            addressLine1: ['street_number'],
            addressLine2: ['street_address', 'route'],
            state: [
                'administrative_area_level_1',
                'administrative_area_level_2',
                'administrative_area_level_3',
                'administrative_area_level_4',
                'administrative_area_level_5'
            ],
            country: ['country'],
            postal_code: ['postal_code'],
        };

        const address = {
            addressLine1: '',
            addressLine2: '',
            state: '',
            country: '',
            postal_code: '',
        };

        locationData.forEach((location) => {
            for (const field in schema) {
                if (schema[field].indexOf(location.types[0]) !== -1) {
                    address[field] = location.long_name;
                }
            }
        });
        return address;
    };

    const handleSubmitForm = async () => {
        const { name, phone, email } = formReducer;
        dispatch(createFormAction({
            name,
            phone,
            email,
            ...addressObj,
        }));
    };

    useEffect(() => {
        const mapAddress = async () => {
            const geocodeObj = address && address.value && (await geocodeByPlaceId(address.value.place_id));
            const addressObject = geocodeObj && getLocation(geocodeObj[0].address_components);
            setAddressObj(addressObject);
        };
        mapAddress().catch(console.log);
    }, [address]);

    useEffect(() => {
        if (formReducer.create.apiSuccess) {
            dispatch(resetFormApiStateAction())
            routeHistory.push('/')
        }
    }, [formReducer.create.apiSuccess, routeHistory, dispatch]);

    return (
        <div className="container">
            <Typography variant="h3">Location</Typography>
            <br/>
            <GooglePlacesAutocomplete
                selectProps={{
                    isClearable: true,
                    value: address,
                    onChange: (val) => {
                        setAddress(val);
                    }
                }}
            />
            <br/>
            <Button variant="contained" onClick={handleSubmitForm}>Submit</Button>
        </div>
    );
}
