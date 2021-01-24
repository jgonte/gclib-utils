import IntlProvider from './IntlProvider';
import Subscriber from '../observer/Subscriber';

export default class IntlSubscriber implements Subscriber {
  
  lang?: string;

  intlKey?: string;

  value: string = '';

  onLanguageChanged(provider: IntlProvider) {

    if (this.intlKey) { // If there is a key

      const lang = this.lang || provider.lang;

      this.value = provider.getTranslation(lang, this.intlKey);
    }
  }
}
