import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";
import { Silo } from "../models/Silo";
import { getMessages } from "./messaging.store";
import { asyncFetchContractsData } from "./financial.store";
import { Contract } from "../models/Contract";
import { TransferWeighing } from "../models/TransferWeighing";
import { InputWeighingRow } from "../models/InputWeighingRow";
import { ManualOutputWeighing } from "../models/ManualOutputWeighing";
import { ManualSeparateWeighing } from "../models/ManualSepareteWeighing";
import { AutoInputWeighing } from "../models/AutoInputWeighing";
import { InputWeighing } from "../pages/Commerce/modals/components/InputWeighing";
import { WeighingRow } from "../models/WeighingRow";
import { WeighingRowType } from "../utils/WeighingRowType.enum";
import { OutputWeighingRow } from "../models/OutputWeighingRow";


const initialSilo: Silo[] = [];
const initialEditContracts: Contract = {}
const initialRowsInputW: WeighingRow[] = [{
    rowType: WeighingRowType.AUTOMATIC
}];
const initialRowsOutputW: WeighingRow[] = [{
    rowType: WeighingRowType.AUTOMATIC
}];
const initialTransferWeighing: TransferWeighing[] = []
const initialInputWeighing: InputWeighingRow[][] = [];
const initialAutoInputWeighing: AutoInputWeighing = {}
const initialOutputWeighing: OutputWeighingRow[][] = []
const initialSeparateWeighing: ManualSeparateWeighing[] = []
const initialInputWeighingData: InputWeighingRow = {}

const commerceStore = createSlice({
    name: "commerce",
    initialState: {
        plots: [],
        silo: initialSilo,
        editContracts: initialEditContracts,
        transferWeighing: initialTransferWeighing,
        inputWeighing: initialInputWeighing,
        inputWeighingRows: initialRowsInputW,
        autoInputWeighing: initialAutoInputWeighing,
        outputWeighing: initialOutputWeighing,
        outputWeighingRows: initialRowsOutputW,
        separateWeighing: initialSeparateWeighing,
        inputWeighingData: initialInputWeighingData
    },
    reducers: {
        setPlots(state, action) {
            state.plots = action.payload;
        },
        setSilo(state, action) {
            state.silo = action.payload
        },
        setEditContracts(state, action) {
            state.editContracts = action.payload
        },
        setTransferWeighing(state, action) {
            state.transferWeighing = action.payload
        },
        setInputWeighing(state, action) {
            state.inputWeighing = action.payload;
            // action.payload.map((arr: any) => {
            //     state.inputWeighing = state.inputWeighing.concat(arr);
            // });
            // state.inputWeighing = action.payload;
        },
        setAutoInputWeighing(state, action) {
            state.autoInputWeighing = action.payload
        },
        setOutputWeighing(state, action) {
            state.outputWeighing = action.payload
        },
        setSeparateWeighing(state, action) {
            state.separateWeighing = action.payload
        },
        addInputWeighRow(state, action) {
            const inputWeighingRows = [...state.inputWeighingRows].concat(action.payload);
            state.inputWeighingRows = inputWeighingRows;
        },
        removeInputWeighRow(state, action) {
            const inputWeighingRows = [...state.inputWeighingRows];
            inputWeighingRows.splice(action.payload.index, 1);
            state.inputWeighingRows = inputWeighingRows;
        },
        updateInputWeighRow(state, action) {
            const { index, inputWeighRow } = action.payload;
            const inputWeighingRows = [...state.inputWeighingRows];
            inputWeighingRows[index] = inputWeighRow;
            state.inputWeighingRows = inputWeighingRows;
        },
        setInputWeighingRows(state, action) {
            state.inputWeighingRows = action.payload.map((row: InputWeighingRow, index: number) => {
                const rowData: InputWeighingRow = { ...row };
                if (row.id && row.mode === 'Manual') {
                    rowData.rowType = WeighingRowType.MANUAL;
                } else if (!row.id) {
                    rowData.rowType = WeighingRowType.AUTOMATIC;
                }
                return rowData;
            });
        },
        resetInputWeighingRows(state, action) {
            state.inputWeighingRows = initialRowsInputW;
        },
        addOutputWeighRow(state, action) {
            const outputWeighingRows = [...state.outputWeighingRows].concat(action.payload);
            state.outputWeighingRows = outputWeighingRows;
        },
        removeOutputWeighRow(state, action) {
            const outputWeighingRows = [...state.outputWeighingRows];
            outputWeighingRows.splice(action.payload.index, 1);
            state.outputWeighingRows = outputWeighingRows;
        },
        updateOutputWeighRow(state, action) {
            const { index, outputWeighRow } = action.payload;
            const outputWeighingRows = [...state.outputWeighingRows];
            outputWeighingRows[index] = outputWeighRow;
            state.outputWeighingRows = outputWeighingRows;
        },
        setOutputWeighingRows(state, action) {
            state.outputWeighingRows = action.payload.map((row: OutputWeighingRow, index: number) => {
                const rowData: OutputWeighingRow = { ...row };
                if (row.id && row.mode === 'Manual') {
                    rowData.rowType = WeighingRowType.MANUAL;
                } else if (!row.id) {
                    rowData.rowType = WeighingRowType.AUTOMATIC;
                }
                return rowData;
            });
        },
        resetOutputWeighingRows(state, action) {
            state.inputWeighingRows = initialRowsInputW;
        }
    },
});

