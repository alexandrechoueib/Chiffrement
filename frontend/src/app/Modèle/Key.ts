import { KeyInterface } from "../Interface/KeyInterface";
import { CoefBezout } from "./CoefBezout";
import { PrivateKey } from "./PrivateKey";
import { PublicKey } from "./PublicKey";

import * as bigintCryptoUtils from 'bigint-crypto-utils'

export class Key implements KeyInterface{
    publicKey !: PublicKey;
    privateKey !: PrivateKey;

    public Key(){}

    public async createPublicKey(upperlimit : number) : Promise<PublicKey>{

      let p : any;
      let q : any;
      let m : any;
      let n : any;
      let e : any;
    
       do {

         //génération aléatoire de deux grands entiers premiers p et q
          await bigintCryptoUtils.prime(upperlimit).then(v => {
            p = v;
          })

          await bigintCryptoUtils.prime(upperlimit).then(v => {
            q = v;
          })
          
          //calcul de n
          n = p * q;

          //calcul de m (indicatrice d'Euler) = (p - 1) * (q - 1) tel qu'il soit premier et inférieur a n
          m = (p -  BigInt("1")) * (q -  BigInt("1"));

          
       }while(p == q || n < m);
      

       //console.log("p: " + p);
       //console.log("q: " + q);
       //console.log("n: " + n);
       //console.log("m: " + m);

       //choix d'un petit entier impair e (exposant public) qui soit premier avec m
      
       do{
          await bigintCryptoUtils.randBits(4).then(res => {
             e = BigInt(res.toString())
           })
       }while(bigintCryptoUtils.gcd(e,m) != BigInt(1) || (e % BigInt(2)) == BigInt(0))

       //console.log("e : " + e);

       let publicKey : PublicKey = new PublicKey();
       publicKey.setN(n);
       publicKey.setE(e);
       publicKey.setM(m);

       console.log(publicKey)

       return publicKey;
    } 

    public createPrivateKey(publicKey : PublicKey) : PrivateKey{
      let a = publicKey.getE();
      let b = publicKey.getM();
      let u : bigint;
      let n : bigint;
      let k : bigint;

      u = bigintCryptoUtils.eGcd(a,b).x
      k = BigInt(-1);
     
      while(u < BigInt(2) || u > b){
        u = u - k * b;
        k -= BigInt(1);
      }
      
      let privateKey = new PrivateKey();
      privateKey.setN(publicKey.getN());
      privateKey.setU(u);
      console.log(privateKey);
      
      return privateKey;
    }
  
}