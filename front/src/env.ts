export const MY_SERVER = "https://redux-ts-diamonds-csv.onrender.com"

export class DiamondClass{
    carat:number = 0;
    cut:string = "";
    color:string = "";
    clarity:string = "";
    depth:number = 0;
    table:number = 0;
    price:number = 0;
    x:number = 0;
    y:number = 0;
    z:number = 0;

    constructor(carat:number, cut:string, color:string, clarity:string,depth:number,table:number, price:number,x:number,y:number,z:number){
        this.carat = carat;
        this.cut = cut;
        this.color = color;
        this.clarity = clarity;
        this.depth = depth;
        this.table = table;
        this.price = price;
        this.x = x;
        this.y = y;
        this.z = z;
    }
}