export const { setPlots, setSilo, setEditContracts, setTransferWeighing, setInputWeighing, setAutoInputWeighing, setOutputWeighing, setSeparateWeighing, addInputWeighRow, removeInputWeighRow, updateInputWeighRow, setInputWeighingRows, resetInputWeighingRows } =
    commerceStore.actions;
export default commerceStore.reducer;


export function asyncFetchPlots(farmId: number) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(
                `https://remoteapi.murilobotelho.com.br/fields?farm_id=${farmId}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(
                setPlots(result.data)
            );
        } catch (err: any) {
            dispatch(
                getMessages({
                    message: err.response.data.message,
                    type: "error",
                })
            );
        }
    };
}

export function asyncTransferWeighing(transfer: any) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.post(`https://remoteapi.murilobotelho.com.br/weighings`,
                transfer,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    }
                });
            dispatch(getMessages({
                message: "Transferência realizada com sucesso",
                type: "success",
            }));
        } catch (err: any) {
            dispatch(getMessages({
                message: err.response.data.message,
                type: "error",
            }));
        }
    }
}

export function asyncInputWeighing(input: any, index: number, rowType: WeighingRowType) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.post(`https://remoteapi.murilobotelho.com.br/weighings`,
                input,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    }
                });
            dispatch(setInputWeighing(result.data));
            dispatch(updateInputWeighRow({ index, inputWeighRow: { ...result.data[0], rowType } }));
            // dispatch(setInputWeighingData(result.data[0]))
            dispatch(getMessages({
                message: "Pesagem de entrada salva com sucesso",
                type: "success",
            }));
        } catch (err: any) {
            dispatch(getMessages({
                message: err.response.data.message,
                type: "error",
            }));
        }
    }
}

export function asyncUpdateInputWeighing(id: number, input: any, index: number, rowType: WeighingRowType) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.put(`https://remoteapi.murilobotelho.com.br/weighings/${id}`,
                input,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    }
                });
            dispatch(setInputWeighing(result.data));
            dispatch(updateInputWeighRow({ index, inputWeighRow: { ...result.data[0], rowType } }));
            // dispatch(setInputWeighingData(result.data[0]))
            dispatch(getMessages({
                message: "Pesagem de entrada salva com sucesso",
                type: "success",
            }));
        } catch (err: any) {
            dispatch(getMessages({
                message: err.response.data.message,
                type: "error",
            }));
        }
    }
}

export function asyncFetchInputWeighingData(seasonId: number) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(`https://remoteapi.murilobotelho.com.br/weighings`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                    params: {
                        type: 'Entrada',
                        season_id: seasonId
                    }
                });
            dispatch(setInputWeighing(result.data));
        } catch (err: any) {
            dispatch(getMessages({
                message: err.response.data.message,
                type: "error",
            }));
        }
    }
}

