import { CustomValidators } from './custom.validators';
import { FormControl, FormGroup } from '@angular/forms';

describe('CustomValidators', () => {
  describe('greaterThanOrEqualTo ', () => {
    it('should pass validation with greater than value', () => {
      const validation = CustomValidators.greaterThanOrEqualTo(0)(new FormControl('1'));
      expect(validation).toBeNull();
    });

    it('should pass validation with equal value', () => {
      const validation = CustomValidators.greaterThanOrEqualTo(0)(new FormControl('0'));
      expect(validation).toBeNull();
    });

    it('should fail validation with lesser value', () => {
      const validation = CustomValidators.greaterThanOrEqualTo(0)(new FormControl('-1'));
      expect(validation).not.toBeNull();
      expect(validation.tooSmall).toBe('Value must be greater than or equal to 0');
    });

  });

  describe('validTel ', () => {

    it('should pass validation with number value', () => {
      const validation = CustomValidators.validTel()(new FormControl('1'));
      expect(validation).toBeNull();
    });

    it('should pass validation with empty value', () => {
      const validation = CustomValidators.validTel()(new FormControl());
      expect(validation).toBeNull();
    });

    it('should fail validation with non number value', () => {
      const validation = CustomValidators.validTel()(new FormControl('A'));
      expect(validation).not.toBeNull();
      expect(validation.notValidTel).toBe('Value must be valid tele-phone number');
    });

  });

  describe('alphaNumericOnly ', () => {

    it('should pass validation with alphaNumeric value', () => {
      const validation = CustomValidators.alphaNumericOnly()(new FormControl('1Abc'));
      expect(validation).toBeNull();
    });


    it('should fail validation with non alphaNumeric value', () => {
      const validation = CustomValidators.alphaNumericOnly()(new FormControl('@'));
      expect(validation).not.toBeNull();
      expect(validation.alphaNumericOnly).toBe('Allowed characters are a-zA-Z0-9_s');
    });

  });

  describe('checkCharacterLimit ', () => {

    it('should pass validation with character limit value', () => {
      const validation = CustomValidators.checkCharacterLimit(1, 6)(new FormControl('abcd'));
      expect(validation).toBeNull();
    });

    it('should fail validation with not in character limit value', () => {
      const validation = CustomValidators.checkCharacterLimit(1, 6)(new FormControl('abcdefghi'));
      expect(validation).not.toBeNull();
      expect(validation.lengthError).toBe('Use between 1 and 6 characters');
    });

  });

  describe('nanpa ', () => {
    it('should pass validation with nanpa number value', () => {
      const validation = CustomValidators.nanpa()(new FormControl('866-623-2282'));
      expect(validation).toBeNull();
    });

    it('should fail validation with non number value', () => {
      const validation = CustomValidators.nanpa()(new FormControl('12-1'));
      expect(validation).not.toBeNull();
      expect(validation.notValidNumber).toBe('Value must be a valid telephone(NANPA) number');
    });

  });

  describe('notValidUrl ', () => {

    it('should pass validation with valid url value', () => {
      const validation = CustomValidators.notValidUrl()(new FormControl('google.com'));
      expect(validation).toBeNull();
    });


    it('should fail validation with non alphaNumeric value', () => {
      const validation = CustomValidators.notValidUrl()(new FormControl('abcd'));
      expect(validation).not.toBeNull();
      expect(validation.notValidUrl).toBe('Please enter valid url e.g. google.com');
    });

  });
});
