export class Stat{
    constructor(pv, def, atk){
        this.pv = pv;
        this.def = def;
        this.atk = atk;
    }
    // reduceValue(stat,value) {
    //     stat -= value ;       
    // }

    setPV(value){
        if(value <=0) value = 0;
        this.pv = value;
    }

    getAtk(){
        return this.atk;
    }

    getDef(){
        return this.def;
    }

    getPV(){
        return this.pv;

    }

}
export class Ability{
    constructor(name,cooldown){
        this.name = name;
        this.cooldown = cooldown;
        this.baseCd = cooldown;
    }    

    getCurrentCd(){
        return this.cooldown;
    }
    setCurrentCd(value){
         this.cooldown = value;
    }

    getBaseCd(){
        return this.baseCd;
    }

    decrementCd(){
        if(this.getCurrentCd() > 0){
            this.cooldown--;
            
        }else if(this.getCurrentCd()==0){
            this.setCurrentCd(this.getBaseCd());
        }
        
    }

    isOnCd(){
        return this.getCurrentCd() != 0;
    }

    use(caster){
        this.abilityLog(caster);
    }

    

    abilityLog(caster){
        console.log(caster.name + " is using " + this.name);
    }

}
export class DamageAbility extends Ability{
    constructor(name,cooldown,value){        
        super(name,cooldown);
        this.value = value;
    }

    getDamage(){
        return this.value;
    }

    use(caster,target){
        if(this.isOnCd()){
            console.log(this.name + " is still on cooldown for " + this.getCurrentCd() +" turns");
        } else {
            super.use(caster);
            target.takeDamage(this.getDamage()+caster.stat.getAtk());
            
        }
            
    }
}

export class HealingAbility extends Ability{
    constructor(name,cooldown,value){        
        super(name,cooldown);
        this.value = value;
    }

    getHealing(){
        return this.value;
    }

    use(caster,target){
        if(this.isOnCd()){
            console.log(this.name + " is still on cooldown for " + this.getCurrentCd() +" turns");
        } else {
            super.use(caster);
            target.heal(this.getHealing() + caster.stat.getDef());
           
        }
    
    }
}


export class Character{
    constructor(name,img, stat, special,description,cardTemplate){
        this.name = name;
        this.img = img;
        this.baseStats = stat;
        this.stat = new Stat (stat.pv,stat.def,stat.atk);
        this.abilities = [
            new DamageAbility("Attaque",0,20) ,
            new HealingAbility("Soin",0,5),
            special
        ];
        this.description = description;
        this.cardTemplate = cardTemplate;
        console.log(this.cardTemplate);
    }


    isDead(){
        return this.stat.getPV() <=0;
    }
    getPercentPV(){
        return 100*(this.stat.getPV() / this.baseStats.getPV());
    }

    addAbility(ab){
        this.abilities.push(ab);
    }

    takeDamage(value) {
        let finalDmg = value;
        finalDmg -= this.stat.def;
        if(finalDmg  <= 0){
            finalDmg = 0;
        }
        this.stat.setPV(this.stat.pv - finalDmg);

        console.log(this.name + " lost " + finalDmg + "HP, is now at "+ this.stat.pv);
    }



    useAbility(ab,target){          
        ab.use(this,target);
        // target.use(target,this);
    }
    
    heal(value){
                
        if(this.stat.pv +value >= this.baseStats.pv ){
            this.stat.setPV(this.baseStats.pv);
        } else {
            this.stat.setPV(this.stat.pv + value);
        }
        console.log(this.name + " gained " + value + "HP, is now at "+ this.stat.pv);
    }
    decrementAllCooldown(){
        this.abilities.forEach(ability => {
            if(ability.isOnCd()){
                ability.decrementCd();
            }
            
            
        });

    }




}