export function asyncFetchOutputWeighingData(seasonId: number) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(`https://remoteapi.murilobotelho.com.br/weighings`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                    params: {
                        type: 'Saída',
                        season_id: seasonId
                    }
                });
            dispatch(setOutputWeighing(result.data));
        } catch (err: any) {
            dispatch(getMessages({
                message: err.response.data.message,
                type: "error",
            }));
        }
    }
}

export function asyncFetchWeighingData() {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(`https://remoteweighingsapi.murilobotelho.com.br/weighings?user_id=1`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    }
                });
            dispatch(setAutoInputWeighing(result.data));
        } catch (err: any) {
            dispatch(getMessages({
                message: err.response.data.message,
                type: "error",
            }));
        }
    }
}

export function asyncOutputWeighing(output: any) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.post(`https://remoteapi.murilobotelho.com.br/weighings`,
                output,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    }
                });
            dispatch(getMessages({
                message: "Pesagem de saída salva com sucesso",
                type: "success",
            }));

        } catch (err: any) {
            dispatch(getMessages({
                message: err.response.data.message,
                type: "error",
            }));
        }
    }
}

export function asyncSeparateWeighing(separate: any) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.post(`https://remoteapi.murilobotelho.com.br/weighings`,
                separate,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    }
                });
            dispatch(getMessages({
                message: "Pesagem avulsa salva com sucesso",
                type: "success",
            }));

        } catch (err: any) {
            dispatch(getMessages({
                message: err.response.data.message,
                type: "error",
            }));
        }
    }
}

export function asyncCreateCommercePlot(silo: Silo) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.post(`https://remoteapi.murilobotelho.com.br/silos`,
                silo,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    }
                });
            dispatch(getMessages({
                message: "Silo cadastrado com sucesso",
                type: "success",
            }));

        } catch (err: any) {
            dispatch(getMessages({
                message: err.response.data.message,
                type: "error",
            }));
        }
    }
}

export function asyncFetchSiloData() {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(`https://remoteapi.murilobotelho.com.br/silos`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    }
                });
            dispatch(setSilo(result.data));
        } catch (err: any) {
            dispatch(getMessages({
                message: err.response.data.message,
                type: "error",
            }));
        }
    }
}

export function asyncFetchEditContracts(id: number) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(
                `https://remoteapi.murilobotelho.com.br/contracts/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(setEditContracts(result.data));
        } catch (err: any) {
            dispatch(
                getMessages({
                    message: err.result.data.error,
                    type: "error",
                })
            );
        }
    };
}

export function asyncEditContract(id: number, contract: Contract) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.put(
                `https://remoteapi.murilobotelho.com.br/contracts/${id}`,
                contract,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(
                getMessages({
                    message: "Contrato editado com sucesso",
                    type: "success",
                })
            );
        } catch (err: any) {
            console.log(err);
            dispatch(
                getMessages({
                    message: err.message,
                    type: "error",
                })
            );
        }
    };
}

export function asyncDeleteContract(id: number) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.delete(
                `https://remoteapi.murilobotelho.com.br/contracts/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(asyncFetchContractsData());
            dispatch(
                getMessages({
                    message: "Contrato excluído com sucesso",
                    type: "success",
                })
            );
        } catch (err: any) {
            console.log(err);
            dispatch(
                getMessages({
                    message: err.response.data.message,
                    type: "error",
                })
            );
        }
    };
}

export function asyncDeleteInputWeighing(id: number) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.delete(
                `https://remoteapi.murilobotelho.com.br/weighings/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(
                getMessages({
                    message: "Pesagem excluída com sucesso",
                    type: "success",
                })
            );
        } catch (err: any) {
            console.log(err);
            dispatch(
                getMessages({
                    message: err.response.data.message,
                    type: "error",
                })
            );
        }
    };
}

export function asyncDeleteSilo(id: number) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.delete(
                `https://remoteapi.murilobotelho.com.br/silos/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(asyncFetchSiloData());
            dispatch(
                getMessages({
                    message: "Contrato excluído com sucesso",
                    type: "success",
                })
            );
        } catch (err: any) {
            console.log(err);
            dispatch(
                getMessages({
                    message: err.response.data.message,
                    type: "error",
                })
            );
        }
    };
}

