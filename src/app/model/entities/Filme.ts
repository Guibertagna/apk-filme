export default class Filme {
    private _titulo: string;
    private _genero: string;
    private _duracao: number;
    private _avaliacao: string;
    private _anoLancamento: number;
    private _id: string;
    private _downloadURL: any;
    private _uid: string;
    constructor(titulo: string, genero: string, duracao:number, avaliacao:string, anoLancamento:number){
        
        this._titulo = titulo;
        this._anoLancamento = anoLancamento;
        this._avaliacao = avaliacao;
        this._genero = genero;
        this._duracao = duracao;
   
   } 
   /**
     * Getter titulo
     * @return {string}
     */
	public get titulo(): string {
		return this._titulo;
	}
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    /**
     * Getter genero
     * @return {string}
     */
	public get genero(): string {
		return this._genero;
	}

    /**
     * Getter duracao
     * @return {number}
     */
	public get duracao(): number {
		return this._duracao;
	}

    /**
     * Getter avaliacao
     * @return {string}
     */
	public get avaliacao(): string {
		return this._avaliacao;
	}

    /**
     * Getter anoLancamento
     * @return {number}
     */
	public get anoLancamento(): number {
		return this._anoLancamento;
	}

    /**
     * Setter titulo
     * @param {string} value
     */
	public set titulo(value: string) {
		this._titulo = value;
	}

    /**
     * Setter genero
     * @param {string} value
     */
	public set genero(value: string) {
		this._genero = value;
	}

    /**
     * Setter duracao
     * @param {number} value
     */
	public set duracao(value: number) {
		this._duracao = value;
	}

    /**
     * Setter avaliacao
     * @param {string} value
     */
	public set avaliacao(value: string) {
		this._avaliacao = value;
	}

    /**
     * Setter anoLancamento
     * @param {number} value
     */
	public set anoLancamento(value: number) {
		this._anoLancamento = value;
	}
    public get downloadURL(): any {
    return this._downloadURL;
  }
  public set downloadURL(value: any) {
    this._downloadURL = value;
  }
  
  public get uid(): string {
    return this._uid;
  }
  
  public set uid(value: string) {
    this._uid = value;
  }



}