import SelectUrlBuilder from './SelectUrlBuilder';
import { CollectionUrlBuilderBuildConfig, CollectionUrlBuilderConfig, FilterUrlBuilder, ICollectionUrlBuilder } from '../Interfaces';

export default class CollectionUrlBuilder extends SelectUrlBuilder implements ICollectionUrlBuilder {

    filterProperty: string;

    orderByProperty: string;

    skipProperty: string;

    topProperty: string;

    filterBuilder?: FilterUrlBuilder;

    constructor(cfg: CollectionUrlBuilderConfig = {}) {

        super(cfg);

        this.topProperty = cfg.topProperty || "$top";

        this.skipProperty = cfg.skipProperty || "$skip";

        this.filterProperty = cfg.filterProperty || "$filter";

        this.orderByProperty = cfg.orderByProperty || "$orderby";
    }

    build(cfg: CollectionUrlBuilderBuildConfig) {

        const qs: string[] = [];

        const {
            top,
            skip,
            filter,
            orderBy
        } = cfg;

        const {
            topProperty,
            skipProperty,
            filterProperty,
            orderByProperty
        } = this;

        const url: string = super.build(cfg);

        if (top !== undefined) {

            qs.push(`${topProperty}=${top}`);
        }

        if (skip !== undefined && skip > 0) {

            qs.push(`${skipProperty}=${skip}`);
        }

        if (filter !== undefined) {

            qs.push(`${filterProperty}=${filter.build()}`)
        }

        if (orderBy !== undefined && orderBy.length > 0) {

            qs.push(`${orderByProperty}=${orderBy.map(item => `${item.field} ${item.order}`).join(', ')}`);
        }

        if (qs.length > 0) {

            return url.indexOf('?') > -1 ? `${url}&${qs.join('&')}` : `${url}?${qs.join('&')}`;
        }
        else {

            return url;
        }
    }
}
