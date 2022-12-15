import { decrypt, encrypt } from 'src/server/to_clean/crypto/encryption';

describe('encryption', () => {
  it('should be symmetric', () => {
    const message = 'aosdifjapsodifjas;ldkfjadslkfjasd;lfkj dsf';
    expect(decrypt(encrypt(message))).toBe(message);
  });
});
