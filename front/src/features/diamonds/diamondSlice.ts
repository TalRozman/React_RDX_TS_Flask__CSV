import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {DiamondClass } from '../../env';
import {addDiamond, delDiamond, getavgCaratPerCut, getavgPricePerColor, getcolorAmounts, getCutAmounts, getDiamonds, getMaxDiamonds, getPremiumMedianCarat, getSumDiamonds, updDiamond } from './diamondAPI';

export interface diamondState {
  diamonds: any;
  sum:string;
  max:string;
  cuts:any;
  colors:string[];
  medianCaratPremium:number;
  avgCaratPerCut:any;
  avgCPricePerColor:any;
  refresh:boolean;
}

const initialState: diamondState = {
  diamonds:0,
  sum:"",
  max:"",
  cuts:"",
  colors:[],
  medianCaratPremium:0,
  avgCaratPerCut:[],
  avgCPricePerColor:[],
  refresh:false,
};

export const getDiamondsAsync = createAsyncThunk(
  'diamond/getDiamonds',
  async () => {
    const response = await getDiamonds();
    return response;
  }
);
export const getDimondsSumAsync = createAsyncThunk(
  'diamond/getDimondsSum',
  async () => {
    const response = await getSumDiamonds();
    return response;
  }
);
export const getDimondsMaxPriceAsync = createAsyncThunk(
  'diamond/getMaxDiamonds',
  async () => {
    const response = await getMaxDiamonds();
    return response;
  }
);
export const getCutAmountsAsync = createAsyncThunk(
  'diamond/getCutAmounts',
  async () => {
    const response = await getCutAmounts();
    return response;
  }
);
export const getcolorAmountsAsync = createAsyncThunk(
  'diamond/getcolorAmounts',
  async () => {
    const response = await getcolorAmounts();
    return response;
  }
);
export const getPremiumMedianCaratAsync = createAsyncThunk(
  'diamond/getPremiumMedianCarat',
  async () => {
    const response = await getPremiumMedianCarat();
    return response[0];
  }
);
export const getavgCaratPerCutAsync = createAsyncThunk(
  'diamond/getavgCaratPerCut',
  async () => {
    const response = await getavgCaratPerCut();
    return response;
  }
);
export const getavgPricePerColorAsync = createAsyncThunk(
  'diamond/getavgPricePerColor',
  async () => {
    const response = await getavgPricePerColor();
    return response;
  }
);
export const addDiamondAsync= createAsyncThunk(
  'diamond/addDiamond',
  async (diamond:DiamondClass) => {
    const response = await addDiamond(diamond);
    return response;
  }
);
export const delDiamondAsync= createAsyncThunk(
  'diamond/delDiamond',
  async (id:number) => {
    const response = await delDiamond(id);
    return response;
  }
);
export const updDiamondAsync= createAsyncThunk(
  'diamond/updDiamond',
  async (actions:[number,DiamondClass]) => {
    const response = await updDiamond(actions[0],actions[1]);
    return response;
  }
);

export const diamondSlice = createSlice({
  name: 'diamond',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDiamondsAsync.fulfilled, (state,actions) => {
        state.diamonds = actions.payload;
      }).addCase(getDimondsSumAsync.fulfilled, (state,actions) => {
        state.sum = actions.payload;
      }).addCase(getDimondsMaxPriceAsync.fulfilled, (state,actions) => {
        state.max = actions.payload;
      }).addCase(getCutAmountsAsync.fulfilled, (state,actions) => {
        state.cuts = actions.payload;
      }).addCase(getcolorAmountsAsync.fulfilled, (state,actions) => {
        state.colors = actions.payload;
      }).addCase(getPremiumMedianCaratAsync.fulfilled, (state,actions) => {
        state.medianCaratPremium = actions.payload;
      }).addCase(getavgCaratPerCutAsync.fulfilled, (state,actions) => {
        state.avgCaratPerCut = actions.payload;
      }).addCase(getavgPricePerColorAsync.fulfilled, (state,actions) => {
        state.avgCPricePerColor = actions.payload;
      }).addCase(addDiamondAsync.fulfilled, (state) => {
        state.refresh = !state.refresh
      }).addCase(delDiamondAsync.fulfilled, (state) => {
        state.refresh = !state.refresh
      }).addCase(updDiamondAsync.fulfilled, (state) => {
        state.refresh = !state.refresh
      })
  },
});

export const selectDiamonds = (state: RootState) => state.diamond.diamonds;
export const selectSumDiamonds = (state: RootState) => state.diamond.sum;
export const selectMaxDiamonds = (state: RootState) => state.diamond.max;
export const selectCutsDiamonds = (state: RootState) => state.diamond.cuts;
export const selectColorsDiamonds = (state: RootState) => state.diamond.colors;
export const selectMedianCaratPremium = (state: RootState) => state.diamond.medianCaratPremium;
export const selectavgCaratPerCut = (state: RootState) => state.diamond.avgCaratPerCut;
export const selectavgCPricePerColor = (state: RootState) => state.diamond.avgCPricePerColor;
export const selectRefresh = (state: RootState) => state.diamond.refresh;


export default diamondSlice.reducer;