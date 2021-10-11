type Message = Record<string, string>

export function l(list: Message, lang: string): string {
    if ((lang === 'en')||(lang === 'fr')) {
        return list[lang]
    } else {
        return ''
    }
}

