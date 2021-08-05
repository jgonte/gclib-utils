import Fetcher from '../Fetcher';
import SelectUrlBuilder from '../helpers/SelectUrlBuilder';
import { SingleRecordLoaderConfig, FetchRequest } from '../Interfaces';

export default class SingleRecordLoader extends Fetcher {

    urlBuilder: SelectUrlBuilder;

    constructor(cfg: SingleRecordLoaderConfig) {

        super(cfg);

        this.urlBuilder = new SelectUrlBuilder(cfg.urlBuilder);
    }

    async load(request: FetchRequest) : Promise<any> {
        
        return await this.fetch({
            ...request,
            url: this.urlBuilder.build(request)    
        });
    }
}
