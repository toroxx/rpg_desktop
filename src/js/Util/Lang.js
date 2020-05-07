
export function _(lang_set, text, params = [], lang = 'default') {
    return (lang_set[lang][text]) || [];
}



