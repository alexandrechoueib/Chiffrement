import { PublicKeyInterface } from "../Interface/PublicKeyInterface";

export class PublicKey implements PublicKeyInterface{
    n !: bigint;
    e !: bigint;
    m !: bigint;

    public PublicKey(n : bigint,e : bigint,m : bigint) {
        this.n = n;
        this.e = e;
        this.m = m;
    }

    public getN() : bigint {
		return this.n;
	}

	public setN(n : bigint) {
		this.n = n;
	}

	public getE(): bigint{
		return this.e;
	}

	public setE(e : bigint) {
		this.e = e;
	}


	public getM() : bigint {
		return this.m;
	}

	public setM(m : bigint) {
		this.m = m;
	}	
	
	
	public toString() : string {
		return "PublicKey (n=" + this.n.toString() + ", e=" + this.e.toString() + ")";
	}

}