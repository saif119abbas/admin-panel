import { StatisticsDto } from "../dtos/dashboardDto/statisticsDto";
import { UserStatisticsDto } from "../dtos/dashboardDto/userStatisticsDto";
import { NewUsersTrendByCountryDto } from "../dtos/dashboardDto/newUsersTrendByCountryDto";
import { apiService } from "../api/apiService";
import { ChurnRateDto } from "../dtos/dashboardDto/churnRateDto";
const countryCodeMap = {
  "United Arab Emirates": "UAE",
  "United States": "USA",
  "United Kingdom": "UK",
  Canada: "Canada",
};

const churRateData = [
  // 2025
  { value: 2, date: "01/01/2025" },
  { value: 1, date: "02/01/2025" },
  { value: 1.5, date: "03/01/2025" },
  { value: 1.3, date: "04/01/2025" },
  { value: 1, date: "05/01/2025" },
  { value: 3.5, date: "06/01/2025" },
  { value: 1.5, date: "07/01/2025" },
  { value: 2.5, date: "08/01/2025" },
  { value: 1.8, date: "09/01/2025" },
  { value: 1.7, date: "10/01/2025" },
  { value: 3.2, date: "11/01/2025" },
  { value: 2.8, date: "12/01/2025" },

  // 2026
  { value: 2.1, date: "01/15/2026" },
  { value: 1.2, date: "03/05/2026" },
  { value: 2.7, date: "05/20/2026" },
  { value: 1.9, date: "07/12/2026" },
  { value: 3.3, date: "09/25/2026" },
  { value: 2.6, date: "11/18/2026" },

  // 2027
  { value: 2.4, date: "02/10/2027" },
  { value: 1.6, date: "04/22/2027" },
  { value: 3.1, date: "06/30/2027" },
  { value: 2.2, date: "08/08/2027" },
  { value: 1.9, date: "10/14/2027" },
  { value: 2.7, date: "12/19/2027" },

  // 2028
  { value: 3.0, date: "01/25/2028" },
  { value: 2.3, date: "03/03/2028" },
  { value: 1.5, date: "05/16/2028" },
  { value: 2.8, date: "07/27/2028" },
  { value: 1.7, date: "09/09/2028" },
  { value: 3.4, date: "11/21/2028" },

  // 2029
  { value: 2.2, date: "02/14/2029" },
  { value: 1.9, date: "04/05/2029" },
  { value: 2.6, date: "06/18/2029" },
  { value: 3.2, date: "08/29/2029" },
  { value: 1.8, date: "10/10/2029" },
  { value: 2.5, date: "12/24/2029" },

  // 2030
  { value: 1.9, date: "01/12/2030" },
  { value: 2.7, date: "03/07/2030" },
  { value: 1.6, date: "05/19/2030" },
  { value: 3.1, date: "07/30/2030" },
  { value: 2.4, date: "09/11/2030" },
  { value: 3.0, date: "11/23/2030" },
];



class DashboardService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
  }

  async getStatistics(filters = "monthly") {
    return new StatisticsDto();
  }
  async getUserStatistics(filters = "monthly") {
    return new UserStatisticsDto();
  }
  async getChurnRate() {
    const data = churRateData.map(
      (item) => new ChurnRateDto(item.value, item.date)
    );
    return data;
  }
  async getUsersTrend() {
    // Utility to generate random value
    const rand = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const userTrendData = [];

    // ---------------- Last 12 Days ----------------
    for (let i = 0; i < 12; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const date = d.toLocaleDateString("en-US"); // MM/DD/YYYY

      Object.values(countryCodeMap).forEach((code) => {
        userTrendData.push(
          new NewUsersTrendByCountryDto(
            { country: code, name: "CityA", value: rand(10, 50) },
            { country: code, name: "CityB", value: rand(10, 50) },
            date
          )
        );
      });
    }

    // ---------------- Last 12 Weeks ----------------
    for (let i = 0; i < 12; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i * 7);
      const date = d.toLocaleDateString("en-US");

      Object.values(countryCodeMap).forEach((code) => {
        userTrendData.push(
          new NewUsersTrendByCountryDto(
            { country: code, name: "CityA", value: rand(20, 70) },
            { country: code, name: "CityB", value: rand(20, 70) },
            date
          )
        );
      });
    }

    // ---------------- All Months for Current Year ----------------
    const currentYear = new Date().getFullYear();
    for (let month = 0; month < 12; month++) {
      const d = new Date(currentYear, month, 1);
      const date = d.toLocaleDateString("en-US");

      Object.values(countryCodeMap).forEach((code) => {
        userTrendData.push(
          new NewUsersTrendByCountryDto(
            { country: code, name: "CityA", value: rand(30, 90) },
            { country: code, name: "CityB", value: rand(30, 90) },
            date
          )
        );
      });
    }

    // ---------------- Last 12 Years ----------------
    for (let y = 0; y < 12; y++) {
      const year = currentYear - y;
      const d = new Date(year, 0, 1);
      const date = d.toLocaleDateString("en-US");

      Object.values(countryCodeMap).forEach((code) => {
        userTrendData.push(
          new NewUsersTrendByCountryDto(
            { country: code, name: "CityA", value: rand(40, 100) },
            { country: code, name: "CityB", value: rand(40, 100) },
            date
          )
        );
      });
    }
  
    return userTrendData;
  }
}

const dashboardServiceInstance = new DashboardService();
export default dashboardServiceInstance;
