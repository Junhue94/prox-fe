import { createForm } from '../../services/formService';
import { FormActionTypeEnum } from '../../enums/actions';

export const updateFormStateAction = (payload) => ({
    type: FormActionTypeEnum.UPDATE_STATE,
    payload,
});

export const createFormRequestAction = () => ({
    type: FormActionTypeEnum.CREATE_REQUEST,
});

export const createFormSuccessAction = (payload) => ({
    type: FormActionTypeEnum.CREATE_SUCCESS,
    payload,
});

export const createFormFailAction = (payload) => ({
    type: FormActionTypeEnum.CREATE_FAIL,
    payload,
});

export const resetFormApiStateAction = () => ({
    type: FormActionTypeEnum.RESET_API_STATE,
});

export function createFormAction(data) {
    return async (dispatch) => {
        try {
            dispatch(createFormRequestAction());
            const payload = await createForm(data);
            dispatch(createFormSuccessAction(payload));
        } catch (error) {
            dispatch(createFormFailAction(error));
        }
    };
}
