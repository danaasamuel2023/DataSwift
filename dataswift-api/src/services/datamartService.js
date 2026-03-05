const axios = require('axios');
const Settings = require('../models/Settings');

class DataMartService {
  async getClient() {
    const settings = await Settings.getSettings();
    if (!settings?.datamart?.apiUrl || !settings?.datamart?.apiKey) {
      throw new Error('DataMart API not configured');
    }
    return axios.create({
      baseURL: settings.datamart.apiUrl,
      headers: { 'X-API-Key': settings.datamart.apiKey },
      timeout: 30000,
    });
  }

  async testConnection() {
    try {
      const client = await this.getClient();
      const res = await client.get('/api/developer/data-packages');
      return { connected: true, packages: res.data?.data?.length || 0 };
    } catch (err) {
      return { connected: false, error: err.message };
    }
  }

  async getPackages(network) {
    const client = await this.getClient();
    const res = await client.get('/api/developer/data-packages', {
      params: network ? { network } : {},
    });
    return res.data?.data || [];
  }

  async purchaseData({ network, capacity, phoneNumber }) {
    const client = await this.getClient();
    const res = await client.post('/api/developer/purchase', {
      network,
      capacity,
      phoneNumber,
    });
    return res.data?.data;
  }

  async checkOrderStatus(reference) {
    const client = await this.getClient();
    const res = await client.get(`/api/developer/order-status/${reference}`);
    return res.data?.data;
  }
}

module.exports = new DataMartService();
