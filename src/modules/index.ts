import { Update } from "../interfaces";

export class ModuleLoader {
    constructor(private modules: AbstractModule[]) { }

    ReceiveUpdate(update: Update) {
        for (const module of this.modules) {
            if(module.Receive(update)) break
        }
    }
}

export abstract class AbstractModule {
    
    Receive(update: Update): boolean {
        if(this.Filter(update)){
            this.ProcessUpdate(update)
            return true
        }
        return false
    }

    protected abstract Filter(update: Update): boolean;
    protected async abstract ProcessUpdate(update: Update): Promise<void>
}