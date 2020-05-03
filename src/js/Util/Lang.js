
import Lang from '../../../resources/Lang/events.json';

export function _($text) {
    return (Lang[$text]) || [];

}



