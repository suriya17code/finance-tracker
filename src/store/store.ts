import { configureStore, UnknownAction } from "@reduxjs/toolkit";

// export const store =()=>configureStore({
//     reducer: function (state: any, action: UnknownAction) {
//         throw new Error("Function not implemented.");
//     }
// })
export const mokestore=()=>{
    return configureStore({
        reducer:{

        }
    })
} 

 export type Appstore = ReturnType<typeof mokestore>
 export type RootStatus = ReturnType<Appstore["getState"]>
 export type AppDispatch = Appstore['dispatch']