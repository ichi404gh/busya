export function pick(array: any[]){
    const randomIndex: number = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}

declare global {
    interface Array<T> {
        pick<T>(): T;
    }
}
export function exec(){
    Array.prototype.pick = function(){
        return pick(this)
    }
}

