import { CoefBezoutInterface } from "../Interface/CoefBezoutInterface";

export class CoefBezout implements CoefBezoutInterface{
    u !: BigInteger;
    v !: BigInteger;

    public CoefBezout(){}

    public getU(): BigInteger {
        return this.u;
    }

    public setU(u : BigInteger) {
        this.u = u;
    }

    public getV(): BigInteger {
        return this.v;
    }

    public setV(v : BigInteger) {
        this.v = v;
    }

    public toString() : String{
        return "CoefBezout [u=" + this.u.toString() + ", v=" + this.v.toString() + "]";
    }	
}