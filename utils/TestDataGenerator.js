export class TestDataGenerator {

  static randomString(length = 6) {
    return Math.random().toString(36).substring(2, 2 + length);
  }

  static randomEmail() {
    return `user_${this.randomString(5)}@testmail.com`;
  }

  static randomCompanyName() {
    return `Vendor_${this.randomString(4)}`;
  }

  static randomAddress() {
    return `Street_${Math.floor(Math.random() * 1000)}, Test Area`;
  }

  static randomCity() {
    const cities = ['Hyderabad', 'Bangalore', 'Mumbai', 'Chennai'];
    return cities[Math.floor(Math.random() * cities.length)];
  }

  static randomZip() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

}
``