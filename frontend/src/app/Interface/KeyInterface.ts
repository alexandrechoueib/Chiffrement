import { CoefBezout } from "../Modèle/CoefBezout";
import { PrivateKey } from "../Modèle/PrivateKey";
import { PublicKey } from "../Modèle/PublicKey";


export interface KeyInterface{
    publicKey : PublicKey;
    privateKey : PrivateKey;
}