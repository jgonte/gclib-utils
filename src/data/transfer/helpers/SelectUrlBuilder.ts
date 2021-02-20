import { ISelectUrlBuilder, SelectUrlBuilderBuildConfig } from "../Interfaces";

export default class SelectUrlBuilder implements ISelectUrlBuilder {

    selectProperty: string;

    constructor(cfg: ISelectUrlBuilder = {}) {

        this.selectProperty = cfg.selectProperty || "$select";
    }

    build(cfg: SelectUrlBuilderBuildConfig) {

        const {
            url,
            select
        } = cfg;

        const {
            selectProperty
        } = this;

        if (select !== undefined && select.length > 0) {

            const fieldList = `${selectProperty}=${select.join(',')}`;

            return url.indexOf('?') > -1 ? `${url}&${fieldList}` : `${url}?${fieldList}`;
        }

        return url;
    }
}
