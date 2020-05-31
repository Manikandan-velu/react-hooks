export interface IInput {
    elementType: string;
    id: string;
    value: string;
    title: string;
    elementConfig: {
        type: string,
        name: string,
        options?: any,
        maxLength?:number,
        minLength?:number
    },
    validations?: {
        required: {
           value: boolean,
           message: any,
  
        },
        pattern?: {
           value: RegExp,
           message: any
         },
        minLength?: {
           value: number,
           message: any,
  
        },
        maxLength?: {
           value: number,
           message: any,  
        }
  
    }
}

export interface ILogin {
   email?: string;
   password?: any;
}

export interface IHorse {
   id: number;
   horse_name: string;
   horseNumber?: string;
   userId?: number;
   color?:string;
   sex?: number;
}

export interface IHorse_Response {
   data: IHorse[]
}

export interface ISignup {
   first_name?: string;
   last_name?: string;
   email?: string;
   ph_country_code?: number;
   phone_number?: number;
   role?: number
}

export interface IToaster {
   type: string;
   message?: string;
}