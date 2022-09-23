import {
    API_FAIL_STATE,
    API_INITIAL_STATE,
    API_REQUEST_STATE,
    API_SUCCESS_STATE,
} from '../../utils/defaultValues/apiRequestState';
import { FormActionTypeEnum } from '../../enums/actions';

export const initialState = {
    create: API_INITIAL_STATE,
    error: null,
    name: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    state: '',
    country: '',
    postal_code: '',
};

export const formReducer = (
    state = initialState,
    action,
) => {
    const { type, payload } = action;
    switch (type) {
        case FormActionTypeEnum.UPDATE_STATE:
            return {
                ...state,
                ...payload,
            };
        case FormActionTypeEnum.CREATE_REQUEST:
            return {
                ...state,
                create: {
                    ...API_REQUEST_STATE,
                },
            };
        case FormActionTypeEnum.CREATE_SUCCESS:
            return {
                ...state,
                ...payload,
                create: {
                    ...API_SUCCESS_STATE,
                },
            };
        case FormActionTypeEnum.CREATE_FAIL:
            return {
                ...state,
                create: {
                    ...API_FAIL_STATE,
                },
                error: payload,
            };
        case FormActionTypeEnum.RESET_API_STATE:
            return {
                ...state,
                create: { ...API_INITIAL_STATE },
            };
        default:
            return state;
    }
};