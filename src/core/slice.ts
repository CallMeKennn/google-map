import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface MapState {
  provinces: any;
}

const initialState: MapState = {
  provinces: {},
};

export const MapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setProvince: (state, { payload }: PayloadAction<any>) => {
      state.provinces = payload;
    },
  },
});

export const MapActions = MapSlice.actions;

export default MapSlice.reducer;

export const MapSelectors = {
    provinces: (state: RootState) => state.map.provinces,
};
