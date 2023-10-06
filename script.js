import {Stat,Ability,DamageAbility,Character, HealingAbility} from "./classes.js";


Vue.createApp({
    data(){
        return{
            
            hero: null,
            adv: new Character("adv","./img/salameche.jpg", new Stat(150, 5, 5)),
            perso1: new Character("El Korto","img/testhtml/bonformat/coco1.jpg", new Stat(150, 20, 15), new DamageAbility("Cri d'Otarie",5,80),"Gabache, son cri d'Otarie est entendu à 100km à la ronde","img/testhtml/bonformat/pok1.png"),
            perso2: new Character("Marinos","img/testhtml/bonformat/kekem1.jpg", new Stat(120, 10, 20), new DamageAbility("Tir Balistique",2,50),"Sans repis, il tire sur tout ce qu'il bouge","img/testhtml/bonformat/pok2.png"),
            touareg: new Character("Touareg","img/testhtml/bonformat/alexia1.jpg", new Stat(100, 5, 35), new DamageAbility("Middle Avant",3,60),"Tel un tekkel, elle aboit mais ne mords pas","img/testhtml/bonformat/pok3.png"),
            kraken : new Character("Krakenito","img/testhtml/bonformat/bastien1.jpg",new Stat(110,15,15), new DamageAbility("Masterclass",5,100),"Après 17h, il ne répond plus de RIEN","img/testhtml/bonformat/pok2.png"),
            cece : new Character("Cece","img/testhtml/bonformat/celia1.jpg",new Stat(90,15,15), new HealingAbility("Siestas",3,40),"Toujours prête à se taper un bon roupillon","img/testhtml/bonformat/pok4.png"),
            perso3 : new Character("Serdaigle","img/testhtml/bonformat/kekes1.jpg",new Stat(120,15,25), new DamageAbility("Tunnel Vision",2,30),"J'suis raaaaaide, j'suis raide mec","img/testhtml/bonformat/pok4.png"),

            characterSelected: false,
            nbrTurn:1
        };
    },
    methods: {
       
        isSelected(perso){
            this.characterSelected = true;
            this.hero = perso;
            // this.hero.addAbility(new DamageAbility("HADOKEN!",3,50));
            
            console.log("you picked "+this.hero.name);
            console.log(this.adv.stat.getPV());
            console.log(this.hero);
        },
        playerTurn(index){
            if(this.hero.isDead()){
                console.log(" vous êtes Mort !");
                return;
            }
            switch (index) {
                case "attaque" :if(this.hero.abilities[0].isOnCd()){
                    console.log(this.hero.abilities[0].name + " is on cooldown for "+ this.hero.abilities[0].getCurrentCd());
                    return;
                }else{
                    this.hero.abilities[0].use(this.hero,this.adv);                    
                }
                    
                    
                    break;
                case "soin" :if(this.hero.abilities[1].isOnCd()){
                    console.log(this.hero.abilities[1].name + " is on cooldown for "+ this.hero.abilities[1].getCurrentCd());
                    return;
                }else{
                    this.hero.abilities[1].use(this.hero,this.hero);
                }
                
                
                break; 
                case "special" :if(this.hero.abilities[2].isOnCd()){
                    console.log(this.hero.abilities[2].name + " is on cooldown for "+ this.hero.abilities[2].getCurrentCd());
                    return;
                }else{
                    if(this.hero.abilities[2] instanceof DamageAbility){ 
    
                        this.hero.abilities[2].use(this.hero,this.adv);
                    } else if (this.hero.abilities[2] instanceof HealingAbility){
                        this.hero.abilities[2].use(this.hero,this.hero);
                    }
                } 
                
                break;
                case "fuite" :
                
                break; 
            
                default:console.log(index+" not found");
                    break;
            }
            
            this.nbrTurn ++;
            this.hero.decrementAllCooldown();
            if(this.adv.isDead()){
                console.log(" l'adversaire est Mort !");
            }else{
                this.enemyTurn();
            }
            
        
        },
        enemyTurn(){
            this.adv.abilities[0].use(this.adv,this.hero);
            if(this.hero.isDead()){
                console.log(" vous êtes Mort !");
            }


        },
        checkAlive(){
            return !this.hero.isDead() && !this.adv.isDead();
        }

        
        
        // statued(perso){
        //     this.cha
        // }
    }
}).mount('#app');

