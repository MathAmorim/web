import * as restify from 'restify'
import {Router} from '../common/router'

export class Server{
    application: restify.Server = restify.createServer({
        name:"Aula de REST",
        version: "1.0"
    })

    initRouters(routers:Router[]): Promise<any>{
        return new Promise( (resolve,reject) =>{
        try{
            this.application.use(restify.plugins.queryParser())//geralmente utilizando no get para converter pesquisas
            this.application.use(restify.plugins.bodyParser())// convert json em object automaticamente

            for( let router of routers){
                router.applyRouter(this.application)
            }

            this.application.listen(3000, () =>{
                resolve(this.application)
            })
        }catch(err){    
            reject(err)
        }

        })
    }

    bootstrap(routers: Router[] = []):Promise<Server>{
        return this.initRouters(routers).then( () => this)
    }
}