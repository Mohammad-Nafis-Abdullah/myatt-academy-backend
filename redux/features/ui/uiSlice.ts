import { createSlice } from '@reduxjs/toolkit'

type InitialStateType = {
    modal: {
        show: boolean;
        type: string;
        props: any;
    }
}

const initialState: InitialStateType = {
    modal: {
        show: false,
        type: '',
        props: {}
    }
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        showModal(state, action) {
            state.modal = {
                show: true,
                type: action.payload.type,
                props: action.payload.props
            }
        },
        hideModal(state) {
            state.modal = {
                show: false,
                type: '',
                props: {}
            }
        }
    }
})

export const { showModal, hideModal } = uiSlice.actions
export default uiSlice.reducer