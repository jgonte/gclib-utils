import IntlProvider from '../../src/intl/IntlProvider';
import IntlSubscriber from '../../src/intl/IntlSubscriber';

const intlProvider = new IntlProvider(
    /*lang*/
    'en',
    /*data*/
    {
        'en': {
            'goodMorning': 'Good morning'
        },
        'de': {
            'goodMorning': 'Guten Morgen'
        },
        'fr': {
            'goodMorning': 'Bonjour'
        }
    });

describe("IntlProvider test", () => {

    it("gets the translation if there is one for the given language and key", async () => {

        const translation = intlProvider.getTranslation('de', 'goodMorning');

        expect(translation).toEqual('Guten Morgen');
    });

    it("gets the translation for the default language of the providers if the langaue was not provided", async () => {

        const translation = intlProvider.getTranslation(undefined, 'goodMorning');

        expect(translation).toEqual('Good morning');
    });

    it("returns a hint when a translation does not exist for a given language", async () => {

        const translation = intlProvider.getTranslation('es', 'goodMorning');

        expect(translation).toEqual('[goodMorning(L:es)]');
    });

    it("returns a hint when a translation does not exist for a key in a given language", async () => {

        const translation = intlProvider.getTranslation('en', 'goodNight');

        expect(translation).toEqual('[(K:goodNight)en]');
    });

    it("subscribes and notifies subscribers of language changes", async () => {

        const subscriber1 = new IntlSubscriber();

        subscriber1.intlKey = 'goodMorning';

        // Notice that "lang" is not set

        intlProvider.subscribe(subscriber1);

        const subscriber2 = new IntlSubscriber();

        subscriber2.intlKey = 'goodMorning';

        subscriber2.lang = 'de'; // Always german

        intlProvider.subscribe(subscriber2);

        const subscriber3 = new IntlSubscriber();

        // Notice we don't set the intlKey 

        subscriber3.value = 'Buenos Dias';

        intlProvider.subscribe(subscriber3);

        // Notify
        intlProvider.setLanguage('fr');

        expect(subscriber1.value).toEqual('Bonjour');

        expect(subscriber2.value).toEqual('Guten Morgen');

        expect(subscriber3.value).toEqual('Buenos Dias'); // Not changed since there is no intlKey
    });
});