import { PrivateKeyInterface } from "../Interface/PrivateKeyInterface";


export class PrivateKey implements PrivateKeyInterface{
    n !: bigint;
    u !: bigint;

    public PrivateKey(){}
    

    getN() : bigint {
		return this.n;
	}

    setN(n : bigint) {
		this.n = n;
	}

    public getU() : bigint{
		return this.u;
	}

    public setU(u : bigint) {
		this.u = u;
	}

    public toString() : string  {
		return "PrivateKey [n=" + this.n + ", u=" + this.u + "]";
	}
}