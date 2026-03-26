export class TestDataGenerator {
  static usedPhoneNumbers = new Set();
  static usedEmails = new Set();
  static usedCompanyNames = new Set();

  static randomString(length = 6) {
    return Math.random().toString(36).substring(2, 2 + length);
  }

  static randomEmail() {
    let email;
    do {
      email = `user_${this.randomString(5)}@testmail.com`;
    } while (this.usedEmails.has(email));
    this.usedEmails.add(email);
    return email;
  }

  static randomCompanyName() {
    let name;
    do {
      name = `Vendor_${this.randomString(4)}`;
    } while (this.usedCompanyNames.has(name));
    this.usedCompanyNames.add(name);
    return name;
  }

  static randomAddress() {
    return `Street_${Math.floor(Math.random() * 1000)}, Test Area`;
  }

  static randomCity() {
    const cities = ['Hyderabad', 'Bangalore', 'Mumbai', 'Chennai'];
    return cities[Math.floor(Math.random() * cities.length)];
  }

  static randomPhoneNumber() {
    let number;
    do {
      number = Math.floor(100000000 + Math.random() * 900000000).toString();
    } while (this.usedPhoneNumbers.has(number));
    this.usedPhoneNumbers.add(number);
    return number;
  }

  static randomLicenseNumber() {
    return `LIC${Math.floor(100000 + Math.random() * 900000)}`;
  }

  static randomZip() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

}