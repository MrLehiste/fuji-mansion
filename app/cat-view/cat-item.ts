export class CatItem{

    expanded = false;
    checked = false;

    constructor(
        public id: string
        ,public name: string
        ,public icon: string
        ,public categories:Array<CatItem>
    ) {}

    toggle(){
        this.expanded = !this.expanded;
    }

    getIcon(){
        if(this.categories.length==0){ return ''; }
        if(this.expanded){ return '-'; }
        return '+';
    }

    check(){
        this.checked = !this.checked;
        this.checkRecursive(this.checked);
    }

    checkRecursive(state:boolean){
        this.categories.forEach(d => {
            d.checked = state;
            d.checkRecursive(state);
        });
    }
}