import Fetcher from '../Fetcher';
import SelectUrlBuilder from '../helpers/SelectUrlBuilder';
import { SingleItemLoaderConfig as SingleItemLoaderConfig, FetchRequest } from '../Interfaces';

export default class SingleItemLoader extends Fetcher {

    urlBuilder: SelectUrlBuilder;

    constructor(cfg: SingleItemLoaderConfig) {

        super(cfg);

        this.urlBuilder = new SelectUrlBuilder(cfg.urlBuilder);
    }

    async load(request: FetchRequest) {
        
        await this.fetch({
            ...request,
            url: this.urlBuilder.build(request)    
        });
    }
}
