export class Columns {
    public name: string;
    public field: string;
    public formatter: (data: any) => string;
    constructor(name, field, formatter?){
        this.name = name;
        this.field = field;
        this.formatter = formatter;
    }
}
