
import formatMoney from '../lib/formatMoney';

describe('formatMoney function', () => {
    it('it works with fractional dollars', () => {
        expect(formatMoney(1)).toEqual('$0.01');
        expect(formatMoney(5012)).toEqual('$50.12');
    });
});