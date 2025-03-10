export default class Ship{
    constructor(length,direction='horizontal'){
        this.length=length
        this.hits=0
        this.direction=direction
    }
    hit(){
        this.hits+=1
    }
    isSunk(){
        return this.hits>=this.length
    }
    changeDirection(){
        if(this.direction==='horizontal'){
            this.direction='vertical'
        }
        else{
            this.direction='horizontal'
        }
    }

}