import Fetcher from '../Fetcher';
import CollectionUrlBuilder from '../helpers/CollectionUrlBuilder';
import { FetchRequest, CollectionLoaderConfig } from '../Interfaces';

export default class CollectionLoader extends Fetcher {

    urlBuilder: CollectionUrlBuilder;

    constructor(cfg: CollectionLoaderConfig) {

        super(cfg.onResponse, cfg.onError, cfg.onData);

        this.urlBuilder = new CollectionUrlBuilder(cfg.urlBuilder);
    }

    async load(request: FetchRequest) {

        await this.fetch({
            ...request,
            url: this.urlBuilder.build(request)
        });
    }
}